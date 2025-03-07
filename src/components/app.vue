<script lang="ts" setup>
import { ref } from "vue";
import { getLoginToken } from "../lib/auth";
import {
	getDiscordGuilds,
	getDiscordToken,
	getDiscordUser,
	getSharedGuilds,
} from "../lib/discord";
import DiscordAvatar from "./discord-avatar.vue";

// make sure we're logged into discord
const token = getDiscordToken();

// get discord user info
const user = ref(await getDiscordUser(token));

// log into realm
getLoginToken(user.value, token);

// get list of guilds user is in
const guilds = ref(
	(await getDiscordGuilds(token)).sort((a, b) => a.name.localeCompare(b.name)),
);

// filter to guilds shared with the bot
const sharedGuilds = await getSharedGuilds(guilds.value.map((g) => g.id));
const filteredGuilds = guilds.value.filter((g) =>
	sharedGuilds.includes(parseInt(g.id)),
);
</script>

<template>
	<div class="c">
		<h1>Realm TTRPG</h1>
		<p>
			You are logged in as
			<DiscordAvatar
				class="am di mr-xxs"
				:user="user.id"
				:avatar="user.avatar"
				:size="32"
			></DiscordAvatar>
			<strong>{{ user.username }}</strong
			>.
		</p>
		<select>
			<option v-for="guild of filteredGuilds" :key="guild.id" :value="guild.id">
				{{ guild.name }}
			</option>
		</select>
	</div>
</template>
