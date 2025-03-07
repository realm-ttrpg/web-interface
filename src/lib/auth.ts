import { User, getNewDiscordToken } from "./discord";

const realmApi = import.meta.env.VITE_APP_REALM_API;

export const getLoginToken = async (user: User, token: string) => {
	try {
		return await fetch(`${realmApi}/auth/login`, {
			body: JSON.stringify({
				token: token,
				user_id: user.id,
			}),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		})
			.then((r) => r.json())
			.then((d) => d.token);
	} catch (ex) {
		console.log("Exception; getting new token");
		console.error(ex);
		getNewDiscordToken();
	}
};
