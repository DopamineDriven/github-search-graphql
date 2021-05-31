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
	GetIssuesMinimalQuery
} from '@/graphql/graphql';
import ReposCoalesced from '@/components/Repo/repo';
import RepoWrapper from '@/components/Repo/wrapper';
import { AppLayout } from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Searchbar from '@/components/Layout/Search/search';
import { Container } from '@/components/UI';
import { slashExtractFragment } from '../lib/string-manipulators';
import { Header } from '@/components/Layout/Header';
import { SearchUser } from '@/components/Layout/SearchUser';

export default function Index<
	T extends typeof getStaticProps
>({ user, repo }: InferGetStaticPropsType<T>) {
	const userName = user.user?.login
		? user.user.login
		: 'DopamineDriven';
	// const [userState, setUserState] = useState(userName);
	const [search, setSearch] = useState('');
	const { asPath: login, asPath } = useRouter();

	useEffect(() => {
		const pathSubString = asPath.split('/');
		if (!asPath.includes('/repositories/[owner]/[name]')) {
			setSearch('');
			return;
		}
		if (
			asPath.includes('/repositories/[owner]/[name]') &&
			asPath.length === 3
		) {
			setSearch(pathSubString[3]);
			return;
		}
		console.log(search);
	}, [asPath]);

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
				<div className='bg-purple-0 text-gray-50 font-bold font-sans text-4xl mx-auto justify-center flex select-none'>
					<RepoWrapper
						otherData={<ReposCoalesced viewer={repo.viewer} />}
					>
						<Container>
							<p>{searchBarStyled}</p>
							<p>{searchUserStyled}</p>
						</Container>
					</RepoWrapper>
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
			user: GetIssuesMinimalQuery;
			repo: ViewerReposQuery;
		}
	>
> {
	console.log(ctx.params ?? '');
	const apolloClient = initializeApollo();

	const { data: repo } = await apolloClient.query<
		ViewerReposQuery,
		ViewerReposQueryVariables
	>({
		query: ViewerReposDocument
	});

	const { data: user } = await apolloClient.query<
		GetIssuesMinimalQuery,
		GetIssuesMinimalQueryVariables
	>({
		query: GetIssuesMinimalDocument,
		variables: {
			login: 'DopamineDriven'
		}
	});
	return addApolloState(apolloClient, {
		props: { user, repo },
		revalidate: 120
	});
}
