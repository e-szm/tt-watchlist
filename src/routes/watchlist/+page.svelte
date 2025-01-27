<script lang="ts">
	import { goto } from '$app/navigation';
	import type { LayoutProps } from './$types';

	let { data }: LayoutProps = $props();

	$effect(() => {
		if (data.watchlists[0]) goto(`/watchlist/${data.watchlists[0].name}`);
	});
</script>

<div>
	<p>You must first create or select a watchlist, then you can add symbols to it.</p>
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;

		text-align: center;
	}
</style>
