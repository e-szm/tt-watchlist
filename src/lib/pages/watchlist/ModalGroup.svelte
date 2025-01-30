<script lang="ts">
	import NewWatchlist from './modals/NewWatchlist.svelte';
	import DeleteWatchlist from './modals/DeleteWatchlist.svelte';
	import NewSymbol from './modals/NewSymbol.svelte';

	interface ModalGroupProps {
		openModal: String;
		onCloseModal: () => void;
	}

	let { openModal, onCloseModal }: ModalGroupProps = $props();
</script>

{#if openModal === 'new-watchlist'}
	<NewWatchlist onClose={onCloseModal} />
{:else if openModal === 'delete-watchlist'}
	<DeleteWatchlist onClose={onCloseModal} />
{:else if openModal === 'new-symbol'}
	<NewSymbol onClose={onCloseModal} />
{/if}
