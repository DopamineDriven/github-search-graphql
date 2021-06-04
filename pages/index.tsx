import {
	GetStaticPropsContext,
	GetStaticPropsResult,
	InferGetStaticPropsType
} from 'next';
import {
	initializeApollo,
	addApolloState
} from '@/lib/apollo';
import {
	GetIssuesMinimalDocument,
	ViewerReposQuery,
	ViewerReposQueryVariables,
	ViewerReposDocument,
	GetIssuesMinimalQueryVariables,
	GetIssuesMinimalQuery,
	GetReposWithDetailsQuery,
	GetReposWithDetailsQueryVariables,
	GetReposWithDetailsDocument
} from '@/graphql/graphql';
import ReposCoalesced from '@/components/Repo/repo';
import RepoWrapper from '@/components/Repo/wrapper';
import { AppLayout } from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Searchbar from '@/components/Layout/Search/search';
import { Container } from '@/components/UI';
import { SearchUser } from '@/components/Layout/SearchUser';
import {
	LandingCoalescedUserProps,
	LandingCoalesced
} from '@/components/Landing';

export default function Index<
	T extends typeof getStaticProps
>({ repo, user }: InferGetStaticPropsType<T>) {
	const [search, setSearch] = useState('');
	const { asPath: login, asPath: q } = useRouter();
	const router = useRouter();
	console.log(router.query ?? 'no router.query');

	useEffect(() => {
		const pathSubString = q.split('/');
		console.log(pathSubString);
		if (!q.includes('/repositories/[owner]/[name]')) {
			setSearch('');
			return;
		}
		if (
			q.includes('/repositories/[owner]/[name]') &&
			q.length === 3
		) {
			setSearch(pathSubString[3]);
			return;
		}
		console.log(search);
	}, [q]);

	useEffect(() => {
		const pathSubString = login.split('/');
		if (!login.includes('/repos/[login]')) {
			setSearch('');
			return;
		}
		if (
			login.includes('/repos/[login]') &&
			login.length === 2
		) {
			setSearch(pathSubString[2]);
			return;
		}
		console.log(search);
	}, [login]);

	const searchBarStyled = (
		<Container className='px-1/12 sm:px-1/6 lg:px-1/4 my-10'>
			{'Feeling lucky: '}
			<Searchbar />
		</Container>
	);
	const searchUserStyled = (
		<Container className='px-1/12 sm:px-1/6 lg:px-1/4 my-10'>
			{'Search by user: '}
			<SearchUser />
		</Container>
	);
	return (
		<>
			<AppLayout>
				<div className='bg-purple-0 text-gray-50 font-bold font-sans text-4xl select-none'>
					<LandingCoalesced user={user.user} />
				</div>
			</AppLayout>
		</>
	);
}

export async function getStaticProps<P>(
	ctx: GetStaticPropsContext
): Promise<
	GetStaticPropsResult<
		P & {
			user: GetReposWithDetailsQuery;
			repo: ViewerReposQuery;
		}
	>
> {
	console.log(ctx.params?.login ?? 'no params');
	const apolloClient = initializeApollo();

	const { data: repo } = await apolloClient.query<
		ViewerReposQuery,
		ViewerReposQueryVariables
	>({
		query: ViewerReposDocument
	});

	const { data: user } = await apolloClient.query<
		GetReposWithDetailsQuery,
		GetReposWithDetailsQueryVariables
	>({
		query: GetReposWithDetailsDocument,
		variables: {
			login: ctx.params?.login
				? (ctx.params.login as string)
				: 'DopamineDriven'
		}
	});
	return addApolloState(apolloClient, {
		props: { user, repo },
		revalidate: 120
	});
}
