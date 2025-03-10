import { User } from "./discord";

const realmApi = import.meta.env.VITE_APP_REALM_API;

export default class RealmClient {
	private readonly token: string;
	private readonly user_id: string;

	constructor(user: User, token: string) {
		this.token = token;
		this.user_id = user.id;
	}

	static async create(user: User, discordToken: string) {
		const realmToken = await fetch(`${realmApi}/auth/login`, {
			body: JSON.stringify({
				token: discordToken,
				user_id: user.id,
			}),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		})
			.then((r) => r.json())
			.then((d) => d.token);

		return new RealmClient(user, realmToken);
	}

	async realmApi(url: string, opts: Partial<RequestInit>): Promise<Response> {
		return await fetch(`${realmApi}${url}`, {
			...opts,
			headers: {
				...opts.headers,
				"Content-Type": "application/json",
				"X-Realm-User": this.user_id,
				"X-Realm-Token": this.token,
			},
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
}
