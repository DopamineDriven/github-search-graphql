import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'github_search_graphql';

export const useAcceptCookies = () => {
	const [acceptedCookies, setAcceptedCookies] =
		useState(true);

	useEffect(() => {
		if (!Cookies.get(COOKIE_NAME)) {
			setAcceptedCookies(false);
		}
	}, []);

	const acceptCookies = () => {
		setAcceptedCookies(true);
		Cookies.set(COOKIE_NAME, 'accepted', {
			expires: 365,
			sameSite: 'strict',
			secure:
				process.env.NODE_ENV === 'production' ? true : false
		});
	};

	return {
		acceptedCookies,
		onAcceptCookies: acceptCookies
	};
};
