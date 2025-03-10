import "@fontsource/shrikhand";
import "@haliphax/nubbins/dist/nubbins.min.css";
import { createApp } from "vue";
import router from "./router";
import Wrapper from "./wrapper.vue";

try {
	const app = createApp(Wrapper);
	app.use(router);
	app.mount("#app");
} catch (ex) {
	document.getElementById("app")!.innerText = "Something went wrong.";
	console.error(ex);
}
