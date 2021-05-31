import { ApolloQueryResult } from '@apollo/client';
import { initializeApollo } from '../apollo';
import {
	Exact,
	Scalars,
	GetRepoByNameDocument,
	GetRepoByNameQuery,
	GetRepoByNameQueryVariables
} from '@/graphql/graphql';

export interface GetRepoByNameQueryBatched
	extends GetRepoByNameQuery,
		GetRepoByNameQueryVariables {}

export default async function getReposByNameQuery<
	P extends GetRepoByNameQueryBatched
>({
	login,
	name
}: Exact<{
	login: Scalars['String'];
	name: Scalars['String'];
}>): Promise<ApolloQueryResult<P>> {
	const apolloClient = initializeApollo();
	return await apolloClient.query<P>({
		query: GetRepoByNameDocument,
		variables: {
			login,
			name
		}
	});
}
