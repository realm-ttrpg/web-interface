import Cookies from "js-cookie";
import { User } from "./discord";

const realmApi = import.meta.env.VITE_APP_REALM_API;

/** Realm REST API client */
export default class RealmClient {
	private token: string;
	private readonly user_id: string;

	constructor(user: User, token: string) {
		this.token = token;
		this.user_id = user.id;
	}

	static async create(user: User, discordToken: string) {
		let realmToken = Cookies.get("realmToken");

		if (!realmToken) {
			realmToken = await fetch(`${realmApi}/auth/login`, {
				body: JSON.stringify({
					token: discordToken,
					user_id: user.id,
				}),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			})
				.then((r) => {
					if (r.status >= 300) {
						console.error(r);
						alert("Error logging into Realm");

						throw "Error logging into Realm";
					}

					return r.json();
				})
				.then((d) => d.token);
			Cookies.set("realmToken", realmToken!, {
				expires: 30,
				sameSite: "strict",
			});
		}

		return new RealmClient(user, realmToken!);
	}

	async realmApi(url: string, opts: Partial<RequestInit>): Promise<Response> {
		return await fetch(`${realmApi}${url}`, {
			credentials: "omit",
			...opts,
			headers: {
				...opts.headers,
				"Content-Type": "application/json",
				"X-Realm-User": this.user_id,
				"X-Realm-Token": this.token,
			},
		}).then((r) => {
			if (r.status >= 300) {
				Cookies.remove("realmToken");
				window.location.reload();

				throw "Realm API error; reloading page";
			}

			return r;
		});
	}

	async getSharedGuilds(guild_ids: string[]) {
		return await this.realmApi("/auth/shared-guilds", {
			body: JSON.stringify({ guild_ids }),
			method: "POST",
		})
			.then((r) => r.json())
			.then((d) => d.guild_ids);
	}

	async logout() {
		await this.realmApi("/auth/logout", { method: "POST" });
		this.token = "";
	}
}
