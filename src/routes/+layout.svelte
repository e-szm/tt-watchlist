<script lang="ts">
	import type { LayoutProps } from './$types';
	import '../styles.css';

	let { children }: LayoutProps = $props();
</script>

{@render children()}
