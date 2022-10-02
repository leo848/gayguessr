import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

// @ts-ignore
const base = import.meta.env.BASE_URL;

const routes = [
	{
		path: base,
		name: 'Home',
		component: Home
	}
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
