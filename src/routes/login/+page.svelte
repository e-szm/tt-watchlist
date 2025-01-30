<script lang="ts">
	import type { PageProps } from './$types';
	import Login from '$lib/pages/login/Login.svelte';

	let { form }: PageProps = $props();
</script>

<main class="container">
	<Login {form} />
</main>
