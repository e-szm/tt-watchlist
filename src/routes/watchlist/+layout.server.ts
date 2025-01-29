import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getAllWatchlists } from '$lib/server/watchlistAPI';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	try {
		const data = await getAllWatchlists(locals.user.token);
		return { watchlists: data.items };
	} catch {
		// Assumption: all failures are related to authorization; ideally would have robust error handling
		cookies.set('session-token', 'invalid', { path: '/', expires: new Date(Date.now()) });
		redirect(302, '/login');
	}
};
