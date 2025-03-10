import Cookies from "js-cookie";

export interface Thing {
	id: string;
}

export interface NamedThing extends Thing {
	name: string;
}

export interface User extends NamedThing {
	avatar: string;
	username: string;
}

/** Discord REST API client */
export default class DiscordClient {
	private readonly clientId: string = import.meta.env.VITE_APP_CLIENT_ID;
	readonly token: string;

	constructor() {
		const urlMatch = /\baccess_token=([^&]+)/i.exec(window.location.hash);
		const urlToken = urlMatch ? urlMatch[1] : null;

		if (urlToken) {
			Cookies.set("token", urlToken, { expires: 30, sameSite: "strict" });
		}

		const token = Cookies.get("token");

		if (!token) {
			const oauthScope = ["identify", "guilds", "guilds.members.read"];
			const redirectUri = window.location.href.replace(/[#?].*$/, "");

			Cookies.remove("token");
			window.location.assign(
				`https://discord.com/oauth2/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${oauthScope.join("+")}`,
			);

			throw "Retrieving auth token";
		}

		this.token = token;
	}

	async discordApi(url: string): Promise<Response> {
		return await fetch(`https://discord.com/api/v10${url}`, {
			headers: { Authorization: `Bearer ${this.token}` },
		});
	}

	async getDiscordUser(): Promise<User> {
		return await this.discordApi("/oauth2/@me")
			.then((r) => r.json())
			.then((d) => d.user);
	}

	async getDiscordGuilds(): Promise<Array<NamedThing>> {
		return await this.discordApi("/users/@me/guilds").then((r) => r.json());
	}
}
