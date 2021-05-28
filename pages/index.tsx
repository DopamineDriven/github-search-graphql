import { Configuration, Fetcher } from 'swr/dist/types';
import {
	GetStaticPropsContext,
	GetStaticPropsResult,
	InferGetStaticPropsType
} from 'next';
import {
	initializeApollo,
	addApolloState
} from '../lib/apollo';
import {
	useGitHubSearchReposQuery,
	GitHubSearchReposDocument,
	GitHubSearchReposQuery,
	GitHubSearchReposQueryVariables
} from '@/graphql/generated/graphql';
import useSWR from 'swr';
import { useState } from 'react';
import { fetcher } from '@/lib/fetchers';
import { useQuery } from '@apollo/client';

export default function Index() {
	const githubOAuthToken =
		process.env.GITHUB_OAUTH_TOKEN ?? '';

	return (
		<>
			<div className='text-gray-50 font-bold font-sans text-4xl mx-auto justify-center flex py-24'>
				Configuring Initial Dev Setup, switching to dev branch,
				abandoning apollo over caching issue using SWR Hooks for
				simplicity and efficiency (and perhaps greater
				performance given githubs rate limiting issue)
			</div>
		</>
	);
}

// export async function getStaticProps<P>(
// 	ctx: GetStaticPropsContext
// ): Promise<
// 	P &
// 		GetStaticPropsResult<{
// 			search: GitHubSearchReposQuery['Search'];
// 		}>
// > {
// 	// const apolloClient = initializeApollo();

// 	// await apolloClient.query<
// 	// 	GitHubSearchReposQuery,
// 	// 	GitHubSearchReposQueryVariables
// 	// >({
// 	// 	query: GitHubSearchReposDocument,
// 	// 	variables: {
// 	// 		query: 'swr',
// 	// 		first: 10
// 	// 	}
// 	// });

// 	return addApolloState(apolloClient, {
// 		props: {},
// 		revalidate: 120
// 	});
// }
