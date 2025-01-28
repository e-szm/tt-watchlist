import type { Actions } from './$types';
import { watchlist } from '$lib/actions/watchlist';
import { symbol } from '$lib/actions/symbol';

export const actions = {
	watchlist,
	symbol
} satisfies Actions;
