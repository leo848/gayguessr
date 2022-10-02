import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './views/Dashboard.vue'

// @ts-ignore
const base = import.meta.env.BASE_URL;

const routes = [
	{
		path: base,
		name: 'Dashboard',
		component: Dashboard
	}
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
