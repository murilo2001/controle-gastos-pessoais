import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';
import ControleGastos from '@/views/controleGastos/Index';

Vue.use(Router);

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
    },
    {
        name: 'controle-gastos',
        path: '/controle-gastos',
        component: ControleGastos
    }
]

const router = new Router({ routes });

export default router;