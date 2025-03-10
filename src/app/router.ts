import { createRouter, createWebHistory } from "vue-router";
import { ROOT_URI } from "./constants";
import Main from "./views/main.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: ROOT_URI,
			component: Main,
			name: "main",
		},
	],
});

export default router;
