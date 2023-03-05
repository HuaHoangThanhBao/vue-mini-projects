import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        name: '',
        component: () => import('./components/Foo.vue')
    },
    {
        path: '/bar',
        name: '',
        component: () => import('./components/Bar.vue')
    },
    {
        path: '/baz',
        name: '',
        component: () => import('./components/Baz.vue')
    }
  ],
})
