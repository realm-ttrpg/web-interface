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
					if (r.status !== 200) {
						alert("Error logging into Realm");
						throw "Error logging into Realm";
					}

					return r.json();
				})
				.then((d) => d.token);
			Cookies.set("realmToken", realmToken!, {
				expires: 30,
				sameSite: "strict",
				secure: true,
			});
		}

		return new RealmClient(user, realmToken!);
	}

	async realmApi(url: string, opts?: Partial<RequestInit>): Promise<Response> {
		return await fetch(`${realmApi}${url}`, {
			credentials: "omit",
			...opts,
			headers: {
				...opts?.headers,
				"Content-Type": "application/json",
				"X-Realm-User": this.user_id,
				"X-Realm-Token": this.token,
			},
		}).then((r) => {
			if (r.status === 429) {
				alert("Too many requests. Slow down.");
				throw "Too many requests";
			} else if (r.status >= 400 && r.status < 500) {
				Cookies.remove("realmToken");
				window.location.reload();
				throw "Realm API error; reloading page";
			} else if (r.status >= 500) {
				alert("Error contacting Realm API");
				throw "Error contacting Realm API";
			}

			return r;
		});
	}

	async getSharedGuilds() {
		return await this.realmApi("/auth/shared-guilds")
			.then((r) => r.json())
			.then((d) => d.guilds);
	}

	async logout() {
		await this.realmApi("/auth/logout", { method: "POST" });
		this.token = "";
		Cookies.remove("realmToken");
	}
}
