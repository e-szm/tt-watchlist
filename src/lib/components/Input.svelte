<script lang="ts">
	interface InputProps {
		label: string;
		type: string;
	}
	let { label, type }: InputProps = $props();
</script>

<label class="text--xs">
	{label}
	<input class="text--sm" {type} />
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
