import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import { useRouter } from 'next/router';
import {
	GitHub,
	GitHubEmail,
	GitHubFollowers,
	GitHubLink,
	GitHubLocation,
	GitHubTwitter,
	GitHubOrganization,
	GitHubStar
} from '../UI/Icons';
import Link from 'next/link';
import {
	useGetReposWithDetailsQuery,
	GetReposWithDetailsDocument,
	GetReposWithDetailsQuery,
	GetReposWithDetailsQueryVariables
} from '@/graphql/graphql';
import {
	Container,
	CommentsSkeleton,
	AgnosticRepoTemplate,
	LoadingSpinner,
	Button
} from '../UI';
import dynamic from 'next/dynamic';
import RepoWrapper from '@/components/Repo/wrapper';
import cn from 'classnames';

const dynamicProps = {
	loading: () => <LoadingSpinner />
};

const ApolloError = dynamic(
	() => import('@/components/UI/ApolloError'),
	dynamicProps
);

export interface SearchLandingProps
	extends GetReposWithDetailsQuery,
		GetReposWithDetailsQueryVariables {
	className?: string;
}

const SearchLanding = <P extends SearchLandingProps>({
	user,
	login,
	className
}: P) => {
	const router = useRouter();
	const fallbackDate = Date.now();
	const loginOG = useRef(router.query.login as string);
	const {
		data: dataUser,
		error,
		loading
	} = useGetReposWithDetailsQuery({
		query: GetReposWithDetailsDocument,
		variables: {
			login: (router.query.login as string) ?? login
		},
		notifyOnNetworkStatusChange: true
	});
	// useEffect(() => {
	// 	(async function checkCurrent() {
	// 		loginOG.current !== (router.query.login as string)
	// 			? await fetchMore({
	// 					query: GetReposWithDetailsDocument,
	// 					variables: {
	// 						login: (router.query.login as string) ?? login
	// 					}
	// 			  })
	// 			: {};
	// 	})();
	// }, [login, loginOG]);
	user = dataUser?.user;
	const dataFeed = (
		<Container className='mx-auto justify-center content-center font-sans w-full min-w-full inline-block py-12 px-12 max-w-3xl select-none'>
			{router.isFallback ? (
				<CommentsSkeleton />
			) : !router.isFallback && error ? (
				<ApolloError error={error} />
			) : !router.isFallback && !error && loading ? (
				<CommentsSkeleton />
			) : user?.repositories?.edges &&
			  user.repositories.edges.length > 0 ? (
				user.repositories.edges.map((repo, i) => {
					return repo?.node ? (
						<div key={i++} className='my-2 max-w-3xl'>
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
								repo_user_avatar={user?.avatarUrl}
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
			<RepoWrapper otherData={dataFeed}>
				{router.isFallback ? (
					<CommentsSkeleton />
				) : !router.isFallback && error ? (
					<ApolloError error={error} />
				) : !router.isFallback && !error && loading ? (
					<CommentsSkeleton />
				) : (
					user?.repositories?.edges && (
						<div className={cn('mx-auto', className)}>
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
											<a
												id='stars'
												className='no-underline font-light'
											>
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
											{`${
												user?.repositories.totalCount &&
												user.repositories.totalCount < 100
													? user.repositories.totalCount
													: 100
											} of ${user?.repositories
												.totalCount!} repos displayed`}
										</h3>
									</div>
								</div>
							</div>
						</div>
					)
				)}
			</RepoWrapper>
		</>
	);
};

export default SearchLanding;
