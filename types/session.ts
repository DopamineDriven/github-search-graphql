import cookieSession from 'js-cookie';

export type cookieShape =
	| string
	| cookieSession.CookieAttributes
	| {
			sameSite: string;
			secure: boolean;
			keys: string[];
			expires: number;
			login: string | '';
			email: string | '';
	  };
