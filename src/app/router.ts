import { createRouter, createWebHashHistory } from "vue-router";
import Logout from "./views/logout.vue";
import Main from "./views/main.vue";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			component: Main,
			name: "main",
		},
		{
			path: "/logout",
			component: Logout,
			name: "logout",
		},
	],
});

export default router;
