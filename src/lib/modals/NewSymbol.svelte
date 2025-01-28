<script lang="ts">
	import { deserialize } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';

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
		if (result.type === 'redirect') goto(result.location);

		onClose();
	}
</script>

<ModalForm
	isOpen={openModal === 'new-symbol'}
	title="New Symbol"
	{onClose}
	onSubmit={handleNewWatchlist}
	action="?/symbol"
>
	<Input type="text" name="symbol" label="Search for a symbol" required={true} />
</ModalForm>
