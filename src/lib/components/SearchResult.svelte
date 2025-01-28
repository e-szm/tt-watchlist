<script lang="ts">
	import type { KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';

	interface SearchResultProps {
		primary: string;
		secondary?: string;
		onClick: MouseEventHandler<HTMLDivElement>;
		onKeyboard: KeyboardEventHandler<HTMLDivElement>;
	}

	let { primary, secondary, onClick, onKeyboard }: SearchResultProps = $props();
</script>

<div role="button" tabindex={0} onclick={onClick} onkeydown={onKeyboard}>
	<p class="primary-text text--me">{primary}</p>
	<p class="secondary-text text--xs">{secondary}</p>
</div>

<style>
	div {
		display: flex;
		justify-content: space-between;
		align-items: center;

		text-align: right;
		padding: 1.2rem 2.4rem;
		border-bottom: 1px solid var(--dark-blue--300);

		cursor: pointer;
		transition: background-color 200ms;
		overflow: hidden;
	}

	div:hover {
		background-color: var(--grey--200);
	}
</style>
