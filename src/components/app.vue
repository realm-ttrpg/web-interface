<script lang="ts" setup>
import { ref } from "vue";
import DiscordClient from "../lib/discord";
import RealmClient from "../lib/realm";
import DiscordAvatar from "./discord-avatar.vue";

// make sure we're logged into discord
const discord = new DiscordClient();

// get discord user info
const user = ref(await discord.getDiscordUser());

// log into realm
const realm = await RealmClient.create(user.value, discord.token);

// get list of guilds user is in
const guilds = ref(
	(await discord.getDiscordGuilds()).sort((a, b) =>
		a.name.localeCompare(b.name),
	),
);

// filter to guilds shared with the bot
const sharedGuilds = await realm.getSharedGuilds(guilds.value.map((g) => g.id));
const filteredGuilds = guilds.value.filter((g) => sharedGuilds.includes(g.id));
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
