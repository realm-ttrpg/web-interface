import "@haliphax/nubbins/dist/nubbins.min.css";
import { getDiscordUser } from "./lib/discord";

const user = await getDiscordUser();
document.querySelector("p")!.innerHTML = `
	You are logged in as
	<img class="dib" height="24" width="24" src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=24" />
	<strong>${user.username}</strong>.
	`;
