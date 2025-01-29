import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { create, newSymbol, remove } from '$lib/actions/watchlist';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	if (data.watchlists.length) {
		redirect(302, `/watchlist/${data.watchlists[0].name}`);
	}
};

export const actions = {
	create,
	remove,
	newSymbol
} satisfies Actions;
