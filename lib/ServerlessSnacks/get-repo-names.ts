import { ApolloQueryResult } from '@apollo/client';
import { initializeApollo } from '../apollo';
import {
	GetRepoNamesDocument,
	GetRepoNamesQuery,
	GetRepoNamesQueryVariables,
	Scalars,
	Exact
} from '@/graphql/graphql';

export interface GetRepoNamesQueryBatched
	extends GetRepoNamesQuery,
		GetRepoNamesQueryVariables {}

export default async function GetRepoNames<
	P extends GetRepoNamesQueryBatched
>({
	login
}: Exact<{ login: Scalars['String'] }>): Promise<
	ApolloQueryResult<P>
> {
	const apolloClient = initializeApollo();
	return await apolloClient.query<P>({
		query: GetRepoNamesDocument,
		variables: {
			login
		}
	});
}
