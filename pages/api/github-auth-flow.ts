import { cookieObj } from '@/lib/session';
import cookieSession from 'js-cookie';
import { cookieShape } from '../../types/session';
import {
	NextApiRequest,
	NextApiResponse,
	NextApiHandler
} from 'next';

const secret = process.env.GITHUB_CLIENT_SECRET_DEV ?? '';
const clientId = process.env.GITHUB_CLIENT_ID_DEV ?? '';
const token = process.env.GITHUB_OAUTH_TOKEN ?? '';
const authorization = `Bearer ${token}`;

type dataFromFetch = {
	access_token: string | undefined;
};

type dataReturnedFromSecondFetch = {
	userInfo?: {
		email: string | '';
		login: string | '';
	};
	error?: string;
};

export default async function handler<
	P extends dataFromFetch
>(
	req: NextApiRequest,
	res: NextApiResponse<dataReturnedFromSecondFetch>,
	data: P
) {
	const {
		query: { code }
	} = req;

	if (!code) {
		return res.redirect(
			`https://github.com/login/oauth/authorize?client_id=${clientId}&allow_signup=false`
		);
	}

	try {
		data = await (
			await fetch(
				`https://github.com/login/oauth/access_token`,
				{
					method: 'POST',
					body: JSON.stringify({
						client_id: clientId as string,
						client_secret: secret as string,
						code
					}),
					headers: {
						Accept: 'application/json',
						'Content-Type': 'applicaton/json'
					}
				}
			)
		).json();

		const { access_token } = data;
		if (access_token) {
			const userInfo = await (
				await fetch('https://api.github.com/user', {
					method: 'GET',
					credentials: 'include',
					headers: {
						Authorization: `token ${access_token}`,
						Accept: 'application/json'
					}
				})
			).json();

			req.cookies.cookieShape = userInfo.email as string;
			req.cookies.cookieShape = userInfo.login as string;
		} else {
			req.cookies.login = '';
			req.cookies.email = '';
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Failed to auth.' });
	}
	return res.redirect('/');
}
