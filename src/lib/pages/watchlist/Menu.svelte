<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import type { LayoutData } from '../../../routes/watchlist/$types';
	import type { ChangeEventHandler } from 'svelte/elements';

	import Button from '$lib/components/Button.svelte';
	import IconTrash from '$lib/components/IconTrash.svelte';
	import Select from '$lib/components/Select.svelte';

	interface MenuProps {
		data: LayoutData;
		onOpenModal: (name: string) => void;
	}

	let { data, onOpenModal }: MenuProps = $props();

	const handleChangeWatchlist: ChangeEventHandler<HTMLSelectElement> = (e) => {
		goto(`/watchlist/${encodeURIComponent(e.currentTarget.value)}`, { invalidateAll: true });
	};
</script>

<menu>
	<li>
		<Select
			name="watchlist"
			label="Watchlist to display"
			disabled={!data.watchlists.length}
			onChange={handleChangeWatchlist}
			--width="30rem"
		>
			{#each data.watchlists as watchlist (watchlist.name)}
				<option value={watchlist.name} selected={watchlist.name === page.params.slug}
					>{watchlist.name}</option
				>
			{/each}
		</Select>
	</li>
	<li>
		<Button type="button" look="primary" onclick={() => onOpenModal('new-watchlist')}
			>New Watchlist</Button
		>
	</li>
	{#if data.watchlists.length}
		<li class="delete">
			<Button
				type="button"
				look="link"
				onclick={() => onOpenModal('delete-watchlist')}
				ariaLabel="Delete watchlist"><IconTrash /></Button
			>
		</li>
	{/if}
</menu>

<style>
	menu {
		display: flex;
		align-items: flex-end;
		flex-wrap: wrap;
		gap: 2.4rem;
		padding: 2rem 3.8rem;

		list-style: none;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}

	menu .delete {
		margin-left: auto;
	}
</style>
