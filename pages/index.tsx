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

export default function Index<
	T extends typeof getStaticProps
>({ user, repo }: InferGetStaticPropsType<T>) {
	const userName = user.user?.login
		? user.user.login
		: 'DopamineDriven';
	const [userState, setUserState] = useState(userName);
	const [search, setSearch] = useState('');
	const { asPath } = useRouter();
	const repos = repo.viewer.repositories.nodes?.map(xx => {
		console.log(xx?.nameWithOwner);
		const y = xx?.nameWithOwner;
		const yy = y!.split(/([/])/);
		console.log(y);
		return { y };
	});
	console.log(repos![0]);
	useEffect(() => {
		const pathSubString = asPath.split('/');
		if (!asPath.includes('/github/[owner]/[name]')) {
			setSearch('');
			return;
		}
		if (
			asPath.includes('/github/[owner]/[name]') &&
			asPath.length === 3
		) {
			setSearch(pathSubString[3]);
			return;
		}
		console.log(search);
	}, [asPath]);

	const searchBarStyled = (
		<Container className='px-1/12 sm:px-1/6 lg:px-1/4 my-10'>
			<Searchbar />
		</Container>
	);
	return (
		<>
			<AppLayout>
				<div className='bg-purple-700 filter saturate-50 text-gray-50 font-bold font-sans text-4xl mx-auto justify-center flex select-none'>
					<p className='max-w-sm pl-0.5 pt-0.5 text-3xl tracking-wide'>
						{
							'Configuring dynamic routing for on-demand generation of paths/pages in real-time for any given repo(s) queried.\n \n Searchbars, mutations, and more with an Open issue tracker nearly completed. JWT Auth incoming over the weekend as well.'
						}
					</p>
					<RepoWrapper otherData={searchBarStyled}>
						<Container>
							<ReposCoalesced viewer={repo.viewer} />
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
	const p = ctx.params
		? (ctx.params.q as string | string[])
		: '';
	const pp = slashExtractFragment(p as string);
	console.log(pp[0]);
	console.log(pp[2]);
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

/**
 * 				<Image
					className=' object-cover rounded-full'
					loader={ImageLoader}
					width='400'
					height='400'
					src={
						userData?.avatarUrl
							? userData.avatarUrl
							: '/architecture.jpg'
					}
				/>
 */
