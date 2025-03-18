<script lang="ts" setup>
import DiscordAvatar from "@/app/components/discord-avatar.vue";
import { doneLoading } from "@/app/lib/global";
import RealmClient from "@/app/lib/realm";
import { inject, onMounted } from "vue";

const realm: RealmClient = inject("realmClient")!;
const sharedGuilds = await realm.getSharedGuilds();

onMounted(() => doneLoading());
</script>

<template>
	<h1>
		<img src="@/assets/favicon.gif" class="dib" />
		Realm
	</h1>
	<p>
		You are logged in as
		<DiscordAvatar
			class="am dib mr-xxs"
			:user="realm.user"
			:size="128"
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

<style lang="css" scoped>
h1 img {
	height: 0.75em;
	width: 0.75em;
}

p img {
	height: 1.2em;
	width: 1.2em;
}
</style>
