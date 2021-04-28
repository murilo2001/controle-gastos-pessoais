<template>
  <v-card dense>
    <v-card-title>
      <!-- <v-btn
        v-if="!disableBtn"
        depressed
        color="primary"
      >
        <v-icon
          left
          dark
        >
           mdi-plus
        </v-icon>
        Adicionar Item
      </v-btn> -->
      <v-spacer/>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Procurar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    ></v-data-table>  
  </v-card>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        fromDateMenu: false,
        fromDateVal: null,
        search: '',
        headers: [
          { text: 'Nome', value: 'nome' },
          { text: 'Tipo', value: 'tipo' },
          { text: 'Data', value: 'data' },
          { text: 'Valor', value: 'valor' },
        ],
      }
    },
  }
</script>