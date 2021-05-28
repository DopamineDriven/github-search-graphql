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

export default function Index<
	T extends typeof getStaticProps
>({ user, repo }: InferGetStaticPropsType<T>) {
	const { user: userData } = user;
	return (
		<>
			<AppLayout>
				<div className='bg-purple-700 filter saturate-50 text-gray-50 font-bold font-sans text-4xl mx-auto justify-center flex my-24 select-none'>
					Configuring Initial Dev Setup, switching to dev branch
					<RepoWrapper
						otherData={<ReposCoalesced viewer={repo.viewer} />}
					>
						<ReposCoalesced viewer={repo.viewer} />
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
	console.log(p ?? 'no params at the moment');
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
