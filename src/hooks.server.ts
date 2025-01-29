import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;
	const token = event.cookies.get('session-token');

	if (!token && path !== '/login') redirect(302, '/login');
	if (token && (path === '/' || path === '/login')) redirect(303, '/watchlist');

	if (token) event.locals.user = { token };

	return resolve(event);
};
