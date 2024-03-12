<script lang="ts" setup>
defineProps(["avatar", "size", "user"]);
</script>

<template>
	<img
		:height="size"
		:src="`https://cdn.discordapp.com/avatars/${user}/${avatar}.jpg?size=${size}`"
		:width="size"
	/>
</template>
