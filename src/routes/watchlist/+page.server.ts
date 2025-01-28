import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { newWatchlist, newSymbol, deleteWatchlist } from '$lib/actions/watchlist';

export const load: PageServerLoad = async ({ parent }) => {
	console.log('Parent Page server load');

	const data = await parent();

	if (data.watchlists.length) {
		redirect(302, `/watchlist/${data.watchlists[0].name}`);
	}
};

export const actions = {
	newWatchlist,
	deleteWatchlist,
	newSymbol
} satisfies Actions;
