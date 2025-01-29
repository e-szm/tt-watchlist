import { TT_BASE_URL } from '$env/static/private';

interface WatchlistEntry {
	symbol: string;
	'instrument-type'?: string;
}

interface Watchlist {
	name: string;
	'order-index': number;
	'watchlist-entries'?: WatchlistEntry[];
	'cms-id'?: string;
	'group-name'?: string;
}

interface GetAllWatchlistsResponse {
	items: Watchlist[];
}

interface PostWatchlistRequest {
	name: string;
	'watchlist-entries': WatchlistEntry[];
}

export async function getAllWatchlists(token: string): Promise<GetAllWatchlistsResponse> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);

	const res = await fetch(`${TT_BASE_URL}/watchlists`, {
		headers,
		method: 'GET'
	});
	if (!res.ok || res.status !== 200) throw new Error('Something went wrong');

	return (await res.json()).data;
}

export async function getOneWatchlist(token: string, watchlist: string): Promise<Watchlist> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);

	const res = await fetch(`${TT_BASE_URL}/watchlists/${watchlist}`, {
		headers,
		method: 'GET'
	});
	if (!res.ok || res.status !== 200) throw new Error('Something went wrong');

	return (await res.json()).data;
}

export async function postWatchlist(token: string, body: PostWatchlistRequest): Promise<Watchlist> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);

	const res = await fetch(`${TT_BASE_URL}/watchlists`, {
		headers,
		method: 'POST',
		body: JSON.stringify(body)
	});
	if (!res.ok || res.status !== 201) throw new Error('Something went wrong');

	return (await res.json()).data;
}

export async function putWatchlist(
	token: string,
	watchlist: string,
	body: PostWatchlistRequest
): Promise<Watchlist> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);

	const res = await fetch(`${TT_BASE_URL}/watchlists/${watchlist}`, {
		headers,
		method: 'PUT',
		body: JSON.stringify(body)
	});

	if (!res.ok || res.status !== 200) throw new Error('Something went wrong');

	return (await res.json()).data;
}

export async function deleteOneWatchlist(token: string, watchlist: string): Promise<Watchlist> {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', token);

	const res = await fetch(`${TT_BASE_URL}/watchlists/${watchlist}`, {
		headers,
		method: 'DELETE'
	});
	if (!res.ok || res.status !== 200) throw new Error('Something went wrong');

	return (await res.json()).data;
}
