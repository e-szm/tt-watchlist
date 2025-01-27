import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import { postWatchlist } from '$lib/server/watchlist';

export const actions = {
	watchlist: async ({ cookies, request }) => {
		const existingToken = cookies.get('session-token');
		if (!existingToken) redirect(302, '/login');

		const formData = await request.formData();
		const name = formData.get('watchlist');

		if (!name) return fail(400, { error: 'Invalid information', name: '' });
		if (typeof name !== 'string') return fail(400, { error: 'Invalid information', name: '' });

		try {
			await postWatchlist(existingToken, { name, 'watchlist-entries': [] });
		} catch (error: unknown) {
			if (error instanceof Error) return fail(400, { error: error.message, name });
			return fail(400, { error: 'Something went wrong', name });
		}

		return { success: true };
	}
} satisfies Actions;
