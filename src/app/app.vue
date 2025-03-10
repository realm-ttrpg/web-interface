<script lang="ts" setup>
import DiscordClient from "@/lib/discord";
import RealmClient from "@/lib/realm";
import { provide } from "vue";
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
</script>

<template>
	<div class="c">
		<GlobalMenu></GlobalMenu>
		<a name="main"></a>
		<router-view></router-view>
	</div>
</template>
