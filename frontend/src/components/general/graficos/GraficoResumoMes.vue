<script>

import { Pie } from 'vue-chartjs';

export default {
    extends: Pie,

    mounted() {
        this.renderChart(this.chartdata, this.options)
    },
    data() {
        return {
            chartdata: {
                labels: [
                    'Academia R$',
                    'Comida R$',
                    'Lazer R$'
                ],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            'rgb(250, 170, 191)',
                            'rgb(152, 199, 251)',
                            'rgb(255, 216, 127)'
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
    }
}
</script>

<style>

</style>