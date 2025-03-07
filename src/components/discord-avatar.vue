<script lang="ts" setup>
defineProps({
	avatar: { type: String, default: "" },
	size: { type: Number, default: 0 },
	user: { type: String, default: "" },
});
</script>

<template>
	<img
		:height="size"
		:src="`https://cdn.discordapp.com/avatars/${user}/${avatar}.jpg?size=${size}`"
		:width="size"
	/>
</template>
