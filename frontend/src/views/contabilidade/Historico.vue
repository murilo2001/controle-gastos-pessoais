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
      <v-col>
        <v-card
          class="mx-auto"
          min-width="300"
          color="white"
        >

        </v-card>
      </v-col>
    </v-row>

  <tabela-historico :items="itemsTable" />
  </v-container>
</template>

<script>
  import ContabilidadesService from '@/services/ContabilidadesService';
  import PusherService from '@/services/PusherService';

  export default {
    name: 'Historico',
    components: {
      TabelaHistorico: () => import('@/components/contabilidade/HistoricoTable.vue')
    },

    mounted () {
      this.fillArrDates(this.usuario.id);
      this.subscribe();
    },
    
    data () {
      return {
        arrDatesMesAno: [],
        dateSelected: null,
        itemsTable: []
      }
    },

    methods: {
      fillArrDates (usuario_id) {
        ContabilidadesService.getListDateContabilidades(usuario_id).then(response => {
          response.data.forEach(mesAno => {
            this.arrDatesMesAno.push(mesAno.mes+'/'+mesAno.ano);
          });
          if (this.arrDatesMesAno.length > 0) {
            this.dateSelected = this.arrDatesMesAno[0];
            this.rechargeTable();
          }
        }).catch(error => {
          console.error('error: ', error);
        });
      },
      
      rechargeTable (selectedOption = '') {
        let mes;
        let ano;
        if(selectedOption != '') {
          let dateSelected2 = selectedOption.split("-");
          mes = dateSelected2[1];
          ano = dateSelected2[0];
          this.dateSelected = "";
         } else {
          let dateSelected2 = this.dateSelected.split("/");
          mes = dateSelected2[0];
          ano = dateSelected2[1];
         }
          this.itemsTable = [];
          ContabilidadesService.getContabilidadePerMonthYear(this.usuario.id, mes, ano).then(response => {
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
          }).catch(error => {
            console.error('error: ', error);
          });
      },

      subscribe () {
        let pusherChannel = PusherService.subscribe();
        pusherChannel.bind('refreshContabilidades', data => {
          this.rechargeTable(data.message);
        });
      }
    },

    computed: {
      usuario () {
        return JSON.parse(localStorage.getItem('user'));
      }
    }
  }
</script>