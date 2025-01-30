<script lang="ts">
	import type { LayoutProps } from './$types';
	import Watchlist from '$lib/pages/watchlist/Watchlist.svelte';

	let { data, children }: LayoutProps = $props();
</script>

<header>&nbsp;</header>
<main class="container">
	<Watchlist {data}>
		{@render children()}
	</Watchlist>
</main>
<footer>&nbsp;</footer>

<style>
	header {
		height: 6rem;
		background-color: var(--light-blue--600);
	}
</style>
