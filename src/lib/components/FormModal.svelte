<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { EventHandler, MouseEventHandler } from 'svelte/elements';

	import Form from './Form.svelte';
	import Button from './Button.svelte';

	interface FormModalProps {
		title: string;
		dangerous?: boolean;
		onClose: MouseEventHandler<HTMLButtonElement>;
		onSubmit: EventHandler<SubmitEvent, HTMLFormElement>;
		action: string;
		children: Snippet;
	}

	let { title, dangerous, onClose, onSubmit, action, children }: FormModalProps = $props();

	let modal: HTMLDivElement | undefined = $state(undefined);

	// Not ideal; effect is registered for each modal used
	$effect(() => {
		if (!modal) return;
		modal.querySelector('input')?.focus();
	});
</script>

<div class="overlay">
	<div class="modal" bind:this={modal}>
		<h3>{title}</h3>
		<Form method="POST" {action} {onSubmit}>
			{@render children()}
			<div class="button-container">
				<Button type="button" look="secondary" onclick={onClose}>Close</Button>
				<Button type="submit" look={dangerous ? 'dangerous' : 'primary'}>Confirm</Button>
			</div>
		</Form>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal {
		display: flex;
		flex-direction: column;
		gap: 3.2rem;
		padding: 2.4rem 4.8rem;
		width: 56rem;

		border-radius: var(--border-radius--me);
		background-color: #fff;
	}

	.button-container {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
		margin-top: 3.2rem;
	}
</style>
