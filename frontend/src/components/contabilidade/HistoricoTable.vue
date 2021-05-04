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
        <v-spacer/>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="blue"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              style="margin-bottom: 0px !important;"
            >
              Novo Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ modalFormTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    class="d-flex"
                    cols="12"
                  >
                    <v-select
                      :items="['receita','despesa']"
                      v-model="editedItem.tipo"
                      label="Tipo"
                      dense
                      filled
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                  >
                  <v-text-field
                    v-model="editedItem.nome"
                    label="Nome"
                  />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="6"
                  >
                  <v-text-field
                    v-model="editedItem.valor"
                    label="Valor"
                    type="number"
                  />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-menu
                      v-model="menuDataPicker"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.data"
                          label="Data"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="editedItem.data"
                        @input="menuDataPicker = false"
                        locale="pt-br"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="saveCondition"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="540px">
          <v-card>
            <v-card-title class="headline">Tem certeza de que deseja excluir esse item?</v-card-title>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Sim</v-btn>
              <v-spacer/>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.acoes`]="{ item }">
      <v-icon
        color="teal"
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        color="pink"
        small
        @click="deleteItem(item)"
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
      menuDataPicker: false,
      dialog: false,
      dialogDelete: false,
      search: '',
      headers: [
        { text: '#', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Data', value: 'data' },
        { text: 'Valor', value: 'valor' },
        { text: 'Ações', value: 'acoes', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: undefined,
        nome: '',
        tipo: '',
        data: '',
        valor: 0,
      },
    }),

    computed: {
      modalFormTitle () {
        return this.editedIndex === -1 ? 'Novo Registro' : 'Editando Item'
      },
      usuario () {
        return JSON.parse(localStorage.getItem('user'));
      }
    },

    watch: {
      dialog (val) {
        val || this.close();
      },
      dialogDelete (val) {
        val || this.close();
      },
    },

    methods: {
      editItem (item) {
        this.editedIndex = 1;
        this.editedItem = Object.assign({}, item);
        this.editedItem.data = this.editedItem.data.split('/').reverse().join('-');
        this.dialog = true;
      },

      deleteItem (item) {
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm () {
        if (this.editedItem.id != undefined) {
          ContabilidadesService.deleteContabilidade(this.editedItem.id)
          .then(response => {
            console.log(response.data);
            this.$toast.success('Item da contablidade excluido com sucesso.', '',{position:'topRight'});
          }).catch(error => {
            console.error('error: ', error);
            this.$toast.error('Erro ao excluir item da contablidade.', '',{position:'topRight'});
          });
        }

        this.close()
      },

      close () {
        this.dialog = false;
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({});
          this.editedIndex = -1;
        })
      },

      saveCondition () {
        this.editedIndex == -1 ? this.save() : this.saveEditItem();
      },

      save () {
        ContabilidadesService.postContabilidade(this.usuario.id, this.editedItem.nome, this.editedItem.tipo, this.editedItem.data, this.editedItem.valor)
        .then(response => {
          console.log(response.data);
          this.$toast.success('Item cadastrada com sucesso na contabilidade.', '',{position:'topRight'});
        }).catch(error => {
          this.$toast.error('Erro ao cadastrar item na contabilidade.', '',{position:'topRight'});
          console.error('error: ', error);
        });

        this.close();
      },

      saveEditItem () {
        ContabilidadesService.putContabilidade(this.editedItem.id, this.editedItem.nome, this.editedItem.tipo, this.editedItem.data, this.editedItem.valor)
        .then(response => {
          console.log(response.data);
          this.$toast.success('Contabilidade atualizada com sucesso.', '',{position:'topRight'});
        }).catch(error => {
          this.$toast.error('Erro ao atualizar contabilidade.', '',{position:'topRight'});
          console.error('error: ', error);
        });

        this.close();
      }
    },
  }
</script>