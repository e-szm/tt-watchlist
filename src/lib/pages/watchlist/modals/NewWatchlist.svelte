<script lang="ts">
	import { deserialize } from '$app/forms';
	import { goto } from '$app/navigation';

	import Input from '$lib/components/Input.svelte';
	import ModalForm from '$lib/components/FormModal.svelte';

	interface NewWatchlistProps {
		onClose: () => void;
	}

	let { onClose }: NewWatchlistProps = $props();

	async function handleNewWatchlist(
		e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		try {
			const res = await fetch(e.currentTarget.action, {
				method: 'POST',
				body: data
			});
			const result = deserialize(await res.text());
			if (result.type === 'redirect') {
				onClose();
				goto(result.location, { invalidateAll: true });
			}
		} catch (err) {
			console.error(err);
		}
	}
</script>

<ModalForm title="New Watchlist" {onClose} onSubmit={handleNewWatchlist} action="?/create">
	<Input type="text" name="watchlist" label="Give your watchlist a name" required={true} />
</ModalForm>
