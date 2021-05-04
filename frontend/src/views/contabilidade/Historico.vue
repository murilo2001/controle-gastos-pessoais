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
  export default {
    name: 'Historico',
    components: {
      TabelaHistorico: () => import('@/components/contabilidade/HistoricoTable.vue')
    },

    mounted () {
      this.fillArrDates(this.usuario.id);
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
            this.arrDatesMesAno.push(mesAno.Mes+'/'+mesAno.Ano);
          });
        }).catch(error => {
          console.error('error: ', error);
        });
      },
      
      rechargeTable () {
        let dateSelected = this.dateSelected.split("/");
        if (this.dateSelected != null) {
          let mes = dateSelected[0];
          let ano = dateSelected[1];
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
        }
      }
    },

    computed: {
      usuario () {
        return JSON.parse(localStorage.getItem('user'));
      }
    }
  }
</script>