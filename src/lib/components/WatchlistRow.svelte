<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	interface WatchlistRowProps {
		symbol: string;
		marketDataRefresh: boolean;
	}

	let { symbol, marketDataRefresh }: WatchlistRowProps = $props();
	let marketData = $state({
		bid: '-',
		ask: '-',
		last: '-'
	});

	$effect(() => {
		marketDataRefresh; // Observe state to sync each row's update to parent's interval

		console.log('Time to refresh!');
		async function getMarketData() {
			let res;
			try {
				res = await fetch(`/watchlist/symbol/${symbol}`);
			} catch (err) {
				return console.error(err);
			}
			if (res.redirected) goto(res.url);

			let data;
			try {
				data = await res.json();
			} catch (err) {
				return console.error(err);
			}

			marketData.bid = data.bid;
			marketData.ask = data.ask;
			marketData.last = data.last;
		}
		getMarketData();
	});
</script>

<tr>
	<td>{symbol}</td>
	<td>${marketData.bid}</td>
	<td>${marketData.ask}</td>
	<td>${marketData.last}</td>
	<td
		><form method="POST" action="?/deleteSymbol" use:enhance>
			<input name="symbol" type="hidden" value={symbol} />
			<button aria-label="Delete {symbol} symbol">X</button>
		</form>
	</td>
</tr>

<style>
	tr {
		border-bottom: 1px solid var(--dark-blue--300);
	}

	td {
		padding: 2rem 4.4rem 2rem 0;
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
</style>
