<script lang="ts" setup>
import DiscordAvatar from "@/components/discord-avatar.vue";
import { doneLoading } from "@/lib/global";
import RealmClient from "@/lib/realm";
import { inject, onMounted } from "vue";

const realm: RealmClient = inject("realmClient")!;

// filter to guilds shared with the bot
const sharedGuilds = await realm.getSharedGuilds();

onMounted(() => doneLoading());
</script>

<template>
	<h1>Realm TTRPG</h1>
	<p>
		You are logged in as
		<DiscordAvatar
			class="am di mr-xxs"
			:user="realm.user"
			:size="32"
		></DiscordAvatar>
		<strong>{{ realm.user.name }}</strong
		>.
	</p>
	<p>
		<select>
			<option v-for="guild of sharedGuilds" :key="guild.id" :value="guild.id">
				{{ guild.name }}
			</option>
		</select>
	</p>
</template>
