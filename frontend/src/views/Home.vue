<template>
<v-container
  tag="section"
  fluid
  style="height: 100%;"
  >
    <v-row dense>
      <v-col>
        <v-card
          class="mx-auto"
          min-width="300"
          color="white"
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                Resumo
              </v-list-item-title>
              <v-list-item-subtitle>abr/2021</v-list-item-subtitle>
            </v-list-item-content>
            <span class="btn-card-border" style="background-color: #6c5ce7;">
              <v-btn
                class="btn-card-content"
                color="white"
                dark
                icon
                min-width="0"
              >
                <v-icon
                  size="54"
                  color="white"
                >
                  mdi-file-eye
                </v-icon>
              </v-btn>
            </span>
          </v-list-item>
          <br><v-divider light></v-divider>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto"
          min-width="300"
          color="white"
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                Comparativo
              </v-list-item-title>
              <v-list-item-subtitle>2021</v-list-item-subtitle>
            </v-list-item-content>
            <span class="btn-card-border" style="background-color: #0984e3;">
              <v-btn
                class="btn-card-content"
                color="white"
                dark
                icon
                min-width="0"
              >
                <v-icon
                  size="54"
                  color="white"
                >
                  mdi-microsoft-excel
                </v-icon>
              </v-btn>
            </span>
          </v-list-item>
          <br><v-divider light></v-divider>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-card
          class="mx-auto"
          min-width="300"
          color="white"
          align="center"
          justify="center"
        >
          <grafico-resumo-mes class="graph-size" :items="arrItemsGraficoResumo" />
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto"
          min-width="300"
          color="white"
          align="center"
          justify="center"
        >
            <grafico-comparativo class="graph-size" :items="arrItemsGraficoComparativo" />
        </v-card>
      </v-col>
    </v-row>
    <br>
    <v-row dense>
      <v-col>
        <v-card
          class="mx-auto"
          min-width="300"
          color="white"
          align="center"
          justify="center"
        >
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import GraficosService from '../services/GraficosService';
export default {
  name: 'Home',
  components: {
    GraficoComparativo: () => import('@/components/general/graficos/GraficoComparativo.vue'),
    GraficoResumoMes: () => import('@/components/general/graficos/GraficoResumoMes.vue'),
  },
  
  data () {
    return {
      arrItemsGraficoComparativo: [],
      arrItemsGraficoResumo: [],
      monthLastRecordRegistered: undefined,
      yearLastRecordRegistered: undefined
    }
  },

  async mounted () {
    await this.fillArrItemsGraficoComparativo(this.usuario.id);
    await this.fillDataLastRecordRegistered(this.usuario.id);
    await this.fillArrItemsGraficoResumo(this.usuario.id, this.yearLastRecordRegistered, this.monthLastRecordRegistered);
  },

  methods: {
    async fillArrItemsGraficoComparativo (usuario_id) {
      GraficosService.getContabilidadeUserMonthsComparative(usuario_id).then(response => {
        response.data.forEach(info => {
          this.arrItemsGraficoComparativo.push({
            mes: this.getNomeMesPorExtenso(info.mes),
            ano: info.ano,
            total: parseInt(info.total),
            tipo: info.tipo
          });
        });
      }).catch(error => {
        console.error('error: ', error);
      });
    },

    getNomeMesPorExtenso (mes) {
      mes = parseInt(mes);
      switch (mes) {
        case 1:
          return 'Janeiro';
        case 2:
          return 'Fevereiro';
        case 3:
          return 'Março';
        case 4:
          return 'Abril';
        case 5:
          return 'Maio';
        case 6:
          return 'Junho';
        case 7:
          return 'Julho';
        case 8:
          return 'Agosto';
        case 9:
          return 'Setembro'
        case 10:
          return 'Outubro';
        case 11:
          return 'Novembro';
        case 12:
          return 'Dezembro';
      }
    },

    async fillDataLastRecordRegistered (usuario_id) {
      await GraficosService.getLastMonthYear(usuario_id).then(response => {
        this.yearLastRecordRegistered = response.data[0].ano;
        this.monthLastRecordRegistered = response.data[0].mes;
      }).catch(error => {
        console.error('error: ', error);
      });
    },

    async fillArrItemsGraficoResumo (usuario_id, ano, mes) {
      GraficosService.getContabilidadeUserSummaryLastMonth(usuario_id, ano, mes).then(response => {
      this.arrItemsGraficoResumo = response.data;
      }).catch(error => {
        console.error('error: ', error);
      });
    },

  },

  computed: {
    usuario () {
      return JSON.parse(localStorage.getItem('user'));
    }
  }

}
</script>

<style scoped>
.btn-card-border{
  border-radius: 6px;
  height: 80px;
  width: 80px;
  position: relative
}

.btn-card-content {
  width: 56px;
  height: 56px;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}

.graph-size {
  max-width: 575px;
  max-height: 500px;
}

</style>