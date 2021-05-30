import { NextApiRequest, NextApiResponse } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import GetRepoNames, {
	GetRepoNamesQueryBatched
} from '@/lib/get-repo-names';
import { slashExtractFragment } from '@/lib/string-manipulators';

export default async function (
	req: NextApiRequest,
	res: NextApiResponse<
		ApolloQueryResult<GetRepoNamesQueryBatched>
	>
) {
	const {
		query: { q }
	} = req;

	try {
		const qSlashExtract = slashExtractFragment(q as string);
		console.log(q);
		const data = q
			? await GetRepoNames({ login: q as string })
			: await GetRepoNames({ login: 'DopamineDriven' });
		res.status(200)
			? console.log('result success', `${data}`)
			: console.log('serverless error', `${data}`);
		res.setHeader(
			'Cache-Control',
			'public, s-maxage=1200, stale-while-revalidate=600'
		);
		return res.status(200).json(data);
	} catch (error) {
		throw new Error('error in api/search-repos-by-login.ts');
	}
}
