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
		meta: { title: 'dashboard' },
	},
	{
		path: `${base}game`,
		name: 'Game',
		component: () => import('./views/Game.vue'),
		meta: { title: 'game' },
	},
	{
		path: `${base}label/:id`,
		name: 'Label',
		component: () => import('./views/Label.vue'),
		meta: { title: 'label' },
	},
	{
		path: `${base}all-flags`,
		name: 'AllFlags',
		component: () => import('./views/AllFlags.vue'),
		meta: { title: 'all flags' },
	}
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
