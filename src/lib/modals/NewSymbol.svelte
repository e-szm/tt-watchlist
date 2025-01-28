<script lang="ts">
	import { deserialize } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';

	import type { ActionResult } from '@sveltejs/kit';

	import ModalForm from '$lib/components/ModalForm.svelte';
	import Search from '$lib/components/Search.svelte';

	interface NewSymbolProps {
		openModal: string;
		onClose: () => void;
	}

	let { openModal, onClose }: NewSymbolProps = $props();

	async function handleNewSymbol(
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
	onSubmit={handleNewSymbol}
	action="?/newSymbol"
>
	<Search type="text" name="symbol" label="Search for a symbol" required={true} />
</ModalForm>
