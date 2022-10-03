import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './views/Dashboard.vue'

// @ts-ignore
const base = import.meta.env.BASE_URL;

const routes = [
	{
		path: base,
		alias: ['/', `${base}dashboard`],
		name: 'Dashboard',
		component: Dashboard
	},
	{
		path: `${base}game`,
		name: 'Game',
		component: () => import('./views/Game.vue')
	},
	{
		path: `${base}identity/:id`,
		name: 'Identity',
		component: () => import('./views/Identity.vue')
	}
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
