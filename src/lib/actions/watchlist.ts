import {
	getOneWatchlist,
	postWatchlist,
	putWatchlist,
	deleteOneWatchlist
} from '$lib/server/watchlistAPI';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';

export const create = async ({ locals, request }: RequestEvent) => {
	const formData = await request.formData();
	const rawName = formData.get('watchlist');

	if (!rawName) return fail(400, { error: 'Invalid information', name: '' });
	if (typeof rawName !== 'string') return fail(400, { error: 'Invalid information', name: '' });
	const name = rawName.trim();

	let watchlist;
	try {
		watchlist = await postWatchlist(locals.user.token, { name, 'watchlist-entries': [] });
	} catch (error: unknown) {
		if (error instanceof Error) return fail(400, { error: error.message, name });
		return fail(400, { error: 'Something went wrong', name });
	}

	redirect(303, `/watchlist/${encodeURIComponent(watchlist.name)}`);
};

export const remove = async ({ locals, params }: RequestEvent) => {
	const name = params.slug;

	if (!name) return fail(400, { error: 'Invalid information', name: '' });
	if (typeof name !== 'string') return fail(400, { error: 'Invalid information', name: '' });

	try {
		await deleteOneWatchlist(locals.user.token, name);
	} catch (error: unknown) {
		if (error instanceof Error) return fail(400, { error: error.message, name });
		return fail(400, { error: 'Something went wrong', name });
	}

	return { success: true };
};

export const newSymbol = async ({ locals, request, params }: RequestEvent) => {
	const formData = await request.formData();
	const rawSymbol = formData.get('symbol');
	const watchlistName = params.slug;

	if (!rawSymbol || !watchlistName) return fail(400, { error: 'Invalid information', symbol: '' });
	if (typeof rawSymbol !== 'string') return fail(400, { error: 'Invalid information', symbol: '' });
	const symbol = rawSymbol.trim();

	try {
		const watchlist = await getOneWatchlist(locals.user.token, watchlistName);
		if (watchlist['watchlist-entries']?.some((entry) => entry.symbol === symbol)) {
			throw new Error('Duplicate symbol');
		}

		const updatedEntries = [];
		watchlist['watchlist-entries']?.forEach((entry) => updatedEntries.push(entry));
		updatedEntries.push({ symbol });

		await putWatchlist(locals.user.token, watchlistName, {
			name: watchlistName,
			'watchlist-entries': updatedEntries
		});
	} catch (error: unknown) {
		if (error instanceof Error) return fail(400, { error: error.message, symbol });
		return fail(400, { error: 'Something went wrong', symbol });
	}

	return { success: true };
};

export const deleteSymbol = async ({ locals, request, params }: RequestEvent) => {
	const formData = await request.formData();
	const symbolToDelete = formData.get('symbol');
	const watchlistName = params.slug;

	if (!symbolToDelete || !watchlistName) return fail(400, { error: 'Invalid information' });
	if (typeof symbolToDelete !== 'string') return fail(400, { error: 'Invalid information' });

	try {
		const watchlist = await getOneWatchlist(locals.user.token, watchlistName);

		const updatedEntries =
			watchlist['watchlist-entries']?.filter((entry) => entry.symbol !== symbolToDelete) || [];

		await putWatchlist(locals.user.token, watchlistName, {
			name: watchlistName,
			'watchlist-entries': updatedEntries
		});
	} catch (error: unknown) {
		if (error instanceof Error) return fail(400, { error: error.message });
		return fail(400, { error: 'Something went wrong' });
	}

	return { success: true };
};
