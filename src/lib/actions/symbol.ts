import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { getOneWatchlist, putWatchlist } from '$lib/server/watchlist';

export const symbol = async ({ cookies, request, params }: RequestEvent) => {
	const existingToken = cookies.get('session-token');
	console.log(existingToken);
	if (!existingToken) {
		console.log('should redirect');
		return redirect(302, '/login');
	}

	const formData = await request.formData();
	const symbol = formData.get('symbol');
	const watchlist = params.slug;

	if (!symbol || !watchlist) return fail(400, { error: 'Invalid information', symbol: '' });
	if (typeof symbol !== 'string') return fail(400, { error: 'Invalid information', symbol: '' });

	const existingWatchlist = await getOneWatchlist(existingToken, watchlist);

	const updatedEntries = [];
	existingWatchlist['watchlist-entries']?.forEach((entry) => updatedEntries.push(entry));
	updatedEntries.push({ symbol });

	try {
		await putWatchlist(existingToken, watchlist, {
			name: watchlist,
			'watchlist-entries': updatedEntries
		});
	} catch (error: unknown) {
		if (error instanceof Error) return fail(400, { error: error.message, symbol });
		return fail(400, { error: 'Something went wrong', name });
	}

	return { success: true };
};
