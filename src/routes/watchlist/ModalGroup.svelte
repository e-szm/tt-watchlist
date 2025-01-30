<script lang="ts">
	import DeleteWatchlist from '$lib/modals/DeleteWatchlist.svelte';
	import NewSymbol from '$lib/modals/NewSymbol.svelte';
	import NewWatchlist from '$lib/modals/NewWatchlist.svelte';

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
