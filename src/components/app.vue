<script lang="ts" setup>
import { ref } from "vue";
import {
	getDiscordGuilds,
	getDiscordToken,
	getDiscordUser,
} from "../lib/discord";
import DiscordAvatar from "./discord-avatar.vue";

const token = getDiscordToken();
const user = ref(await getDiscordUser(token));
const guilds = ref(
	(await getDiscordGuilds(token)).sort((a, b) => a.name.localeCompare(b.name)),
);
</script>

<template>
	<div class="c">
		<h1>Realm TTRPG</h1>
		<p>
			You are logged in as
			<DiscordAvatar
				class="di mr-xxs"
				:user="user.id"
				:avatar="user.avatar"
				:size="24"
			></DiscordAvatar>
			<strong>{{ user.username }}</strong
			>.
		</p>
		<select>
			<option v-for="guild of guilds" :key="id" :value="guild.id">
				{{ guild.name }}
			</option>
		</select>
	</div>
</template>
