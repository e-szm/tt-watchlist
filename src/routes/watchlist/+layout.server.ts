import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

import { getAllWatchlists } from '$lib/server/watchlist';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const existingToken = cookies.get('session-token');
	if (!existingToken) redirect(302, '/login');

	console.log('Watchlist layout server load');
	try {
		const data = await getAllWatchlists(existingToken);
		return { watchlists: data.items };
	} catch {
		cookies.set('session-token', 'invalid', { path: '/', expires: new Date(Date.now()) });
		redirect(302, '/login');
	}
};
