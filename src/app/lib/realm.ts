import lscache from "lscache";
import DiscordClient, { NamedThing } from "./discord";

const REALM_API = import.meta.env.VITE_APP_REALM_API;
const RESPONSE_CACHE_MINUTES = 30;
const USER_CACHE_MINUTES = 480; // 6 hours

export type RealmUser = {
	id: string;
	name: string;
	avatar: string;
};

/** Realm REST API client */
export default class RealmClient {
	private token: string;
	readonly user: RealmUser;

	constructor(user: RealmUser, token: string) {
		this.token = token;
		this.user = user;
	}

	static async create() {
		let realmToken: string | null = lscache.get("realmToken");
		let realmUser: RealmUser | null = lscache.get("realmUser");

		if (!realmToken || !realmUser) {
			const discord = new DiscordClient();
			const user = await discord.getDiscordUser();

			const loginResponse = await fetch(`${REALM_API}/auth/login`, {
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
			lscache.set("realmUser", realmUser, USER_CACHE_MINUTES);
			lscache.set("realmToken", realmToken, USER_CACHE_MINUTES);
			window.location.assign(window.location.href.replace(/[#?].*$/, ""));

			throw "Reloading page to use new session";
		}

		return new RealmClient(realmUser, realmToken!);
	}

	async realmApi(url: string, opts?: Partial<RequestInit>): Promise<Response> {
		return await fetch(`${REALM_API}${url}`, {
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
				lscache.remove("realmToken");
				lscache.remove("realmUser");
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

	async getSharedGuilds(): Promise<NamedThing[]> {
		lscache.setBucket("requests");

		try {
			const cachedGuilds: NamedThing[] | null = lscache.get("sharedGuilds");

			if (cachedGuilds) return cachedGuilds;

			const guilds: NamedThing[] = await this.realmApi("/auth/shared-guilds")
				.then((r) => r.json())
				.then((d) => d.guilds);
			lscache.set("sharedGuilds", guilds, RESPONSE_CACHE_MINUTES);

			return guilds!;
		} finally {
			lscache.resetBucket();
		}
	}

	async logout() {
		await this.realmApi("/auth/logout", { method: "POST" });
		this.token = "";
		lscache.flush();
	}
}
