import "@haliphax/nubbins/dist/nubbins.min.css";
import "fontsource-shrikhand/latin-ext.css";
import { createApp } from "vue";
import Wrapper from "./components/wrapper.vue";

try {
	createApp(Wrapper).mount("#app");
} catch (ex) {
	document.getElementById("app")!.innerText = "Something went wrong.";
}
