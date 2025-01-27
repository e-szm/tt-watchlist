<script lang="ts">
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import type { ActionResult } from '@sveltejs/kit';

	import Input from '$lib/components/Input.svelte';
	import ModalForm from '$lib/components/ModalForm.svelte';

	interface NewWatchlistProps {
		openModal: string;
		onClose: () => void;
	}

	let { openModal, onClose }: NewWatchlistProps = $props();

	async function handleNewWatchlist(
		e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const res = await fetch(e.currentTarget.action, {
			method: 'POST',
			body: data
		});
		const result: ActionResult = deserialize(await res.text());
		if (result.type === 'success') await invalidateAll();

		onClose();
	}
</script>

<ModalForm
	isOpen={openModal === 'new-watchlist'}
	title="New Watchlist"
	{onClose}
	onSubmit={handleNewWatchlist}
>
	<Input type="text" name="watchlist" label="Give your watchlist a name" required={true} />
</ModalForm>
