import {
	getOneWatchlist,
	postWatchlist,
	putWatchlist,
	deleteOneWatchlist
} from '$lib/server/watchlistAPI';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';

export const newWatchlist = async ({ cookies, request }: RequestEvent) => {
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
};

export const deleteWatchlist = async ({ cookies, params }: RequestEvent) => {
	const existingToken = cookies.get('session-token');
	if (!existingToken) redirect(302, '/login');

	const watchlist = params.slug;

	if (!watchlist) return fail(400, { error: 'Invalid information', name: '' });
	if (typeof watchlist !== 'string') return fail(400, { error: 'Invalid information', name: '' });

	try {
		await deleteOneWatchlist(existingToken, watchlist);
	} catch (error: unknown) {
		if (error instanceof Error) return fail(400, { error: error.message, name });
		return fail(400, { error: 'Something went wrong', name });
	}

	return { success: true };
};

export const newSymbol = async ({ cookies, request, params }: RequestEvent) => {
	const existingToken = cookies.get('session-token');
	if (!existingToken) return redirect(302, '/login');

	const formData = await request.formData();
	const symbol = formData.get('symbol');
	const watchlist = params.slug;

	if (!symbol || !watchlist) return fail(400, { error: 'Invalid information', symbol: '' });
	if (typeof symbol !== 'string') return fail(400, { error: 'Invalid information', symbol: '' });

	try {
		const existingWatchlist = await getOneWatchlist(existingToken, watchlist);

		const updatedEntries = [];
		existingWatchlist['watchlist-entries']?.forEach((entry) => updatedEntries.push(entry));
		updatedEntries.push({ symbol });

		await putWatchlist(existingToken, watchlist, {
			name: watchlist,
			'watchlist-entries': updatedEntries
		});
	} catch (error: unknown) {
		if (error instanceof Error) return fail(400, { error: error.message, symbol });
		return fail(400, { error: 'Something went wrong', symbol });
	}

	return { success: true };
};

export const deleteSymbol = async ({ cookies, request, params }: RequestEvent) => {
	const existingToken = cookies.get('session-token');
	if (!existingToken) return redirect(302, '/login');

	const formData = await request.formData();
	const symbolToDelete = formData.get('symbol');
	const watchlist = params.slug;

	if (!symbolToDelete || !watchlist) return fail(400, { error: 'Invalid information' });
	if (typeof symbolToDelete !== 'string') return fail(400, { error: 'Invalid information' });

	const existingWatchlist = await getOneWatchlist(existingToken, watchlist);
	const updatedEntries =
		existingWatchlist['watchlist-entries']?.filter((entry) => entry.symbol !== symbolToDelete) ||
		[];

	try {
		await putWatchlist(existingToken, watchlist, {
			name: watchlist,
			'watchlist-entries': updatedEntries
		});
	} catch (error: unknown) {
		if (error instanceof Error) return fail(400, { error: error.message });
		return fail(400, { error: 'Something went wrong' });
	}

	return { success: true };
};
