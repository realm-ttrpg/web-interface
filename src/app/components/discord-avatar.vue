<script lang="ts" setup>
import { RealmUser } from "@/app/lib/realm";

defineProps<{
	user: RealmUser;
	size: number;
}>();
</script>

<template>
	<img
		:src="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=${size}`"
	/>
</template>
