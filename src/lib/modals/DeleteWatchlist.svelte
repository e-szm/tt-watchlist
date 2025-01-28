<script lang="ts">
	import { deserialize } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';

	import type { ActionResult } from '@sveltejs/kit';

	import ModalForm from '$lib/components/ModalForm.svelte';

	interface DeleteWatchlistProps {
		openModal: string;
		onClose: () => void;
	}

	let { openModal, onClose }: DeleteWatchlistProps = $props();

	async function handleDeleteWatchlist(
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
		if (result.type === 'redirect') goto(result.location);

		onClose();
	}
</script>

<ModalForm
	isOpen={openModal === 'delete-watchlist'}
	title="Delete Watchlist"
	dangerous={true}
	{onClose}
	onSubmit={handleDeleteWatchlist}
	action="?/deleteWatchlist"
>
	<p>Are you sure you want to delete "<strong>{page.params.slug}</strong>"?</p>
</ModalForm>
