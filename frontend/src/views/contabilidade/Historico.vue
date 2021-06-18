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
          v-if="dateSelected != null && dateSelected != ''"
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
        /* Resgata todas as datas distintas de contabilidades cadastradas pelo usuário => ordem decrescente */
        return ContabilidadesService.getListDateContabilidades(usuario_id).then(response => {
          response.data.forEach(mesAno => {
            this.arrDatesMesAno.push(mesAno.mes+'/'+mesAno.ano);
          });
          /* Caso não tiver nenhuma data selecionada no select box ira setar a mais recente como primeira */
          if (this.arrDatesMesAno.length > 0) {
            this.dateSelected = this.arrDatesMesAno[0];
          }
        }).catch(error => {
          console.error('error: ', error);
        });
      },
      
      rechargeTable(selectedOption = '') {
         let objMesAno = this.treatParameterRechargeTable(selectedOption);

          this.itemsTable = [];
          if (objMesAno.mes && objMesAno.ano) {
            ContabilidadesService.getContabilidadePerMonthYear(this.usuario.id, objMesAno.mes, objMesAno.ano).then(response => {
              /* Caso encontrar algum registro correspondente ira atualizar a tabela */
              if(!response.data.message) { /* message = 'Nenhuma contabilidade encontrada' */
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
              } else { /* Caso não encontrar nenhuma registro para esse mes / ano significa que não há mais contabilidade para esse data, então sera atualizado a tela */
                location.reload();
              }
            }).catch(error => {
              console.error('error: ', error);
            });
          }
      },

      treatParameterRechargeTable(parameter) {
        if(parameter != '') { /* IF para caso for entregue parametro valido */
          let aux = parameter.split("-");
          this.dateSelected = ""; /* Seta selectbox Mes/ano = vazia */
          return {mes: aux[1], ano: aux[0]}
        }
        /* If para caso não encontrar parametro, significa que o rechargeTable() foi chamado sem param. A call foi no mounted ou @change do v-select */
        if (this.dateSelected != null) {
          let aux = this.dateSelected.split("/");
          return {mes: aux[0], ano: aux[1]};
        }

        /* Caso usuario não passou nenhuma data para atualizar a tabela e não existe nenhuma data selecionada dateSelected == null, significa que não existe nenhum registro cadastrado no BD */
        return {mes: undefined, ano: undefined};
      },

      subscribe() {
        let pusherChannel = PusherService.subscribe();
        pusherChannel.bind('refreshContabilidades', data => {
          this.fillArrDates();
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