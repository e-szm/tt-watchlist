import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { newWatchlist, newSymbol, deleteWatchlist, deleteSymbol } from '$lib/actions/watchlist';

export const load: PageServerLoad = async ({ parent, params }) => {
	console.log('PAGE layout server load');

	const data = await parent();

	if (
		!data.watchlists.length ||
		data.watchlists.findIndex((watchlist) => watchlist.name === params.slug) === -1
	) {
		redirect(302, '/watchlist');
	}
};

export const actions = {
	newWatchlist,
	deleteWatchlist,
	newSymbol,
	deleteSymbol
} satisfies Actions;
