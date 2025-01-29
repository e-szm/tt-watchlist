import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { create, newSymbol, remove, deleteSymbol } from '$lib/actions/watchlist';

export const load: PageServerLoad = async ({ parent, params }) => {
	const data = await parent();

	if (
		!data.watchlists.length ||
		data.watchlists.findIndex((watchlist) => watchlist.name === params.slug) === -1
	) {
		redirect(302, '/watchlist');
	}
};

export const actions = {
	create,
	remove,
	newSymbol,
	deleteSymbol
} satisfies Actions;
