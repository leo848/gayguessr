import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './views/Dashboard.vue'

// @ts-ignore
const base = import.meta.env.BASE_URL;

const routes = [
	{
		path: base,
		alias: ['/', `${base}dashboard`],
		name: 'Dashboard',
		component: Dashboard,
		meta: { title: 'Dashboard' },
	},
	{
		path: `${base}game`,
		name: 'Game',
		component: () => import('./views/Game.vue'),
		meta: { title: 'Game' },
	},
	{
		path: `${base}identity/:id`,
		name: 'Identity',
		component: () => import('./views/Identity.vue'),
		meta: { title: 'Identity' },
	}
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
