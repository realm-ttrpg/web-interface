import Cookies from "js-cookie";

const API_BASE = "https://discord.com/api/v10";

export interface Thing {
	id: number;
}

export interface NamedThing extends Thing {
	name: string;
}

export interface User extends NamedThing {
	avatar: string;
	username: string;
}

export const getNewDiscordToken = () => {
	// @ts-ignore
	const clientId = import.meta.env.VITE_APP_CLIENT_ID;
	const oauthScope = ["identify", "guilds", "guilds.members.read"];
	const redirectUri = window.location.href;

	Cookies.remove("token");
	window.location.assign(
		`https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${oauthScope.join("+")}`,
	);

	throw "Retrieving auth token";
};

export const getDiscordToken = () => {
	const urlMatch = /\baccess_token=([^&]+)/i.exec(window.location.hash);
	const urlToken = urlMatch ? urlMatch[1] : null;

	if (urlToken) {
		Cookies.set("token", urlToken, { expires: 30, sameSite: "strict" });
	}

	const token = urlToken ?? Cookies.get("token");

	if (!token) {
		getNewDiscordToken();
		return "";
	}

	return token;
};

const discordApi = async (token: string, url: string) =>
	await fetch(`${API_BASE}${url}`, {
		headers: { Authorization: `Bearer ${token}` },
	});

export const getDiscordUser = async (token: string): Promise<User> =>
	await discordApi(token, "/oauth2/@me")
		.then((r) => r.json())
		.then((d) => d.user);

export const getDiscordGuilds = async (
	token: string,
): Promise<Array<NamedThing>> =>
	await discordApi(token, "/users/@me/guilds").then((r) => r.json());
