import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './views/Dashboard.vue'

// @ts-ignore
const base = import.meta.env.BASE_URL;

const routes = [
	{
		path: base,
		alias: ['/', `${base}/dashboard`],
		name: 'Dashboard',
		component: Dashboard
	},
	{
		path: `${base}game`,
		name: 'Game',
		component: () => import('./views/Game.vue')
	}
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
