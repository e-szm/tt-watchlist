<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import type { LayoutProps } from './$types';

	import Select from '$lib/components/Select.svelte';
	import Button from '$lib/components/Button.svelte';
	import NewWatchlist from '$lib/modals/NewWatchlist.svelte';

	let { data, children }: LayoutProps = $props();
	let openModal = $state('');

	const currentWatchlist = page.params.slug;

	function handleOpenModal(name: string) {
		if (openModal === name) return;
		openModal = name;
	}

	function handleCloseModal() {
		openModal = '';
	}

	function handleChangeWatchlist(e: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		const target = e.target as HTMLSelectElement;
		if (e.target) goto(`/watchlist/${target.value}`, { invalidateAll: true });
	}
</script>

<NewWatchlist {openModal} onClose={handleCloseModal} />
<header></header>
<main class="container">
	<div class="watchlist grid--1-col">
		<menu>
			<li>
				<Select
					name="watchlist"
					label="Watchlist to display"
					onChange={handleChangeWatchlist}
					--width="30rem"
				>
					{#each data.watchlists as watchlist}
						<option value={watchlist.name} selected={watchlist.name === currentWatchlist}
							>{watchlist.name}</option
						>
					{/each}
				</Select>
			</li>
			<li>
				<Button type="button" look="primary" onclick={() => handleOpenModal('new-watchlist')}
					>New Watchlist</Button
				>
			</li>
		</menu>

		{@render children()}

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

	.table-footer {
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}
</style>
