import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import RepoWrapper from '../Repo/wrapper';
import {
	Exact,
	Scalars,
	useGetReposWithDetailsQuery,
	GetReposWithDetailsQuery,
	GetReposWithDetailsQueryVariables,
	GetReposWithDetailsDocument
} from '@/graphql/graphql';
import {
	GitHub,
	GitHubOrganization,
	GitHubEmail,
	GitHubFollowers,
	GitHubLink,
	GitHubRepo,
	GitHubGrabber,
	GitHubLocation,
	GitHubTwitter,
	GitHubStar
} from '@/components/UI/Icons';
import {
	CommentsSkeleton,
	Container,
	AgnosticRepoTemplate,
	Button,
	Fallback
} from '@/components/UI';

export interface LandingCoalescedUserProps {
	className?: string;
	user: GetReposWithDetailsQuery['user'];
}

const dynamicProps = {
	loading: () => <Fallback />
};

const ApolloError = dynamic(
	() => import('../UI/ApolloError'),
	dynamicProps
);

export default function LandingCoalesced<
	P extends LandingCoalescedUserProps
>(
	{ className, user }: P,
	{ login }: Exact<{ login: Scalars['String'] }>
) {
	const router = useRouter();
	const q = router.query.q;
	// previousData,
	// fetchMore
	/**
	 * check out interactionAbility field for pinnedRepos ❗
	 */
	const {
		fetchMore,
		data: userData,
		loading,
		error
	} = useGetReposWithDetailsQuery({
		query: GetReposWithDetailsDocument,
		variables: {
			login: q ? (q as string) : login ?? 'DopamineDriven'
		},
		notifyOnNetworkStatusChange: true
	});

	user = userData?.user;
	const fallbackDate = Date.now(); // refactor to a better solution ❕
	const dataRepos = (
		<Container className='mx-auto justify-center content-center font-sans w-full min-w-full inline-block py-12 px-12 max-w-3xl select-none'>
			{router.isFallback ? (
				<CommentsSkeleton />
			) : user?.pinnedItems?.nodes &&
			  user.pinnedItems.nodes.length > 0 ? (
				user.pinnedItems.nodes.map((repo, i) => {
					return repo?.__typename === 'Repository' ? (
						<div key={i++} className='my-2 max-w-3xl'>
							<AgnosticRepoTemplate
								primaryLanguage={repo?.primaryLanguage}
								source_icon={
									<GitHub className='text-gray-200 fill-current w-10 h-10' />
								}
								stars={repo.stargazerCount ?? 0}
								forks={repo.forkCount ?? 0}
								repo_user_name={repo.nameWithOwner ?? ''}
								repo_user_source_url={repo.homepageUrl ?? ''}
								repo_user_created_timestamp={
									new Date(repo.createdAt ?? fallbackDate)
								}
								repo_user_updated_timestamp={
									new Date(repo.updatedAt ?? fallbackDate)
								}
								repo_user_avatar={user?.avatarUrl}
								repo_user_fallback_avatar={'/doge-404.jpg'}
								repo_user_content={`${
									repo.description
										? (repo.description as string)
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
										alt={repo.name ?? 'no user.name'}
										src={repo.openGraphImageUrl ?? '/doge-404.jpg'}
									/>
									<Link
										href={`/repos/[login]/[details]`}
										as={`/repos/${repo.nameWithOwner}`}
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
			{error ? (
				<>
					<ApolloError error={error} />
				</>
			) : loading && !error ? (
				<>
					<Fallback />
				</>
			) : user ? (
				<RepoWrapper otherData={dataRepos}>
					<div className='mx-auto'>
						<div className='flex-0 bg-redditNav bg-opacity-80 my-auto px-20 text-gray-50 container justify-content-center align-middle '>
							<div className='pl-4'></div>
							<div
								className='py-6 pl-8'
								style={{ height: 'auto' }}
							>
								<Image
									className='w-full object-cover rounded-full ring-4 ring-redditBG ring-inset inline-flex float-right'
									loader={ImageLoader}
									width='125'
									height='125'
									quality={100}
									src={user?.avatarUrl}
								/>
								<h2 className='text-2xl font-semibold'>
									{user?.name}
								</h2>
								<h2 className='text-xl font-light mb-3 text-gray-300'>
									{user?.login}
								</h2>
								<h4 className='text-base mb-2'>{user?.bio}</h4>
								<div className='flex-1'>
									<div className='mb-5 text-sm'>
										<a
											id='followers'
											className='no-underline font-light text-gray-300'
										>
											<GitHubFollowers className='h-5 w-5 inline-block mr-2 z-150 align-top justify-start my-auto' />
											<span className='font-bold text-gray-100'>
												{user?.followers.totalCount.toLocaleString()}
											</span>
											{' followers'}
										</a>
										{' ⋅ '}
										<a
											id='following'
											className='no-underline font-light text-gray-300'
										>
											<span className='font-bold text-gray-100'>
												{user?.following.totalCount}
											</span>
											{' following'}
										</a>
										{' ⋅ '}
										<a id='stars' className='no-underline font-light'>
											<GitHubStar className='h-5 w-5 inline-block z-150 align-middle mb-1 justify-start my-auto text-gray-100' />{' '}
											<span className='font-bold'>
												{user?.starredRepositories.totalCount.toLocaleString()}
											</span>
										</a>
									</div>
								</div>
								<p className='my-1 text-sm'>
									<GitHubOrganization className='h-5 w-5 inline-block mr-2 z-150 align-top justify-start my-auto' />
									{user?.company}
								</p>
								<p className='my-1 text-sm'>
									<GitHubLocation className='h-5 w-5 inline-block mr-2 z-150 align-top justify-start my-auto' />
									{user?.location}
								</p>
								<p className='my-1 text-sm'>
									<GitHubEmail className='h-5 w-5 inline-block mr-2 z-150 align-top justify-start my-auto' />
									{user?.email}
								</p>
								<p className='my-1 text-sm'>
									<GitHubLink className='h-5 w-5 inline-block mr-2 z-150 align-top justify-start my-auto' />
									{user?.websiteUrl}
								</p>
								<p className='my-1 text-sm'>
									<GitHubTwitter className='h-5 w-5 inline-block mr-2 z-150 align-top justify-start my-auto' />
									@{user?.twitterUsername}
								</p>
								<div className='lg:pb-1 mt-6 min-w-0 flex-1'>
									<h3 className='text-lg sm:text-xl leading-6 font-light text-bgReddit flex-row'>
										{user.repositories
											? `${
													user?.repositories.totalCount &&
													user.repositories.totalCount < 100
														? user.repositories.totalCount
														: 100
											  } of ${user?.repositories
													.totalCount!} repos displayed`
											: user.pinnedItems
											? `${
													user?.pinnedItems.totalCount &&
													user.pinnedItems.totalCount < 7
														? user.pinnedItems.nodes?.length
														: 100
											  } of ${
													user?.pinnedItems.nodes!.length
											  } repos displayed`
											: 'of unknown repos displayed'}
									</h3>
								</div>
							</div>
						</div>
					</div>
				</RepoWrapper>
			) : (
				<></>
			)}
		</>
	);
}
