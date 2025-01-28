<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Snippet } from 'svelte';
	import type { EventHandler } from 'svelte/elements';

	interface FormProps {
		method: 'GET' | 'POST';
		action?: string;
		onSubmit?: EventHandler<SubmitEvent, HTMLFormElement>;
		children: Snippet;
	}
	let { method = 'GET', action, onSubmit, children }: FormProps = $props();
</script>

{#if onSubmit}
	<form {method} {action} onsubmit={onSubmit}>
		{@render children()}
	</form>
{:else}
	<form {method} {action} use:enhance>
		{@render children()}
	</form>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
