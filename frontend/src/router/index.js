import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';
import Login from '@/views/login/Index';
import ControleGastos from '@/views/controleGastos/Index';

Vue.use(Router);

const router = new Router({
    mode: 'history', /* mode: 'history' oculta o # da url */
    routes: [
        {
            name: 'login',
            path: '/login',
            component: Login,
        },
        {
            name: 'home',
            path: '/',
            component: Home,
            meta: {
                requiresAuth: true,
                breadcrumb: [
                  { name: "Dashboard"}
                ]
              },
        },
        {
            name: 'controle-gastos',
            path: '/controle-gastos',
            component: ControleGastos,
            meta: {
                requiresAuth: true,
                breadcrumb: [
                  { name: "Contabilidade"}
                ]
              },
        }
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const userLocalStorage = localStorage.getItem('user')
    let isAuthenticated = false;

    let user = null
    if(userLocalStorage != "undefined"){
      user = JSON.parse(localStorage.getItem('user'))
      isAuthenticated = user != null ? true : false;
    }

    if (requiresAuth && !isAuthenticated) {
      next("/login")
    } else {
      next();
    }
});

export default router;