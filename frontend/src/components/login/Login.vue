<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      href="#"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-cached</v-icon>
                    </v-btn>
                  </template>
                  <span>Esqueci a senha</span>
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="#"
                      target="_blank"
                      v-on="on"
                      class="mx-2"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Registrar</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="senha"
                    label="Senha"
                    name="senha"
                    prepend-icon="mdi-lock"
                    type="senha"
                    v-model="senha"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="autenticar" color="primary">Logar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</v-app>
</template>

<script>
import UsuariosService from '../../services/UsuariosService';

export default {
    name: 'Login',
    
    data() {
        return {
            email: "",
            senha: ""
        }
    },
    methods: {
        autenticar() {
            localStorage.clear();
            UsuariosService.postLogar(this.email,this.senha).then(response => {
                let user = {
                    id: response.data.usuario.id,
                    nome: response.data.usuario.nome,
                    email: response.data.usuario.email
                };
                localStorage.setItem('user', JSON.stringify(user));
                this.$router.push('/');
            }).catch(error => {
            console.error('error: ', error);
            });
        }
    }
}
</script>