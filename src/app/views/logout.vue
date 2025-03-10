<script lang="ts" setup>
import DiscordClient from "@/lib/discord";
import RealmClient from "@/lib/realm";
import Cookies from "js-cookie";
import { inject } from "vue";

const discord: DiscordClient = inject("discordClient")!;
const realm: RealmClient = inject("realmClient")!;

await realm.logout();
discord.token = "";
Cookies.remove("discordToken");
Cookies.remove("realmToken");
</script>

<template>
	<h1>Logged out</h1>
	<p>You have been logged out.</p>
</template>
