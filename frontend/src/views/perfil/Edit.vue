<template>
<v-container
  tag="section"
  fluid
  style="height: 100%;"
>
    <v-card>
        <form>
          <v-row
            class="mx-auto"
            justify="space-around"
            style="max-width: 500px;"
          >
            <v-col
              cols="auto"
              class="text-center"
            >
              <input
                ref="file"
                type="file"
                class="d-none"
              >
              <v-card
                class="mx-auto mt-0 d-inline-flex v-card--account"
                outlined
                height="106"
                width="106"
              >
                <v-img
                  v-if="image"
                  :src="image"
                  height="100%"
                  width="100%"
                />
                <v-icon
                  v-else
                  class="mx-auto"
                  size="96"
                >
                  mdi-account
                </v-icon>
              </v-card>

              <div class="font-weight-bold grey--text">
                ESCOLHA UMA IMAGEM
              </div>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >

              <v-text-field
                v-model="nome"
                color="primary"
                label="Primeiro Nome*"
              />

              <v-text-field
                v-model="sobrenome"
                color="primary"
                label="Sobrenome*"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="email"
                color="primary"
                label="Email"
                prepend-icon="mdi-email"
                disabled
              />

              <v-text-field
                v-model="senha"
                color="primary"
                type="password"
                label="Senha"
                prepend-icon="mdi-key"
              />

              <v-text-field
                v-model="senha2"
                color="primary"
                type="password"
                label="Confirmar Senha"
                prepend-icon="mdi-key"
              />
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="12" md="6"></v-col>
            <v-col cols="12" md="6">
              <v-btn
                color="green"
                min-width="120"
                style="float: right; margin-right:15px;"
                class="mt-n5"
                @click="editUser()"
              >
                Salvar
              </v-btn>
            </v-col>
          </v-row>
        </form>
    </v-card>
</v-container>
</template>

<script>
import UsuariosService from '@/services/UsuariosService';

export default {
  name: 'Edit',

  data() {
    return {
      image: null,
      nome: '',
      sobrenome: '',
      email: '',
      senha: '',
      senha2: '',
    }
  },

  mounted() {
    this.getUsuarioLogado();
  },

  methods: {

    editUser() {
      
      if (this.senha != this.senha2) {
        this.$toast.error('As senhas inseridas não são iguais.', '',{position:'topRight'});
        return
      }

      if (!this.nome.trim()) {
        this.$toast.error('O campo primeiro nome é obrigatorio.', '',{position:'topRight'})
        return
      } else if (!this.sobrenome.trim()) {
        this.$toast.error('O campo sobrenome é obrigatorio.', '',{position:'topRight'})
        return
      }

      UsuariosService.putUpdateUser(this.usuario.id, this.nome, this.sobrenome, this.senha).then(() => {
        this.$toast.success('Informações de perfil atualizadas com sucesso.', '',{position:'topRight'});
        let userdited = this.usuario;
        userdited.nome = this.nome;
        userdited.sobrenome = this.sobrenome;
        localStorage.setItem('user', JSON.stringify(userdited));
      }).catch(error => {
        console.error('error: ', error);
      });
    },

    getUsuarioLogado() {
      this.nome = this.usuario.nome;
      this.sobrenome = this.usuario.sobrenome;
      this.email = this.usuario.email;
    }
  },

  computed: {
    usuario () {
      return JSON.parse(localStorage.getItem('user'));
    }
  }
}
</script>

<style>

</style>