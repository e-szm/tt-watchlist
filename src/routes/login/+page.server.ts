import { fail, redirect } from '@sveltejs/kit';
import { postSession } from '$lib/server/sessionAPI';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const rawLogin = formData.get('username');
		const password = formData.get('password');

		if (!rawLogin || !password) return fail(400, { error: 'Invalid information', email: '' });
		if (typeof rawLogin !== 'string' || typeof password !== 'string')
			return fail(400, { error: 'Invalid information', email: '' });
		const login = rawLogin.toLowerCase();

		try {
			const data = await postSession({ login, password });
			const token = data['session-token'];
			const expiration = data['session-expiration'];

			cookies.set('session-token', token, { path: '/', expires: new Date(expiration) });
		} catch (error: unknown) {
			if (error instanceof Error) return fail(400, { error: error.message, email: login });
			return fail(400, { error: 'Something went wrong', email: login });
		}

		redirect(303, '/watchlist');
	}
} satisfies Actions;
