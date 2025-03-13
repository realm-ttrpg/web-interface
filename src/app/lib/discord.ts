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
	token: string;

	constructor() {
		const urlMatch = /\baccess_token=([^&]+)/i.exec(window.location.hash);
		const urlToken = urlMatch ? urlMatch[1] : null;
		const redirectUri = window.location.href.replace(/[#?].*$/, "");

		if (urlToken) {
			Cookies.set("discordToken", urlToken, {
				expires: 30,
				sameSite: "strict",
				secure: true,
			});
			window.location.assign(redirectUri);

			throw "Reloading page to use Discord token from URL";
		}

		const token = Cookies.get("discordToken");

		if (!token) {
			const oauthScope = ["identify", "guilds", "guilds.members.read"];

			Cookies.remove("discordToken");
			window.location.assign(
				`https://discord.com/oauth2/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${oauthScope.join("+")}`,
			);

			throw "Retrieving Discord token";
		}

		this.token = token;
	}

	async discordApi(url: string): Promise<Response> {
		return await fetch(`https://discord.com/api/v10${url}`, {
			headers: { Authorization: `Bearer ${this.token}` },
		}).then((r) => {
			if (r.status === 429) {
				alert("Too many requests. Slow down.");
				throw "Too many requests";
			} else if (r.status >= 400 && r.status < 500) {
				Cookies.remove("discordToken");
				console.error(r);
				window.location.reload();
				throw "Discord API error; reloading page";
			} else if (r.status >= 500) {
				Cookies.remove("discordToken");
				alert("Error contacting Discord API");
				throw "Error contacting Discord API";
			}

			return r;
		});
	}

	async logout() {
		this.token = "";
		Cookies.remove("discordToken");
	}

	async getDiscordUser(): Promise<User> {
		return await this.discordApi("/oauth2/@me")
			.then((r) => r.json())
			.then((d) => d.user);
	}
}
