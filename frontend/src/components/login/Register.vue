<template>
  <v-app>
    <v-content style="background-color:#222222">
      <v-container fluid fill-height style="width:50%">
        <v-card class="mt-4 mx-auto hidden-sm-only" width="320">
          <v-btn
            class="mx-2"
            style="margin: 0 !important; padding: 0px !important"
            dark
            color="secondary"
            @click="$emit('changeView', 'login')"
          >
            <v-icon dark size="32px">
              mdi-arrow-left-bold
            </v-icon>
          </v-btn>
          <v-card-text>
            <v-card class="v-card--offset mx-auto" color="secondary" elevation="4" dark>
              <v-card-text>
                <v-img src="@/assets/logo.png" width="170" height="47" style="margin: 0 auto" />
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-text>
            <v-text-field label="Nome" type="text" v-model="nome" />
            <v-text-field label="Sobrenome" type="text" v-model="sobrenome" />
            <v-text-field label="Email" type="text" v-model="email" />
            <v-text-field
              label="Senha" 
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
              :type="showPassword ? 'text' : 'password'"
              v-model="senha"
              @click:append="showPassword = !showPassword"
            />
            <v-text-field
              label="Confirmar Senha" 
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
              :type="showPassword ? 'text' : 'password'"
              v-model="confirmarSenha"
              @click:append="showPassword = !showPassword"
            />
          </v-card-text>
          <v-card-actions>
            <v-row align="center" no-gutters>
              <v-col class="text-center">
                <div class="my-2">
                  <v-btn color="secondary" block @click="cadastrarNovoUsuario()">Cadastrar</v-btn>
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
  name: 'Register',
  
  data() {
      return {
          nome: "",
          sobrenome: "",
          email: "",
          senha: "",
          confirmarSenha: "",
          showPassword: false,
          view: "login"
      }
  },
  methods: {
    cadastrarNovoUsuario() {
      
      let inputsIsValid = this.validarCampos();

      if (inputsIsValid == true) {
        UsuariosService.postCreateUser(this.nome, this.sobrenome, this.email,this.senha).then(response => {
          console.log('rrr: ',response);
          this.$emit('changeView', 'login')
          this.$toast.success('Conta cadastrada com sucesso.', '',{position:'topRight'});
        }).catch(error => {
        console.error('error: ', error);
        });
      }
    },

    validarCampos() {
      let regexValidEmail = /\S+@\S+\.\S+/;

      if (!this.nome.trim().length) {
        this.$toast.error('O campo nome é obrigatorio.', '',{position:'topCenter'});
        return false;
      } else if (this.nome.trim().length < 3) {
        this.$toast.error('O campo nome precisa conter no minimo 3 caracteres.', '',{position:'topCenter'});
        return false;
      } else if (!this.sobrenome.trim().length) {
        this.$toast.error('O campo sobrenome é obrigatorio.', '',{position:'topCenter'});
        return false;
      } else if (this.sobrenome.trim().length < 3) {
        this.$toast.error('O campo sobrenome precisa conter no minimo 3 caracteres.', '',{position:'topCenter'});
        return false;
      } else if (!this.email.trim().length) {
        this.$toast.error('O campo email é obrigatorio.', '',{position:'topCenter'});
        return false;
      } else if (!regexValidEmail.test(this.email.trim())) {
        this.$toast.error('Email invalido.', '',{position:'topCenter'});
        return false;
      } else if ((!this.senha.trim().length) || (!this.confirmarSenha.trim().length)) {
        this.$toast.error('Os campos de senha são obrigatorios.', '',{position:'topCenter'});
        return false;
      } else if (this.senha != this.confirmarSenha) {
        this.$toast.error('As senhas insediras não são iguais.', '',{position:'topCenter'});
        return false;
      } else if ((this.senha.trim().length < 4) || (this.confirmarSenha.trim().length < 4)) {
        this.$toast.error('Senha muito curta.', '',{position:'topCenter'});
        return false;
      }

      this.nome = this.nome.trim();
      this.sobrenome = this.sobrenome.trim();
      this.email = this.email.trim();
      this.senha = this.senha.trim();

      return true;
    }
  },
}
</script>

<style scoped>
.arrow-back-view{
  display: block;
  justify-content: left;
}
</style>