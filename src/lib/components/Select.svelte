<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ChangeEventHandler } from 'svelte/elements';

	interface SelectProps {
		name: string;
		label: string;
		onChange?: ChangeEventHandler<HTMLSelectElement>;
		disabled?: boolean;
		children: Snippet;
	}
	let { name, label, onChange, disabled = false, children }: SelectProps = $props();
</script>

<label class="text--xs">
	{label}
	<select class="text--sm" onchange={onChange} {name} {disabled}>
		{@render children()}
	</select>
</label>

<style>
	label {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;

		color: var(--dark-blue--400);
		letter-spacing: 0.8px;
	}

	select {
		width: var(--width);
		padding: 1.2rem 1.8rem;

		font-family: inherit;
		letter-spacing: 0.8px;
		color: var(--dark-blue--700);

		border: 1px solid var(--dark-blue--300);
		border-radius: var(--border-radius--me);

		cursor: pointer;
	}

	select:disabled {
		cursor: not-allowed;
		background-color: var(--grey--700);
	}
</style>
