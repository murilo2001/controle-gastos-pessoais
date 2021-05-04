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
              <v-list-item-subtitle>{{lastMonthYear}}</v-list-item-subtitle>
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
          <grafico-resumo-mes class="graph-size" />
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
            <grafico-comparativo class="graph-size" />
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
import GraficosService from '@/services/GraficosService';
import convertHelper from '@/convertHelper';

export default {
  name: 'Home',
  components: {
    GraficoComparativo: () => import('@/components/general/graficos/GraficoComparativo.vue'),
    GraficoResumoMes: () => import('@/components/general/graficos/GraficoResumoMes.vue'),
  },
  
  data () {
    return {
      lastMonthYear: ""
    }
  },

  mounted () {
    this.getDateLastRecordRegistered(this.usuario.id);
  },

  methods: {

    getDateLastRecordRegistered (usuario_id) {
      GraficosService.getLastMonthYear(usuario_id).then(response => {
        this.lastMonthYear = convertHelper.getNomeMesPorExtenso(response.data[0].mes)+'/'+response.data[0].ano;
      }).catch(error => {
        console.error('error: ', error);
      });
    },
  },

  computed: {
    usuario () {
      return JSON.parse(localStorage.getItem('user'));
    },
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