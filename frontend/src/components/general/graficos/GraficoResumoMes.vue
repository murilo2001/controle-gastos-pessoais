<script>

import { Pie } from 'vue-chartjs';

export default {
    extends: Pie,

    props: {
        items: {
            type: Array,
            required: true
        }
    },

    async mounted() {
        await this.fillArr();
        this.renderChart(this.chartdata, this.options)
    },

    data() {
        return {
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
        async fillArr() {
            this.items.forEach((item) => {
                this.chartdata.labels.push(item.nome+" R$");
                this.chartdata.datasets[0].data.push(item.valor);
            });
        }
    }
}
</script>

<style>

</style>