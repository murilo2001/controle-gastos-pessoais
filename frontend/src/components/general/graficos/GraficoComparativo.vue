<script>

import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,

    props: {
        items: {
            type: Array,
            required: true
        }
    },

    async mounted() {
        await this.fillArr();
        this.renderChart(this.chartdata, this.options);
    },
    data() {
        return {
            labelsExtract: [],
            dataReceitasExtract: [],
            dataDespesasExtract: [],
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
        async fillArr() {
            this.items.forEach((item) => {
                let label = item.mes+"/"+item.ano;
                let checkExistenceArray = this.chartdata.labels.indexOf(label);
                if (checkExistenceArray == -1) { 
                    this.chartdata.labels.push(label);
                }

                if (item.tipo == "receita") {
                    this.chartdata.datasets[0].data.push(item.total);
                } else {
                    this.chartdata.datasets[1].data.push(item.total);
                }
            });
        }
    }
}
</script>