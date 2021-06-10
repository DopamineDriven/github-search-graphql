import cookieSession, { CookieAttributes } from 'js-cookie';

const keyNotNull = process.env.SESSION_KEY
	? process.env.SESSION_KEY
	: '';
const isProd =
	process.env.NODE_ENV === 'production' ? true : false;

const session: CookieAttributes = {
	name: 'session-github-search-graphql',
	keys: [keyNotNull],
	maxAge: 24 * 60 * 60 * 1000,
	secure: isProd,
	sameSite: 'strict',
	login: '',
	email: ''
};

export const cookieObj:
	| string
	| cookieSession.CookieAttributes
	| {
			sameSite: string;
			secure: boolean;
			keys: string[];
			expires: number;
			login: string | '';
			email: string | '';
	  } = [
	'session-github-search-graphql',
	session,
	{
		sameSite: 'strict',
		secure: isProd,
		keys: [keyNotNull],
		expires: 24 * 60 * 60 * 1000,
		login: '',
		email: ''
	}
];

/**
	export const cookieObj = async <
	P extends string | undefined
>() =>
	(await cookieSession.set(
		'session-github-search-graphql',
		session,
		{
			sameSite: 'strict',
			secure: isProd,
			keys: [keyNotNull],
			expires: 24 * 60 * 60 * 1000
		}
	)) as P;
*/
