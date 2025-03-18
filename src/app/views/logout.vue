<script lang="ts" setup>
import { doneLoading } from "@/app/lib/global";
import RealmClient from "@/app/lib/realm";
import { inject, onMounted } from "vue";

const realm: RealmClient = inject("realmClient")!;
await realm.logout();

onMounted(() => doneLoading());
</script>

<template>
	<h1>Logged out</h1>
	<p>You have been logged out.</p>
</template>
