<script>

import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,

    mounted() {
        this.renderChart(this.chartdata, this.options)
    },
    data() {
        return {
            chartdata: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [
                    {
                        label: 'Receitas R$',
                        data: [1200, 1400, 2000, 1300, 1600, 1550, 3000, 2100, 2500, 4000, 1500, 1600],
                        backgroundColor: 'rgb(250, 170, 191)',
                        // borderColor: 'rgb(255, 38, 38)',
                        borderWidth: 1
                    },
                    {
                        label: 'Despesas R$',
                        data: [900, 1600, 1000, 1600, 1400, 1000, 1200, 1000, 800, 2000, 1300, 1000],
                        backgroundColor: 'rgb(152, 199, 251)',
                        // borderColor: 'rgb(50, 149, 255)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        };
    }
}
</script>

<style>

</style>