import Cookies from "js-cookie";
import DiscordClient from "./discord";

const realmApi = import.meta.env.VITE_APP_REALM_API;

export type RealmUser = {
	id: string;
	name: string;
	avatar: string;
};

/** Realm REST API client */
export default class RealmClient {
	private token: string;
	private readonly user: RealmUser;

	constructor(user: RealmUser, token: string) {
		this.token = token;
		this.user = user;
	}

	static async create() {
		let realmToken = Cookies.get("realmToken");
		let realmUser: RealmUser | null = JSON.parse(
			localStorage.getItem("realm.user") ?? "null",
		);

		if (!realmToken || !realmUser) {
			const discord = new DiscordClient();
			const user = await discord.getDiscordUser();

			const loginResponse = await fetch(`${realmApi}/auth/login`, {
				body: JSON.stringify({
					token: discord.token,
					user_id: user.id,
				}),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			}).then((r) => {
				if (r.status !== 200) {
					alert("Error logging into Realm");
					throw "Error logging into Realm";
				}

				return r.json();
			});
			realmToken = loginResponse.token;
			realmUser = {
				id: loginResponse.user.id,
				name: loginResponse.user.name,
				avatar: loginResponse.user.avatar,
			};
			localStorage.setItem("realm.user", JSON.stringify(realmUser));
			Cookies.set("realmToken", realmToken!, {
				expires: 30,
				sameSite: "strict",
				secure: true,
			});

			const redirectUri = window.location.href.replace(/[#?].*$/, "");
			window.location.assign(redirectUri);

			throw "Reloading page to use new session";
		}

		return new RealmClient(realmUser, realmToken!);
	}

	async realmApi(url: string, opts?: Partial<RequestInit>): Promise<Response> {
		return await fetch(`${realmApi}${url}`, {
			credentials: "omit",
			...opts,
			headers: {
				...opts?.headers,
				"Content-Type": "application/json",
				"X-Realm-User": this.user.id,
				"X-Realm-Token": this.token,
			},
		}).then((r) => {
			if (r.status === 401 || r.status === 403) {
				Cookies.remove("realmToken");
				localStorage.removeItem("realm.user");
				window.location.reload();
				throw "Realm auth bad/expired; reloading page";
			} else if (r.status === 429) {
				alert("Too many requests. Slow down.");
				throw "Too many requests";
			} else if (r.status >= 400) {
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
