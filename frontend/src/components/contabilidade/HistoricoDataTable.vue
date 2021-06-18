<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="items"
    :search="search"
    :footer-props="{
      itemsPerPageText: 'Itens por Página'
    }"
    no-results-text="Nenhum registro encontrado."
  >
    <template v-slot:top>
      <v-toolbar
        flat
        dark
      >
        <v-toolbar-title>Contabilidade</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-card-title>
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Procurar"
            single-line
            hide-details
          />
        </v-card-title>
        <v-spacer />
        <v-dialog v-model="deleteDialog" max-width="450px">
          <v-card>
            <v-card-title class="headline" style="font-size:20px !important">
              Excluir Item da Contabilidade #{{ deleteDialogData.id }}
            </v-card-title>

            <v-card-text>
              Tem certeza de que deseja excluir esse item?
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer/>
              <v-btn color="blue darken-1" text @click="deleteDialog = false">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deletarContabilidade(deleteDialogData.id)">Sim</v-btn>
              <v-spacer/>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn
          fab
          width="40px"
          height="40px"
          @click="addNewContabilidade()"
        >
          <v-icon dark style="font-size: 30px">
            mdi-plus-box
          </v-icon>
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:[`item.acoes`]="{ item }">
      <v-icon
        color="teal"
        class="mr-2"
        @click="editarContabilidade(item.id)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        color="pink"
        @click="openDeleteDialog(item.id)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <p>Nenhum registro encontrado.</p>
    </template>
  </v-data-table>
</template>

<script>
  import ContabilidadesService from '@/services/ContabilidadesService';
  
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    },

    data: () => ({
      deleteDialog: false,
      deleteDialogData: {},

      search: '',
      headers: [
        { text: '#', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Data', value: 'data' },
        { text: 'Valor', value: 'valor' },
        { text: 'Ações', value: 'acoes', sortable: false },
      ],
    }),


    methods: {
      editarContabilidade(id) {
        this.$router.push('edit/'+id)
      },

      addNewContabilidade() {
        this.$router.push('edit')
      },

      openDeleteDialog(id) {
        this.deleteDialogData = {
          id: id
        };

        this.deleteDialog = true;
      },

      deletarContabilidade(id) {
        ContabilidadesService.deleteContabilidade(id)
        .then(() => {
          this.$toast.success('Item da contablidade excluido com sucesso.', '',{position:'topRight'});
          this.$emit('refreshSelectCont');
        }).catch(error => {
          console.error('error: ', error);
          this.$toast.error('Erro ao excluir item da contablidade.', '',{position:'topRight'});
        });
        this.deleteDialog = false;
      },
    },
  }
</script>