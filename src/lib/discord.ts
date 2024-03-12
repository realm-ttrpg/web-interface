import Cookies from "js-cookie";

// @ts-ignore
const clientId = import.meta.env.VITE_APP_CLIENT_ID;
const oauthScope = ["identify", "guilds", "guilds.members.read"];
const redirectUri = window.location.href;

export const getDiscordUser = async () => {
	const urlMatch = /\baccess_token=([^&]+)/i.exec(window.location.hash);
	const urlToken = urlMatch ? urlMatch[1] : null;
	const token = urlToken ?? Cookies.get("token");

	if (!token) {
		window.location.assign(
			`https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${oauthScope.join("+")}`,
		);

		throw "Retrieving auth token";
	}

	Cookies.set("token", token, { expires: 30, sameSite: "strict" });

	return await fetch("https://discord.com/api/v10/oauth2/@me", {
		headers: { Authorization: `Bearer ${token}` },
	})
		.then((r) => r.json())
		.then((d) => d.user);
};
