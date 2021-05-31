import { NextApiRequest, NextApiResponse } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import getReposWithDetailsQuery, {
	GetReposWithDetailsQueryBatched
} from '@/lib/ServerlessSnacks/get-user-repos-search-result';

export default async function (
	req: NextApiRequest,
	res: NextApiResponse<
		ApolloQueryResult<GetReposWithDetailsQueryBatched>
	>
) {
	const {
		query: { login }
	} = req;

	try {
		console.log(login);
		const data = login
			? await getReposWithDetailsQuery({
					login: login as string
			  })
			: await getReposWithDetailsQuery({ login: 'leerob' });
		res.status(200)
			? console.log('result success', `${data}`)
			: console.log('serverless error', `${data}`);
		res.setHeader(
			'Cache-Control',
			'public, s-maxage=1200, stale-while-revalidate=600'
		);
		return res.status(200).send(data);
	} catch (error) {
		throw new Error('error in api/search-user-server.ts');
	}
}
