<script lang="ts">
	import type { LayoutProps } from '../$types';
	import WatchlistTable from './WatchlistTable.svelte';

	let { data }: LayoutProps = $props();
</script>

<WatchlistTable {data} />
