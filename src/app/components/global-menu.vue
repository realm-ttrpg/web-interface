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
		<details ref="details">
			<summary>Menu</summary>
			<ul ref="items" class="menu-items">
				<li>
					<router-link :to="{ name: 'main' }">Main</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'test' }">Test page</router-link>
				</li>
				<li v-if="router.currentRoute.value.name != 'logout'">
					<router-link :to="{ name: 'logout' }">Logout</router-link>
				</li>
			</ul>
		</details>
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

	& > li {
		display: inline-block;

		&:not(:last-child) {
			margin-right: var(--space-l);
		}
	}

	& a.router-link-active:not(:hover) {
		color: var(--color-pri-2);
	}
}
</style>
