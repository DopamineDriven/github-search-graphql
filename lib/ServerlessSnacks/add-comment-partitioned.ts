import {
	Exact,
	Scalars,
	AddCommentDocument,
	AddCommentMutation,
	AddCommentMutationVariables
} from '@/graphql/graphql';
import { FetchResult } from '@apollo/client';
import { initializeApollo } from '../apollo';

export interface AddCommentMutationBatched
	extends AddCommentMutation,
		AddCommentMutationVariables {}

export default async function addCommentMutationRoute<
	P extends AddCommentMutationBatched
>({
	issueId,
	body
}: Exact<{
	issueId: Scalars['ID'];
	body: Scalars['String'];
}>): Promise<
	FetchResult<P, Record<string, any>, Record<string, any>>
> {
	const apolloClient = initializeApollo();
	return await apolloClient.mutate<P>({
		mutation: AddCommentDocument,
		variables: {
			issueId,
			body
		}
	});
}
