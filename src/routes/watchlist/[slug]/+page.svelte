<script lang="ts">
	import type { LayoutProps } from '../$types';
	import WatchlistTable from '$lib/pages/watchlist/WatchlistTable.svelte';

	let { data }: LayoutProps = $props();
</script>

<WatchlistTable {data} />
