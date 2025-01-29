<script lang="ts">
	import { page } from '$app/state';
	import WatchlistRow from '$lib/components/WatchlistRow.svelte';
	import type { LayoutProps } from '../$types';

	let { data }: LayoutProps = $props();
	let entries = $derived(
		data.watchlists.find((watchlist) => watchlist.name === page.params.slug)?.['watchlist-entries']
	);
	let marketDataRefresh = $state(true);

	$effect(() => {
		if (!entries?.length) return;

		console.log('We have entries');
		const interval = setInterval(() => {
			console.log('INTERVAL!');
			marketDataRefresh = !marketDataRefresh;
		}, 5000);

		return () => {
			console.log('dismount!');
			clearInterval(interval);
		};
	});
</script>

<div class="watchlist-table">
	{#if entries?.length}
		<table>
			<thead>
				<tr>
					<th scope="col">Symbol</th>
					<th scope="col">Bid Price</th>
					<th scope="col">Ask Price</th>
					<th scope="col">Last Price</th>
				</tr>
			</thead>
			<tbody>
				{#each entries as entry (entry.symbol)}
					<WatchlistRow symbol={entry.symbol} {marketDataRefresh} />
				{/each}
			</tbody>
		</table>
	{:else}
		<div class="help-box">
			<p>Add a symbol to your watchlist using "<strong>+ Add Symbol</strong>" below.</p>
		</div>
	{/if}
</div>

<style>
	.watchlist-table {
		overflow-y: auto;
	}

	table {
		width: 100%;

		text-align: right;
		border-collapse: collapse;
	}

	tr {
		border-bottom: 1px solid var(--dark-blue--300);
	}

	th {
		padding: 2rem 4.4rem 2rem 0;
		letter-spacing: 0.6px;
	}

	.help-box {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
