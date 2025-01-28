<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	interface InputProps {
		name: string;
		label: string;
		type: string;
		required: boolean;
		autoComplete?: 'off';
		onInput?: ChangeEventHandler<HTMLInputElement>;
		value?: string | number;
		tabIndex?: number;
	}
	let {
		name,
		label,
		type,
		required,
		autoComplete,
		onInput,
		value = $bindable('')
	}: InputProps = $props();
</script>

<label class="text--xs">
	{label}
	<input
		class="text--sm"
		{name}
		{type}
		{required}
		{value}
		autocomplete={autoComplete}
		oninput={onInput}
	/>
</label>

<style>
	label {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;

		color: var(--dark-blue--400);
		letter-spacing: 0.8px;
	}

	input {
		padding: 1.2rem 1.8rem;

		font-family: inherit;
		letter-spacing: 0.8px;
		color: var(--dark-blue--700);

		border: 1px solid var(--dark-blue--300);
		border-radius: var(--border-radius--me);
	}
</style>
