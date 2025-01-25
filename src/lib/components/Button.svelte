<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		type: 'primary' | 'secondary';
		children: Snippet;
	}
	let { type, children }: ButtonProps = $props();
</script>

<button class={[type, 'text--sm']}>
	{@render children()}
</button>

<style>
	button {
		align-self: var(--align-self);

		padding: 1.2rem 1.8rem;
		margin: var(--margin);

		font-family: inherit;
		letter-spacing: 0.8px;
		font-weight: 500;

		border-radius: var(--border-radius--me);

		transition: background-color 200ms;
		cursor: pointer;
	}

	.primary {
		color: #fff;
		background-color: var(--light-blue--500);
		border: 2px solid transparent;
	}

	.primary:hover {
		background-color: var(--light-blue--700);
	}

	.secondary {
		color: var(--light-blue--500);
		background-color: #fff;
		border: 2px solid var(--light-blue--500);
	}

	.secondary:hover {
		background-color: var(--grey--100);
	}
</style>
