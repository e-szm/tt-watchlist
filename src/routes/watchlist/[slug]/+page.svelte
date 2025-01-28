<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutProps } from '../$types';

	let { data }: LayoutProps = $props();
	let entries = $derived(
		data.watchlists.find((watchlist) => watchlist.name === page.params.slug)?.['watchlist-entries']
	);

	console.log('page load');
</script>

<div class="watchlist-table">
	{#if entries}
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
				{#each entries as entry}
					<tr>
						<td>{entry.symbol}</td>
						<td>$55.25</td>
						<td>$55.23</td>
						<td>$55.26</td>
						<td
							><form method="POST" action="?/deleteSymbol">
								<input name="symbol" type="hidden" value={entry.symbol} />
								<button aria-label="Delete {entry.symbol} symbol">X</button>
							</form></td
						>
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

	form button {
		font-family: inherit;
		color: var(--red--700);
		font-weight: 600;

		border: none;
		background-color: inherit;

		transition: transform 200ms;
		cursor: pointer;
	}

	form button:hover {
		transform: scale(1.5);
	}

	.help-box {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
