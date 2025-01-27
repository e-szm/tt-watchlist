<script lang="ts">
	import type { PageProps } from './$types';

	import Select from '$lib/components/Select.svelte';
	import Button from '$lib/components/Button.svelte';
	import NewWatchlist from '$lib/modals/NewWatchlist.svelte';

	let openModal = $state('');

	let { data }: PageProps = $props();

	function handleOpenModal(name: string) {
		if (openModal === name) return;
		openModal = name;
	}

	function handleCloseModal() {
		openModal = '';
	}
</script>

<NewWatchlist {openModal} onClose={handleCloseModal} />
<header></header>
<main class="container">
	<div class="watchlist grid--1-col">
		<menu>
			<li>
				<Select name="watchlist" label="Watchlist to display" --width="30rem">
					{#each data.items as watchlist}
						<option value={watchlist.name.toLocaleLowerCase()}>{watchlist.name}</option>
					{/each}
				</Select>
			</li>
			<li>
				<Button type="button" look="primary" onclick={() => handleOpenModal('new-watchlist')}
					>New Watchlist</Button
				>
			</li>
		</menu>
		<div class="watchlist-table">
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
					<tr>
						<td>AAPL</td>
						<td>$55.25</td>
						<td>$55.23</td>
						<td>$55.26</td>
					</tr>
					<tr>
						<td>AAPL</td>
						<td>$55.25</td>
						<td>$55.23</td>
						<td>$55.26</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="table-footer"><Button type="button" look="link">+ Add Symbol</Button></div>
	</div>
</main>

<style>
	header {
		height: 6rem;
		background-color: var(--light-blue--600);
	}

	.watchlist {
		grid-template-rows: auto 1fr auto;

		max-width: 98rem;
		height: 63rem;
		margin: 0 auto;

		background-color: #fff;
		border-radius: var(--border-radius--xl);

		overflow: hidden;
	}

	menu {
		display: flex;
		align-items: flex-end;
		flex-wrap: wrap;
		gap: 2.4rem;
		padding: 2rem 3.8rem;

		list-style: none;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}

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

	.table-footer {
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}
</style>
