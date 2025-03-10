import { createRouter, createWebHashHistory } from "vue-router";
import Main from "./views/main.vue";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			component: Main,
			name: "main",
		},
	],
});

export default router;
