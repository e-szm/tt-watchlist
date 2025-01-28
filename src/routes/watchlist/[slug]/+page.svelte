<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutProps } from '../$types';

	let { data }: LayoutProps = $props();
	let symbols = $derived(
		data.watchlists.find((watchlist) => watchlist.name === page.params.slug)?.['watchlist-entries']
	);
</script>

<div class="watchlist-table">
	{#if symbols}
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
				{#each symbols as symbol}
					<tr>
						<td>{symbol.symbol}</td>
						<td>$55.25</td>
						<td>$55.23</td>
						<td>$55.26</td>
					</tr>
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

	td,
	th {
		padding: 2rem 4.4rem 2rem 0;
	}

	th {
		letter-spacing: 0.6px;
	}

	.help-box {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
