import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../pages/Home.vue');
const Guide = () => import('../pages/Guide.vue');
const Charts = () => import('../pages/Charts.vue');

export const router = createRouter({
    history: createWebHistory('/delim-check/'),
    routes: [
        { path: '/', component: Home },
        { path: '/guide', component: Guide },
        { path: '/charts', component: Charts },
    ],
});
