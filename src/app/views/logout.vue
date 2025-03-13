<script lang="ts" setup>
import DiscordClient from "@/lib/discord";
import { doneLoading } from "@/lib/global";
import RealmClient from "@/lib/realm";
import { inject, onMounted } from "vue";

const discord: DiscordClient = inject("discordClient")!;
const realm: RealmClient = inject("realmClient")!;

await realm.logout();
await discord.logout();

onMounted(() => doneLoading());
</script>

<template>
	<h1>Logged out</h1>
	<p>You have been logged out.</p>
</template>
