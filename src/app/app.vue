<script lang="ts" setup>
import RealmClient from "@/lib/realm";
import { onMounted, provide } from "vue";
import GlobalMenu from "./components/global-menu.vue";

// make sure we're logged into realm
const realm = await RealmClient.create();

provide("realmClient", realm);

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
