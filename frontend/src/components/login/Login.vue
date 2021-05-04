<template>
  <v-app>
    <v-content style="background-color:#222222">
      <v-container fluid fill-height style="width:50%">
        <v-card class="mt-4 mx-auto text-center hidden-sm-only" width="320">
          <v-card-text>
            <v-card class="v-card--offset mx-auto" color="secondary" elevation="4" dark>
              <v-card-text>
                <v-img src="@/assets/logo.png" width="170" height="47" style="margin: 0 auto" />
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-text>
            <v-text-field label="Email" type="text" v-model="email" />
            <v-text-field
              label="Senha" 
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
              :type="showPassword ? 'text' : 'password'"
              v-model="senha"
              @click:append="showPassword = !showPassword"
            />
          </v-card-text>
          <v-card-actions>
            <v-row align="center" no-gutters>
              <v-col class="text-center">
                <div class="my-2">
                  <v-btn color="secondary" block @click="autenticar()">Logar</v-btn>
                </div>
                <div>
                  <v-btn color="black" x-small text @click="acionarNotifcEsqueciSenha()">
                    <v-icon>mdi-cached</v-icon>
                      Esqueci a senha
                  </v-btn>
                </div>
                <div>
                  <v-btn 
                    color="black" 
                    x-small text
                    @click="$emit('changeView', 'register')"
                  >
                    <v-icon>mdi-plus</v-icon>
                    Registrar-se
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-content>
</v-app>
</template>

<script>
import UsuariosService from '@/services/UsuariosService';

export default {
  name: 'Login',
  
  data() {
      return {
          email: "",
          senha: "",
          showPassword: false,
      }
  },
  methods: {
    autenticar() {
      localStorage.clear();
      UsuariosService.postLogar(this.email,this.senha).then(response => {
        let user = {
          id: response.data.usuario.id,
          nome: response.data.usuario.nome,
          sobrenome: response.data.usuario.sobrenome,
          email: response.data.usuario.email
        };
        localStorage.setItem('token_backend', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(user));
        this.$router.push('/');
      }).catch(error => {
      console.error('error: ', error);
      });
    },

    acionarNotifcEsqueciSenha() {
      this.$toast.info('A opção para recuperação de senha ainda não foi criada.', '',{position:'topRight'})
    }
  },
}
</script>