<template>
<v-container
  tag="section"
  fluid
  class="teste"
  style="height: 100%;"
  >
    <v-row dense>
      <v-col>
        <v-card
          class="mx-auto"
          min-width="300"
          color="white"
        > <!-- outlined -->
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                Resumo
              </v-list-item-title>
              <v-list-item-subtitle>abr/2021 -> 20% positivo</v-list-item-subtitle>
            </v-list-item-content>
            <span class="img-card-border" style="background-color: #6c5ce7;">
              <v-img class="img-card-content" src="https://res.cloudinary.com/cschroeder/image/upload/v1542293711/Icons/users.png" />
            </span>
          </v-list-item>
          <br><v-divider light></v-divider>
          <!-- <v-card-actions>
            <v-btn
              outlined
              rounded
              text
            >
              Button
            </v-btn>
          </v-card-actions> -->
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
              <v-list-item-subtitle>...</v-list-item-subtitle>
            </v-list-item-content>
            <span class="img-card-border" style="background-color: #0984e3;">
              <v-img class="img-card-content" src="https://res.cloudinary.com/cschroeder/image/upload/v1542299607/Icons/NewOrder_256.png?v=3" />
            </span>
          </v-list-item>
          <br><v-divider light></v-divider>
          <!-- <v-card-actions>
            <v-btn
              outlined
              rounded
              text
            >
              Button
            </v-btn>
          </v-card-actions> -->
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
          <contabilidade-historico />
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  name: 'Home',
  components: {
    GraficoComparativo: () => import('@/components/general/graficos/GraficoComparativo.vue'),
    GraficoResumoMes: () => import('@/components/general/graficos/GraficoResumoMes.vue'),
    ContabilidadeHistorico: () => import('@/components/contabilidade/Historico.vue'),
  },

}
</script>

<style scoped>
.img-card-border{
  border-radius: 6px;
  height: 80px;
  width: 80px;
  position: relative
}

.img-card-content {
  width: 56px;
  height: 56px;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}

.graph-size {
  max-width: 600px;
  max-height: 500px;
  /* margin:  150px auto; */
}

</style>