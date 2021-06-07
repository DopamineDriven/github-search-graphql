import { NextApiRequest, NextApiResponse } from 'next';
import { addCommentMutationRoute } from '@/lib/ServerlessSnacks';
import { FetchResult } from '@apollo/client';
import { AddCommentMutationBatched } from '../../lib/ServerlessSnacks/add-comment-partitioned';
import {
	initializeApollo,
	addApolloState
} from '@/lib/apollo';

export default async function <
	P extends AddCommentMutationBatched
>(
	req: NextApiRequest,
	res: NextApiResponse<
		FetchResult<
			AddCommentMutationBatched,
			Record<string, any>,
			Record<string, any>
		>
	>
) {
	const {
		query: { body, issueId }
	} = req;
	try {
		console.log('body: ', body);
		console.log('issueId: ', issueId);
		const data = await addCommentMutationRoute<P>({
			issueId: issueId as string,
			body: body as string
		});
		res.status(200)
			? console.log('result success', `${data}`)
			: console.log('serverless error', `${data}`);
		res.setHeader(
			'Cache-Control',
			'public, s-maxage=1200, stale-while-revalidate=600'
		);
		return res.send(data);
	} catch (error) {
		throw new Error('error in api/add-comment-route.ts');
	}
}
