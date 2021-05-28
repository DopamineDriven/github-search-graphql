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
} from '@/graphql/graphql';
import useSWR from 'swr';
import { useState } from 'react';
import { fetcher } from '@/lib/fetchers';
import { useQuery } from '@apollo/client';
import { useGitHubSearchReposLazyQuery } from '../graphql/graphql';

export default function Index<
	T extends typeof getStaticProps
>({ search }: InferGetStaticPropsType<T>) {
	// const githubOAuthToken =
	// 	process.env.GITHUB_OAUTH_TOKEN ?? '';

	// const refs = search?.edges?.forEach((ref, i) => {
	// 	console.log(ref);
	// 	if (ref && ref.node) {
	// 		const { login, name, id } = {
	// 			name: '',
	// 			login: '',
	// 			id: '',
	// 			...ref
	// 		};
	// 	}
	// });
	// const [lazyData, { called, loading, data }] =
	// 	useGitHubSearchReposLazyQuery({
	// 		query: GitHubSearchReposDocument,
	// 		variables: {
	// 			query: 'swr',
	// 			first: 10
	// 		},

	// 	});

	return (
		<>
			<div className='text-gray-50 font-bold font-sans text-4xl mx-auto justify-center flex my-24  select-none'>
				{' '}
				Configuring Initial Dev Setup, switching to dev branch
			</div>
		</>
	);
}

export async function getStaticProps<P>(
	ctx: GetStaticPropsContext
): Promise<
	P &
		GetStaticPropsResult<{
			search: GitHubSearchReposQuery['Search'];
		}>
> {
	const apolloClient = initializeApollo({});

	await apolloClient.query<
		GitHubSearchReposQuery,
		GitHubSearchReposQueryVariables
	>({
		query: GitHubSearchReposDocument,
		variables: {
			query: 'swr',
			first: 10
		}
	});

	return addApolloState(apolloClient, {
		props: {},
		revalidate: 120
	});
}
