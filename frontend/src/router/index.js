import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history', /* mode: 'history' oculta o # da url */
    routes: [
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/login/Index'),
        },
        {
          path: '/',
          component: () => import('@/views/Index'),
          children: [
            {
              name: 'Home',
              path: '',
              component: () => import('@/views/Home'),
              meta: {
                requiresAuth: true,
                breadcrumb: [
                  { name: "Dashboard"}
                ]
              },
            },
          ],
        },
        {
            path: '/contabilidade',
            component: () => import('@/views/Index'),
            children: [
              {
                name: 'Contabilidade',
                path: '/contabilidade',
                component: () => import('@/views/contabilidade/Historico'),
                meta: {
                  requiresAuth: true,
                  breadcrumb: [
                    { name: "Contabilidade"}
                  ]
                },
              }
            ],
        },
        {
          path: '/perfil',
          component: () => import('@/views/Index'),
          children: [
            {
              name: 'Perfil',
              path: '/perfil',
              component: () => import('@/views/perfil/Edit.vue'),
              meta: {
                requiresAuth: true,
                breadcrumb: [
                  { name: "Meu Perfil"},
                ]
              },
            },
            {
              name: 'Logout',
              path: '/logout',
              component: () => import('@/views/perfil/Logout.vue'),
              meta: {
                requiresAuth: true,
              },
            },
          ],
        },
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