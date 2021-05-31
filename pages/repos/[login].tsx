import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType
} from 'next';
import {
	CommentsSkeleton,
	Container,
	AgnosticRepoTemplate,
	Button
} from '@/components/UI';
import { GitHub } from '@/components/UI/Icons';
import { GetReposWithDetailsDocument } from '@/graphql/graphql';
import { GetReposWithDetailsQueryBatched } from '@/lib/ServerlessSnacks/get-user-repos-search-result';
import {
	initializeApollo,
	addApolloState
} from '@/lib/apollo';
import { ApolloQueryResult } from '@apollo/client';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import { useRouter } from 'next/router';
import { AppLayout } from '@/components/Layout';
import Link from 'next/link';
import RepoWrapper from '@/components/Repo/wrapper';

export async function getServerSideProps<
	P extends GetReposWithDetailsQueryBatched
>(
	context: GetServerSidePropsContext
): Promise<
	GetServerSidePropsResult<{ data: ApolloQueryResult<P> }>
> {
	const req = context.params?.login
		? context.params.login
		: '';

	const res = await req?.valueOf();
	const apolloClient = initializeApollo();
	const data = await apolloClient.query<P>({
		query: GetReposWithDetailsDocument,
		variables: {
			login: (res as string) ?? 'leerob'
		}
	});
	return addApolloState(apolloClient, {
		props: { data }
	});
}

export default function DynamicUserQuery<
	T extends typeof getServerSideProps
>({ data }: InferGetServerSidePropsType<T>) {
	const router = useRouter();
	const fallbackDate = Date.now();

	const dataComponent = (
		<Container className='mx-auto justify-center content-center font-sans w-full min-w-full inline-block py-12 px-12 max-w-3xl select-none'>
			{router.isFallback ? (
				<CommentsSkeleton />
			) : data.data.user?.repositories?.edges &&
			  data.data.user.repositories.edges.length > 0 ? (
				data.data.user.repositories.edges.map((repo, i) => {
					return repo?.node ? (
						<div key={repo.node.id} className='my-2 max-w-3xl'>
							<AgnosticRepoTemplate
								primaryLanguage={repo?.node?.primaryLanguage}
								source_icon={
									<GitHub className='text-gray-200 fill-current' />
								}
								stars={repo.node.stargazerCount ?? 0}
								forks={repo.node.forkCount ?? 0}
								repo_user_name={repo.node.nameWithOwner ?? ''}
								repo_user_source_url={repo.node.homepageUrl ?? ''}
								repo_user_created_timestamp={
									new Date(repo.node.createdAt ?? fallbackDate)
								}
								repo_user_updated_timestamp={
									new Date(repo.node.updatedAt ?? fallbackDate)
								}
								repo_user_avatar={data.data.user?.avatarUrl}
								repo_user_fallback_avatar={'/doge-404.jpg'}
								repo_user_content={`${
									repo.node.description
										? (repo.node.description as string)
										: ''
								}`}
							>
								<div className='rounded-full inline-flex min-w-full'>
									<Image
										className='object-cover ring-2 ring-purple-0 inline-flex'
										loader={ImageLoader}
										width='350'
										height='200'
										quality={100}
										alt={
											repo.node.openGraphImageUrl ?? 'no user.name'
										}
										src={
											repo.node.openGraphImageUrl ?? '/doge-404.jpg'
										}
									/>
									<Link
										href={`/repos/[login]/[details]`}
										as={`/repos/${repo.node.nameWithOwner}`}
										passHref
										shallow={true}
										scroll={true}
									>
										<a>
											<Button
												className='bg-redditBG border-2 border-purple-900 w-auto rounded-xl inline-flex justify-start align-top mx-20 my-14 text-center text-gray-300 hover:bg-redditSearch hover:text-gray-50 duration-150 ease-out transition-transform transform-gpu'
												variant='slim'
											>
												Details
											</Button>
										</a>
									</Link>
								</div>
							</AgnosticRepoTemplate>
						</div>
					) : (
						<></>
					);
				})
			) : (
				<></>
			)}
		</Container>
	);

	return (
		<>
			<AppLayout
				title={data.data.user?.login ?? 'Dynamic User Query'}
				className='fit'
			>
				<RepoWrapper otherData={dataComponent}>
					<div className='mx-auto'>
						<div className='flex bg-redditNav bg-opacity-80 my-auto px-20 text-gray-50 container justify-content-center align-middle '>
							<div className='pl-4'></div>
							<div className='pt-4' style={{ height: '50vh' }}>
								<Image
									className='w-full object-cover rounded-full ring-2 ring-purple-0 inline-flex float-right'
									loader={ImageLoader}
									width='125'
									height='125'
									quality={100}
									src={data.data.user?.avatarUrl}
								/>
								<h4 className='text-lg font-bold'>
									{data.data.user?.bio}
								</h4>
								<p className='mt-1'>
									@{data.data.user?.twitterUsername}
								</p>
								{data.data.user?.login}
								<div className='lg:pb-1 min-w-0 flex-1'>
									<h3 className='text-lg sm:text-xl leading-6 font-bold text-bgReddit flex-row'>
										{`${
											data.data.user?.repositories.totalCount &&
											data.data.user.repositories.totalCount < 100
												? data.data.user.repositories.totalCount
												: 100
										}/${data.data.user?.repositories
											.totalCount!} repos displayed`}
									</h3>
								</div>
							</div>
						</div>
					</div>
				</RepoWrapper>
			</AppLayout>
		</>
	);
}
