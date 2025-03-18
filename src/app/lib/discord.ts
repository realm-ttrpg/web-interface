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

		if (!urlToken) {
			const oauthScope = ["identify", "guilds", "guilds.members.read"];
			const redirectUri = window.location.href.replace(/[#?].*$/, "");

			window.location.assign(
				`https://discord.com/oauth2/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${oauthScope.join("+")}`,
			);

			throw "Retrieving Discord token";
		}

		this.token = urlToken;
	}

	async discordApi(url: string): Promise<Response> {
		return await fetch(`https://discord.com/api/v10${url}`, {
			headers: { Authorization: `Bearer ${this.token}` },
		}).then((r) => {
			if (r.status === 429) {
				alert("Too many requests. Slow down.");
				throw "Too many requests";
			} else if (r.status !== 200) {
				alert("Error contacting Discord API");
				throw "Error contacting Discord API";
			}

			return r;
		});
	}

	async getDiscordUser(): Promise<User> {
		return await this.discordApi("/oauth2/@me")
			.then((r) => r.json())
			.then((d) => d.user);
	}
}
