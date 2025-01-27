<script lang="ts">
	import type { Snippet } from 'svelte';

	interface SelectProps {
		name: string;
		label: string;
		children: Snippet;
	}
	let { name, label, children }: SelectProps = $props();
</script>

<label class="text--xs">
	{label}
	<select class="text--sm" {name}>
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
</style>
