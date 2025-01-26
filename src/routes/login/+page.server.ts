import { fail, redirect, type ActionFailure } from '@sveltejs/kit';
import type { Actions } from './$types';
import { postSession } from '$lib/api/session';

type DefaultAction = Promise<
	| ActionFailure<{
			error: string;
			email: string;
	  }>
	| { message: string }
>;

export const actions = {
	default: async ({ cookies, request }): DefaultAction => {
		const formData = await request.formData();
		const login = formData.get('username');
		const password = formData.get('password');

		if (!login || !password) return fail(400, { error: 'Invalid information', email: '' });
		if (typeof login !== 'string' || typeof password !== 'string')
			return fail(400, { error: 'Invalid information', email: '' });

		try {
			const data = await postSession({ login, password });
			const token = data['session-token'];
			const expiration = data['session-expiration'];

			cookies.set('session-token', token, { path: '/', expires: new Date(expiration) });
		} catch (error: unknown) {
			if (error instanceof Error) return fail(400, { error: error.message, email: login });
			return fail(400, { error: 'Something went wrong', email: login });
		}

		redirect(303, '/');
	}
} satisfies Actions;
