import "@haliphax/nubbins/dist/nubbins.min.css";
import { createApp } from "vue";
import Wrapper from "./lib/components/wrapper.vue";

try {
	createApp(Wrapper).mount("#app");
} catch (ex) {
	document.getElementById("app")!.innerText = "Something went wrong.";
}
