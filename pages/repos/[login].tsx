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
import {
	GitHub,
	GitHubOrganization,
	GitHubEmail,
	GitHubFollowers,
	GitHubLink,
	GitHubLocation,
	GitHubTwitter,
	GitHubStar
} from '@/components/UI/Icons';
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
// import useSWR from 'swr';
// import { userSearchFetcher } from '@/lib/SwrFetchers/pages-dynamic-login-route';

export async function getServerSideProps<
	P extends GetReposWithDetailsQueryBatched
>(
	context: GetServerSidePropsContext
): Promise<
	GetServerSidePropsResult<{
		data: ApolloQueryResult<P>;
		parsedParams: string | string[];
	}>
> {
	const parsedParams = context.params?.login
		? context.params.login
		: '';

	const apolloClient = initializeApollo();
	const data = await apolloClient.query<P>({
		query: GetReposWithDetailsDocument,
		variables: {
			login: (parsedParams as string) ?? 'leerob'
		}
	});
	return addApolloState(apolloClient, {
		props: { data, parsedParams }
	});
}

export default function DynamicUserQuery<
	T extends typeof getServerSideProps
>({ data, parsedParams }: InferGetServerSidePropsType<T>) {
	const router = useRouter();
	const fallbackDate = Date.now();
	const swrInit = data.data;
	const clientParams = router.query.login;
	console.log('swrInit: ', parsedParams);
	console.log('router.query: ', router.query.login);

	// const { data: swrData } =
	// 	useSWR<GetReposWithDetailsQueryBatched>(
	// 		() =>
	// 			`/api/search-user-server?login=${
	// 				clientParams as string
	// 			}`,
	// 		userSearchFetcher
	// 	);

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
									<GitHub className='text-gray-200 fill-current w-10 h-10' />
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
												className='bg-redditBG border-2 border-purple-900 w-auto rounded-xl inline-flex justify-start align-top mx-10 my-14 text-center text-gray-300 hover:bg-redditSearch hover:text-gray-50 duration-150 ease-out transition-transform transform-gpu'
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
						<div className='flex-0 bg-redditNav bg-opacity-80 my-auto px-20 text-gray-50 container justify-content-center align-middle '>
							<div className='pl-4'></div>
							<div
								className='py-6 pl-8'
								style={{ height: 'auto' }}
							>
								<Image
									className='w-full object-cover rounded-full ring-4 ring-gray-400 ring-inset inline-flex float-right'
									loader={ImageLoader}
									width='125'
									height='125'
									quality={100}
									src={data.data.user?.avatarUrl}
								/>
								<h2 className='text-2xl font-semibold'>
									{data.data.user?.name}
								</h2>
								<h2 className='text-xl font-light mb-3 text-gray-300'>
									{data.data.user?.login}
								</h2>
								<h4 className='text-base mb-2'>
									{data.data.user?.bio}
								</h4>
								<div className='flex-1'>
									<div className='mb-5 text-sm'>
										<a
											id='followers'
											className='no-underline font-light text-gray-300'
										>
											<GitHubFollowers className='h-5 w-5 inline-block mr-2 z-150 align-top justify-start my-auto' />
											<span className='font-bold text-gray-100'>
												{data.data.user?.followers.totalCount.toLocaleString()}
											</span>
											{' followers'}
										</a>
										{' ⋅ '}
										<a
											id='following'
											className='no-underline font-light text-gray-300'
										>
											<span className='font-bold text-gray-100'>
												{data.data.user?.following.totalCount}
											</span>
											{' following'}
										</a>
										{' ⋅ '}
										<a id='stars' className='no-underline font-light'>
											<GitHubStar className='h-5 w-5 inline-block z-150 align-middle mb-1 justify-start my-auto text-gray-100' />{' '}
											<span className='font-bold'>
												{data.data.user?.starredRepositories.totalCount.toLocaleString()}
											</span>
										</a>
									</div>
								</div>
								<p className='my-1 text-sm'>
									<GitHubOrganization className='h-5 w-5 inline-block mr-2 z-150 align-top justify-start my-auto' />
									{data.data.user?.company}
								</p>
								<p className='my-1 text-sm'>
									<GitHubLocation className='h-5 w-5 inline-block mr-2 z-150 align-top justify-start my-auto' />
									{data.data.user?.location}
								</p>
								<p className='my-1 text-sm'>
									<GitHubEmail className='h-5 w-5 inline-block mr-2 z-150 align-top justify-start my-auto' />
									{data.data.user?.email}
								</p>
								<p className='my-1 text-sm'>
									<GitHubLink className='h-5 w-5 inline-block mr-2 z-150 align-top justify-start my-auto' />
									{data.data.user?.websiteUrl}
								</p>
								<p className='my-1 text-sm'>
									<GitHubTwitter className='h-5 w-5 inline-block mr-2 z-150 align-top justify-start my-auto' />
									@{data.data.user?.twitterUsername}
								</p>
								<div className='lg:pb-1 mt-6 min-w-0 flex-1'>
									<h3 className='text-lg sm:text-xl leading-6 font-light text-bgReddit flex-row'>
										{`${
											data.data.user?.repositories.totalCount &&
											data.data.user.repositories.totalCount < 100
												? data.data.user.repositories.totalCount
												: 100
										} of ${data.data.user?.repositories
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
