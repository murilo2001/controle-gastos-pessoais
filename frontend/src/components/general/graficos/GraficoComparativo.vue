<script>

import { Bar } from 'vue-chartjs';
import GraficosService from '@/services/GraficosService';
import convertHelper from '@/convertHelper';

export default {
    extends: Bar,

    async mounted() {
        await this.fillChartData(this.usuario.id);
        this.renderChart(this.chartdata, this.options);
    },
    data() {
        return {
            items: [],
            chartdata: {
                labels: [],
                datasets: [
                    {
                        label: 'Receitas R$',
                        data: [],
                        backgroundColor: 'rgb(250, 170, 191)',
                        borderWidth: 1
                    },
                    {
                        label: 'Despesas R$',
                        data: [],
                        backgroundColor: 'rgb(152, 199, 251)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        };
    },

    methods: {
        fillChartData (usuario_id) {
            return GraficosService.getContabilidadeUserMonthsComparative(usuario_id).then(response => {
                if (!response.data.message) {
                    response.data.forEach(info => {
                        let label = convertHelper.getNomeMesPorExtenso(info.mes)+"/"+info.ano;
                        let checkExistenceArray = this.chartdata.labels.indexOf(label);
                        if (checkExistenceArray == -1) { 
                            this.chartdata.labels.push(label);
                        }
    
                        if (info.tipo == "receita") {
                            this.chartdata.datasets[0].data.push(parseInt(info.total));
                        } else {
                            this.chartdata.datasets[1].data.push(parseInt(info.total));
                        }
    
                    });
                }
            }).catch(error => {
                console.error('error: ', error);
            });
        },
    },

  computed: {
    usuario () {
      return JSON.parse(localStorage.getItem('user'));
    }
  }
}
</script>