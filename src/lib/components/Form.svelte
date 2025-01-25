<script lang="ts">
	import type { Snippet } from 'svelte';

	interface FormProps {
		method: 'GET' | 'POST';
		children: Snippet;
	}
	let { method = 'GET', children }: FormProps = $props();
</script>

<form {method}>
	{@render children()}
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
