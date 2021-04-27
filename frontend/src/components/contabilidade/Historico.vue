<template>
  <v-card>
    <v-card-title>
      <b>Contabilidade</b>
      <v-spacer/>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: 'Nome', value: 'nome' },
          { text: 'Tipo', value: 'tipo' },
          { text: 'Data', value: 'data' },
          { text: 'Valor', value: 'valor' },
          {
            text: 'Ações',
            align: 'start',
            sortable: false,
            value: 'acoes',
          },
        ],
        desserts: [
          {
            nome: 'Academia',
            tipo:  'Despesa',
            data: '26/04/2021',
            valor: 60,
            acoes: '...',
          },
          {
            nome: 'Academia',
            tipo:  'Despesa',
            data: '26/04/2021',
            valor: 60,
            acoes: '...',
          },
          {
            nome: 'Academia',
            tipo:  'Despesa',
            data: '26/04/2021',
            valor: 60,
            acoes: '...',
          },
          {
            nome: 'Academia',
            tipo:  'Despesa',
            data: '26/04/2021',
            valor: 60,
            acoes: '...',
          },
          {
            nome: 'Academia',
            tipo:  'Despesa',
            data: '26/04/2021',
            valor: 60,
            acoes: '...',
          },
          {
            nome: 'Academia',
            tipo:  'Despesa',
            data: '26/04/2021',
            valor: 60,
            acoes: '...',
          },
          {
            nome: 'Academia',
            tipo:  'Despesa',
            data: '26/04/2021',
            valor: 60,
            acoes: '...',
          },
          {
            nome: 'Academia',
            tipo:  'Despesa',
            data: '26/04/2021',
            valor: 60,
            acoes: '...',
          },
          {
            nome: 'Academia',
            tipo:  'Despesa',
            data: '26/04/2021',
            valor: 60,
            acoes: '...',
          },
          {
            nome: 'Lazer',
            tipo:  'Despesa',
            data: '26/04/2022',
            valor: 60,
            acoes: '...',
          },
        ],
      }
    },
  }
</script>

<style>

</style>