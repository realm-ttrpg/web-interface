<script lang="ts" setup>
import DiscordClient from "@/lib/discord";
import RealmClient from "@/lib/realm";
import { onMounted, provide } from "vue";
import GlobalMenu from "./components/global-menu.vue";

// make sure we're logged into discord
const discord = new DiscordClient();

// get discord user info
const user = await discord.getDiscordUser();

// log into realm
const realm = await RealmClient.create(user, discord.token);

provide("discordClient", discord);
provide("realmClient", realm);
provide("user", user);

onMounted(() => {
	document.getElementById("apploading")!.remove();
});
</script>

<template>
	<div class="c">
		<GlobalMenu></GlobalMenu>
		<p id="loading">⏳ Loading...</p>
		<a name="main"></a>
		<router-view></router-view>
	</div>
</template>
