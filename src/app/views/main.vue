<script lang="ts" setup>
import DiscordAvatar from "@/components/discord-avatar.vue";
import DiscordClient, { User } from "@/lib/discord";
import RealmClient from "@/lib/realm";
import { inject } from "vue";

const discord: DiscordClient = inject("discordClient")!;
const realm: RealmClient = inject("realmClient")!;
const user: User = inject("user")!;

// get list of guilds user is in
const guilds = (await discord.getDiscordGuilds()).sort((a, b) =>
	a.name.localeCompare(b.name),
);

// filter to guilds shared with the bot
const sharedGuilds = await realm.getSharedGuilds(guilds.map((g) => g.id));
const filteredGuilds = guilds.filter((g) => sharedGuilds.includes(g.id));
</script>

<template>
	<h1>Realm TTRPG</h1>
	<p>
		You are logged in as
		<DiscordAvatar class="am di mr-xxs" :user="user" :size="32"></DiscordAvatar>
		<strong>{{ user.username }}</strong
		>.
	</p>
	<p>
		<select>
			<option v-for="guild of filteredGuilds" :key="guild.id" :value="guild.id">
				{{ guild.name }}
			</option>
		</select>
	</p>
</template>
