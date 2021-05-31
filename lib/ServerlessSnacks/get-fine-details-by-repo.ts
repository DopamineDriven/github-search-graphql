import { ApolloQueryResult } from '@apollo/client';
import { initializeApollo } from '../apollo';
import {
	Exact,
	Scalars,
	GetFineDetailsByRepoQuery,
	GetFineDetailsByRepoQueryVariables,
	GetFineDetailsByRepoDocument
} from '@/graphql/graphql';

export interface GetFineDetailsByRepoQueryBatched
	extends GetFineDetailsByRepoQuery,
		GetFineDetailsByRepoQueryVariables {}

export default async function getFineDetailsByRepoQuery<
	P extends GetFineDetailsByRepoQueryBatched
>({
	login,
	name
}: Exact<{
	login: Scalars['String'];
	name: Scalars['String'];
}>): Promise<ApolloQueryResult<P>> {
	const apolloClient = initializeApollo();
	return await apolloClient.query<P>({
		query: GetFineDetailsByRepoDocument,
		variables: {
			login,
			name
		}
	});
}
