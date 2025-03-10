<script lang="ts" setup>
import { User } from "@/lib/discord";

defineProps<{
	user: User;
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
