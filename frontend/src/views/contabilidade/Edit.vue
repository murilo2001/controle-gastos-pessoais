<template>
<div style="width:100%; height:100%">
  <base-material-card
    color="primary"
    icon="mdi-pencil"
    inline
    class="px-5 py-1"
  >
    <template v-slot:after-heading>
      <div style="font-weight:300; font-size: 1.5625rem; color:rgba(0,0,0,.87)">
        {{ title }}
      </div>
    </template>
    <v-form class="pt-7">
      <v-row
        align="center"
        no-gutters
        class="ml-4 mt-3"
      >
        <v-col cols=12>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="Tipo"
          >
            <v-select
              :error-messages="errors"
              :items="['receita','despesa']"
              v-model="contabilidade.tipo"
              label="Tipo"
              dense
              filled
            />
          </validation-provider>
        </v-col>
      </v-row>
      <v-row
        align="center"
        no-gutters
        class="ml-4 mt-3"
      >
        <v-col cols=12>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="Descricao"
          >
          <v-text-field
            :error-messages="errors"
            v-model="contabilidade.nome"
            label="Descricao"
          />
          </validation-provider>
        </v-col>
      </v-row>
      <v-row
        align="center"
        no-gutters
        class="ml-4 mt-3"
      >
        <v-col cols=12>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="Descricao"
          >
          <v-text-field
            :error-messages="errors"
            v-model="contabilidade.valor"
            label="Valor"
            type="number"
          />
          </validation-provider>
        </v-col>
      </v-row>
      <v-row
        align="center"
        no-gutters
        class="ml-4 mt-3"
      >
        <v-col cols=12>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="Data"
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
                  :error-messages="errors"  
                  v-model="contabilidade.data"
                  label="Data"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="contabilidade.data"
                @input="menuDataPicker = false;"
                locale="pt-br"
                :active-picker.sync="activePicker"
              />
            </v-menu>
          </validation-provider>
        </v-col>
      </v-row>
    </v-form>
  </base-material-card>
  <validation-observer v-slot="{ invalid }">
    <v-row>
      <v-col cols="12" md="6" />
      <v-col cols="12" md="6">
        <v-btn
          color="blue"
          min-width="100"
          style="float: right; margin-right:1px"
          :disabled="invalid || !isValid"
          @click="salvarContabilidade()"
        >
          Salvar
        </v-btn>
      </v-col>
    </v-row>
  </validation-observer>

</div>
</template>

<script>
import ContabilidadesService from '@/services/ContabilidadesService';
import dayjs from 'dayjs';

export default {
  name: 'EditContabilidade',

  components: {
    BaseMaterialCard: () => import('@/components/base/MaterialCard')
  },
  
  data() {
    return {
      contabilidade: {},
      menuDataPicker: false,
      menu: false,
      activePicker: null,
    }
  },

  mounted() {
    if(this.$route.params.id){
      this.getContabilidade(this.$route.params.id);
    }
  },

  methods: {
    getContabilidade(contabilidade_id) {
      ContabilidadesService.getContabilidade(contabilidade_id).then(response => {
        this.contabilidade = {...response.data};
        this.contabilidade.data = this.parseDate(this.contabilidade.data);
      })
    },

    formatDate(dateSql) {
      return dayjs(dateSql).format('YYYY-MM-DD');
    },

    parseDate(date) {
      let dateSplited = date.split('-');
      let ano = dateSplited[0];
      let mes = dateSplited[1];
      let dia = dateSplited[2];
      dia = dia.slice(0,dia.indexOf('T'));
      return `${ano}-${mes}-${dia}`
    },

    salvarContabilidade() {
      let paramsId = this.$route.params.id;
      let obj = this.contabilidade;

      if (!paramsId) {
        ContabilidadesService.postContabilidade(this.usuario.id, obj.nome, obj.tipo, obj.data, obj.valor)
        .then(() => {
          this.$toast.success('Item cadastrado com sucesso na contabilidade.', '',{position:'topRight'});
          this.$router.push({ name: "Contabilidade" });
        }).catch(error => {
          this.$toast.error('Erro ao cadastrar item na contabilidade.', '',{position:'topRight'});
          console.error('error: ', error);
        });
      } else {
        ContabilidadesService.putContabilidade(obj.id, obj.nome, obj.tipo, obj.data, obj.valor)
        .then(() => {
          this.$toast.success('Contabilidade atualizada com sucesso.', '',{position:'topRight'});
          this.$router.push({ name: "Contabilidade" });
        }).catch(error => {
          this.$toast.error('Erro ao atualizar contabilidade.', '',{position:'topRight'});
          console.error('error: ', error);
        });
      }
    }
  },

  computed: {
    title() {
      let paramsId = this.$route.params.id;
      return paramsId ? `Editando Contabilidade #${paramsId}` : 'Adicionar Contabilidade';
    },

    isValid() {
      return this.contabilidade.tipo && this.contabilidade.nome && this.contabilidade.valor && this.contabilidade.data ? true : false;
    },

    usuario () {
      return JSON.parse(localStorage.getItem('user'));
    }
  }
}
</script>