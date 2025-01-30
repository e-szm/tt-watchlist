<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from '../../../routes/watchlist/$types';

	import Menu from './Menu.svelte';
	import TableFooter from './TableFooter.svelte';
	import ModalGroup from './ModalGroup.svelte';

	interface MenuProps {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: MenuProps = $props();
	let openModal = $state('');

	function handleOpenModal(name: string) {
		if (openModal === name) return;
		openModal = name;
	}

	function handleCloseModal() {
		openModal = '';
	}
</script>

<ModalGroup {openModal} onCloseModal={handleCloseModal} />
<div class="watchlist grid--1-col">
	<Menu {data} onOpenModal={handleOpenModal} />

	{@render children()}

	{#if data.watchlists.length}
		<TableFooter onOpenModal={handleOpenModal} />
	{/if}
</div>

<style>
	.watchlist {
		grid-template-rows: auto 1fr auto;

		max-width: 98rem;
		height: 63rem;
		margin: 0 auto;

		background-color: #fff;
		border-radius: var(--border-radius--xl);

		overflow: hidden;
	}
</style>
