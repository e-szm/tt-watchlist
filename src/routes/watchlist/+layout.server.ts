import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

import { getWatchlist } from '$lib/server/watchlist';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const existingToken = cookies.get('session-token');
	if (!existingToken) redirect(302, '/login');

	try {
		const data = await getWatchlist(existingToken);
		return data;
	} catch {
		cookies.set('session-token', 'invalid', { path: '/', expires: new Date(Date.now()) });
		redirect(302, '/login');
	}
};
