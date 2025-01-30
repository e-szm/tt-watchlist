<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	interface TableFooterProps {
		onOpenModal: (name: string) => void;
	}

	let { onOpenModal }: TableFooterProps = $props();
</script>

<div class="table-footer">
	<Button type="button" look="link" onclick={() => onOpenModal('new-symbol')}>+ Add Symbol</Button>
</div>

<style>
	.table-footer {
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}
</style>
