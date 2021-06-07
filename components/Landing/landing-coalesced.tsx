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
import { PinnedCards } from './index';
import cn from 'classnames';
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
	const Login = router.query.login;
	const {
		query: { q }
	} = router;

	const {
		fetchMore,
		data: userData,
		loading,
		error
	} = useGetReposWithDetailsQuery({
		query: GetReposWithDetailsDocument,
		variables: {
			login: Login
				? (Login as string)
				: login
				? login
				: q
				? (q as string)
				: 'DopamineDriven'
		},
		notifyOnNetworkStatusChange: true
	});

	user = userData?.user;
	return (
		<>
			{error ? (
				<>
					<ApolloError error={error} />
				</>
			) : router.isFallback ? (
				<Fallback />
			) : loading && !error ? (
				<>
					<CommentsSkeleton />
				</>
			) : user ? (
				<RepoWrapper
					otherData={
						<PinnedCards
							pinnedItems={user.pinnedItems}
							avatarUrl={user.avatarUrl}
						/>
					}
				>
					<div className={cn('mx-auto', className)}>
						<div className='flex-0 bg-redditNav bg-opacity-80 my-auto px-20 text-gray-50 container justify-content-center align-middle '>
							<div className='pl-4'></div>
							<div
								className='py-6 pl-8'
								style={{ height: 'auto' }}
							>
								<Image
									className='w-full object-cover rounded-full ring-4 ring-redditBG ring-inset inline-flex float-right'
									loader={ImageLoader}
									width='75'
									height='75'
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
													user?.pinnedItems.totalCount &&
													user.pinnedItems.totalCount < 100
														? user.pinnedItems.totalCount
														: 100
											  }/${user?.pinnedItems
													.totalCount!} pinned repos displayed`
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

// ) : repo?.__typename === 'Gist' ? (
// 	<div key={i++} className='my-2 max-w-2xl flex-0'>
// 		<AgnosticRepoTemplate
// 			primaryLanguage={repo?}
// 			source_icon={
// 				<GitHubGrabber className='text-gray-200 fill-current w-5 h-5 cursor-move' />
// 			}
// 			stars={repo.stargazerCount ?? 0}
// 			forks={repo.forkCount ?? 0}
// 			repo_user_name={repo.nameWithOwner ?? ''}
// 			repo_user_source_url={repo.homepageUrl ?? ''}
// 			repo_user_created_timestamp={
// 				new Date(repo.createdAt ?? fallbackDate)
// 			}
// 			repo_user_updated_timestamp={
// 				new Date(repo.updatedAt ?? fallbackDate)
// 			}
// 			repo_user_avatar={user?.avatarUrl}
// 			repo_user_fallback_avatar={'/doge-404.jpg'}
// 			repo_user_content={`${
// 				repo.description
// 					? (repo.description as string)
// 					: ''
// 			}`}
// 		>
// 			<div className='rounded-full inline-flex min-w-full'>
// 				<Link
// 					href={`/repos/[login]/[details]`}
// 					as={`/repos/${repo.nameWithOwner}`}
// 					passHref
// 					shallow={true}
// 					scroll={true}
// 				>
// 					<a>
// 						<Button
// 							className='bg-redditBG border-2 border-purple-900 w-auto rounded-xl inline-flex justify-start align-top mx-10 my-14 text-center text-gray-300 hover:bg-redditSearch hover:text-gray-50 duration-150 ease-out transition-transform transform-gpu'
// 							variant='slim'
// 						>
// 							Details
// 						</Button>
// 					</a>
// 				</Link>
// 			</div>
// 		</AgnosticRepoTemplate>
// 	</div>
// )
