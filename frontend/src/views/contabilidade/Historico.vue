<template>
  <v-container
    tag="section"
    fluid
    style="height: 100%;"
  >
    <v-row dense>
      <v-col>
          <v-select
            :items="arrDatesMesAno"
            label="Mês / Ano"
            v-model="dateSelected"
            @change="rechargeTable()"
            no-data-text="Nenhuma contabilidade cadastrada"
          >
          <template v-slot:item="{ item, attrs, on }">
            <v-list-item
              v-bind="attrs"
              v-on="on"
            >
              <v-list-item-title
                :id="attrs['aria-labelledby']"
                v-text="item"
              ></v-list-item-title>
            </v-list-item>
          </template>
          </v-select>
      </v-col>
      <v-col class="mt-3"> 
        <v-btn
          color="#277249"
          class="white--text"
          @click="gerarPlanilha()"
          width="150px"
          height="35px"
        >
          Gerar XLSX
          <v-icon
            right
            dark
          >
            mdi-microsoft-excel
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <historico-data-table :items="itemsTable" @refreshSelectCont="fillArrDates(usuario.id)" />
  </v-container>
</template>

<script>
  import ContabilidadesService from '@/services/ContabilidadesService';
  import PusherService from '@/services/PusherService';

  export default {
    name: 'Historico',
    components: {
      HistoricoDataTable: () => import('@/components/contabilidade/HistoricoDataTable.vue')
    },

    async mounted() {
      await this.fillArrDates(this.usuario.id);
      this.rechargeTable();
      this.subscribe();
    },
    
    data() {
      return {
        arrDatesMesAno: [],
        dateSelected: null,
        itemsTable: []
      }
    },

    methods: {
      fillArrDates(usuario_id) {
        return ContabilidadesService.getListDateContabilidades(usuario_id).then(response => {
          response.data.forEach(mesAno => {
            this.arrDatesMesAno.push(mesAno.mes+'/'+mesAno.ano);
          });
          if (this.arrDatesMesAno.length > 0) {
            this.dateSelected = this.arrDatesMesAno[0];
          }
        }).catch(error => {
          console.error('error: ', error);
        });
      },
      
      rechargeTable(selectedOption = '') {
        let mes;
        let ano;
        if(selectedOption != '') {
          let dateSelected2 = selectedOption.split("-");
          mes = dateSelected2[1];
          ano = dateSelected2[0];
          this.dateSelected = "";
         } else if (this.dateSelected != null) {
          let dateSelected2 = this.dateSelected.split("/");
          mes = dateSelected2[0];
          ano = dateSelected2[1];
         }
          this.itemsTable = [];
          if ((mes) && (ano)) {
            ContabilidadesService.getContabilidadePerMonthYear(this.usuario.id, mes, ano).then(response => {
              if(!response.data.message) {
                response.data.forEach((item) => {
                  let dataConverted = new Date(item.data);
                  dataConverted = dataConverted.toLocaleString();
                  let dataConvertedSplit = dataConverted.split(' ');
                  dataConverted = dataConvertedSplit[0].trim();
                  this.itemsTable.push({
                    id: item.id,
                    nome: item.nome,
                    tipo: item.tipo,
                    data: dataConverted,
                    valor: parseInt(item.valor)
                  });
                });
              }
            }).catch(error => {
              console.error('error: ', error);
            });
          }
      },

      subscribe() {
        let pusherChannel = PusherService.subscribe();
        pusherChannel.bind('refreshContabilidades', data => {
          this.rechargeTable(data.message);
        });
      },

      gerarPlanilha() {
        let mes = this.dateSelected.split('/')[0];
        let ano = this.dateSelected.split('/')[1];

        ContabilidadesService.gerarPlanilha(mes, ano, this.usuario.id).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", 'controle-gastos-pessoais.xlsx');
          document.body.appendChild(link);
          link.click();
        }).catch(error => {
          console.error('error: ', error);
        });
      }
    },

    computed: {
      usuario() {
        return JSON.parse(localStorage.getItem('user'));
      }
    }
  }
</script>

<style>
.v-data-table table thead tr th {
  font-weight: 600;
  font-size: 16px !important;
}

.v-data-table table tbody tr td {
  font-size: 15px !important;
}
</style>