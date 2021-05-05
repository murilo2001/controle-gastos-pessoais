<script>

import { Pie } from 'vue-chartjs';
import GraficosService from '@/services/GraficosService';

export default {
    extends: Pie,

    async mounted() {
        let info = await this.getDateLastRecordRegistered(this.usuario.id);
        if (info != undefined) {
            await this.fillChartData(this.usuario.id, info.ano, info.mes);
            this.renderChart(this.chartdata, this.options);
        }
    },

    data() {
        return {
            items: [],
            chartdata: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            'rgb(255, 216, 127)',
                            'rgb(204, 204, 255)',
                            'rgb(255, 255, 204)',
                            'rgb(77, 222, 25)',
                            'rgb(99, 99, 156)',
                            'rgb(250, 170, 191)',
                            'rgb(152, 199, 251)',
                            'rgb(102, 255, 102)',
                            'rgb(19, 255, 179)',
                            'rgb(204, 0, 153)',
                            'rgb(255, 64, 0)',
                            'rgb(51, 10, 204)',
                            'rgb(255, 153, 102)',
                            'rgb(0, 255, 0)',
                            'rgb(255, 0, 0)',
                            'rgb(0, 153, 204)',
                            'rgb(0, 45, 179)',
                            'rgb(250, 170, 191)',
                            'rgb(152, 199, 251)',
                            'rgb(102, 255, 102)',
                            'rgb(113, 218, 218)',
                            'rgb(255, 128, 255)',
                            'rgb(51, 102, 204)',
                            'rgb(0, 51, 0)',
                            'rgb(31, 0, 77)',
                            'rgb(51, 0, 0)',
                        ],
                        hoverOffset: 4
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
        fillChartData (usuario_id, ano, mes) {
            return GraficosService.getContabilidadeUserSummaryLastMonth(usuario_id, ano, mes).then(response => {
                response.data.forEach((item) => {
                    this.chartdata.labels.push(item.nome+" R$");
                    this.chartdata.datasets[0].data.push(item.valor);
                });

            }).catch(error => {
                console.error('error: ', error);
            });
        },

        getDateLastRecordRegistered (usuario_id) {
          return GraficosService.getLastMonthYear(usuario_id).then(response => {
            if(!response.data.message) {
                return {ano: response.data[0].ano, mes: response.data[0].mes };
            } else {
                return undefined;
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