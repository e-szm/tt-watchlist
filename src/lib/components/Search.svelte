<script lang="ts">
	import type {
		ChangeEventHandler,
		KeyboardEventHandler,
		MouseEventHandler
	} from 'svelte/elements';
	import Input from './Input.svelte';
	import SearchResult from './SearchResult.svelte';

	interface SearchProps {
		name: string;
		label: string;
		type: string;
		required: boolean;
		value?: string;
	}

	interface SymbolSearchResult {
		symbol: string;
		description: string;
	}

	interface SymbolSearchResponse {
		data: {
			items: SymbolSearchResult[];
		};
	}

	let { name, label, type, required }: SearchProps = $props();
	let isSearching = $state(false);
	let searchResults = $state.raw([] as SymbolSearchResult[]);
	let selectedSymbol = $state('');

	const handleSearch: ChangeEventHandler<HTMLInputElement> = async (e) => {
		const searchStr = e.currentTarget.value;
		if (searchStr === '') {
			isSearching = false;
			return;
		}

		const res = await fetch(`https://vast.tastyworks.com/symbols/search/${searchStr}`);
		const data: SymbolSearchResponse = await res.json();

		searchResults = [...data.data.items];
		if (!isSearching) isSearching = true;
	};

	function updateSearch(div: HTMLDivElement) {
		const selectedValue = div.querySelector('.primary-text')?.textContent || '';
		selectedSymbol = selectedValue;

		isSearching = false;
		searchResults = [];
	}

	const handleClickResult: MouseEventHandler<HTMLDivElement> = (e) => {
		updateSearch(e.currentTarget);
	};

	const handleKeyboardResult: KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (e.key !== 'Enter') return;
		updateSearch(e.currentTarget);
	};
</script>

<div class="search">
	<Input
		{name}
		{label}
		{type}
		{required}
		autoComplete="off"
		onInput={handleSearch}
		bind:value={selectedSymbol}
	/>
	{#if isSearching}
		<div class="search-results">
			{#if searchResults.length}
				{#each searchResults as result}
					<SearchResult
						primary={result.symbol}
						secondary={result.description}
						onClick={handleClickResult}
						onKeyboard={handleKeyboardResult}
					/>
				{/each}
			{:else}
				<p>No results. Please try a new search.</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.search {
		position: relative;
	}

	.search-results {
		position: absolute;
		top: 100%;

		width: 100%;
		height: 20rem;

		background-color: #fff;
		border: 1px solid var(--dark-blue--300);
		border-radius: var(--border-radius--me);

		overflow: auto;
	}

	.search-results p {
		margin-top: 1.2rem;
		text-align: center;
	}
</style>
