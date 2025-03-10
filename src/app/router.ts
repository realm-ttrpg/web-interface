import { createRouter, createWebHistory } from "vue-router";
import Main from "./views/main.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: Main,
			name: "main",
		},
	],
});

export default router;
