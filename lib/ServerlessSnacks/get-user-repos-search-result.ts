import { ApolloQueryResult } from '@apollo/client';
import { initializeApollo } from '../apollo';
import {
	Exact,
	Scalars,
	GetReposWithDetailsQuery,
	GetReposWithDetailsQueryVariables,
	GetReposWithDetailsDocument
} from '@/graphql/graphql';

export interface GetReposWithDetailsQueryBatched
	extends GetReposWithDetailsQuery,
		GetReposWithDetailsQueryVariables {}

export default async function getReposWithDetailsQuery<
	P extends GetReposWithDetailsQueryBatched
>({
	login
}: Exact<{
	login: Scalars['String'];
}>): Promise<ApolloQueryResult<P>> {
	const apolloClient = initializeApollo();
	return await apolloClient.query<P>({
		query: GetReposWithDetailsDocument,
		variables: {
			login
		}
	});
}
