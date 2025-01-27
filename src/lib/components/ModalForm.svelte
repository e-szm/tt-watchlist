<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { EventHandler, MouseEventHandler } from 'svelte/elements';

	import Form from './Form.svelte';
	import Button from './Button.svelte';

	interface ModalProps {
		isOpen: boolean;
		title: string;
		onClose: MouseEventHandler<HTMLButtonElement>;
		onSubmit: EventHandler<SubmitEvent, HTMLFormElement>;
		children: Snippet;
	}

	let { title, isOpen, onClose, onSubmit, children }: ModalProps = $props();
</script>

{#if isOpen}
	<div class="overlay">
		<div class="modal">
			<h3>{title}</h3>
			<Form method="POST" action="?/watchlist" {onSubmit}>
				{@render children()}
				<div class="button-container">
					<Button type="button" look="secondary" onclick={onClose}>Close</Button>
					<Button type="submit" look="primary">Confirm</Button>
				</div>
			</Form>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;

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
