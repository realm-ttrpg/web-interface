<script lang="ts" setup>
import router from "@/router";
import { onMounted, Ref, ref } from "vue";

const details: Ref<HTMLDetailsElement | undefined> = ref();
const items: Ref<HTMLUListElement | undefined> = ref();

onMounted(() => {
	items
		.value!.querySelectorAll("a")
		.forEach((v) =>
			v.addEventListener("click", () => (details.value!.open = false)),
		);
});
</script>

<template>
	<nav>
		<ul ref="items" class="menu-items">
			<li>
				<router-link :to="{ name: 'main' }">Main</router-link>
			</li>
			<li v-if="router.currentRoute.value.name != 'logout'">
				<router-link :to="{ name: 'logout' }">Logout</router-link>
			</li>
		</ul>
	</nav>
</template>

<style scoped>
nav {
	margin-bottom: var(--space-m);
}

ul.menu-items {
	list-style: none;
	margin: 0;
	padding-left: 0;
}

ul.menu-items > li {
	display: inline-block;
	margin-right: var(--space-m);
}

ul.menu-items a.router-link-active {
	font-weight: bolder;
	text-decoration: none;
}
</style>
