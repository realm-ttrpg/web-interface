<script lang="ts" setup>
import { RealmUser } from "@/lib/realm";

defineProps<{
	user: RealmUser;
	size: number;
}>();
</script>

<template>
	<img
		:height="size"
		:src="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=${size}`"
		:width="size"
	/>
</template>
