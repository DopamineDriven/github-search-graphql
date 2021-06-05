import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType
} from 'next';
import {
	CommentsSkeleton,
	Container,
	AgnosticRepoTemplate,
	ThreadTime,
	TextEnhancer,
	Button
} from '@/components/UI';
import { GitHub, ReplyIcon } from '@/components/UI/Icons';
import {
	initializeApollo,
	addApolloState
} from '@/lib/apollo';
import { ApolloQueryResult } from '@apollo/client';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import { useRouter } from 'next/router';
import { AppLayout } from '@/components/Layout';
import { GetFineDetailsByRepoQueryBatched } from '@/lib/ServerlessSnacks/get-fine-details-by-repo';
import {
	GetFineDetailsByRepoDocument,
	ReactionContent
} from '@/graphql/graphql';
import cn from 'classnames';
import IssueCommentsExcisedTemplate from '../../../components/Repo/repo-issues-comment-template';

export async function getServerSideProps<
	P extends GetFineDetailsByRepoQueryBatched
>(
	context: GetServerSidePropsContext
): Promise<
	GetServerSidePropsResult<{ data: ApolloQueryResult<P> }>
> {
	const login = context.query
		? context.query.login
		: 'no login';
	const details = context.query
		? context.query.details
		: 'no details';
	const apolloClient = initializeApollo();
	const data = await apolloClient.query<P>({
		query: GetFineDetailsByRepoDocument,
		variables: {
			login: login,
			name: details
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

	const IssueSubThread = (
		<>
			{data.data.user?.repository?.issues.nodes &&
			data.data.user.repository.issues.nodes.length > 0 ? (
				data.data.user.repository.issues.nodes.map(
					(repoIssue, i) => {
						const repoIssueBodyConditional = repoIssue?.body
							? repoIssue.body
							: repoIssue?.bodyText
							? repoIssue.bodyText
							: '';
						return repoIssue ? (
							<>
								<div
									className='inline-flex max-w-8xl w-full'
									key={++i}
								>
									<div className='flex-col'>
										<ReplyIcon />
									</div>
									<>
										<div className='flex-col space-y-4 bg-redditSearch rounded-lg sm:ml-6 p-3 w-full'>
											<div className='flex space-x-3'>
												<div
													className={cn(
														'flex-shrink-0 w-12 h-12 rounded-full'
													)}
												>
													<Image
														alt={repoIssue.number.toString()}
														loader={ImageLoader}
														className='h-10 w-10 rounded-full'
														width={500}
														layout='responsive'
														aria-orientation='vertical'
														height={500}
														objectFit='fill'
														src={
															repoIssue.author?.avatarUrl
																? repoIssue.author.avatarUrl
																: repoIssue.url
														}
														priority
														quality={100}
													/>
												</div>
												<>
													<div className='min-w-0 flex-1'>
														<p className='text-sm font-medium text-gray-50'>
															{repoIssue.title ?? ' '}
														</p>
														<h2
															id={
																'reply-' + repoIssue.author?.login
																	? repoIssue.author?.login ?? ''
																	: ''
															}
															className='text-base font-medium text-gray-50 flex-row'
														>
															<p className='text-base font-bold tracking-wide text-gray-50 flex-row'>
																{repoIssue.author?.login}
															</p>
														</h2>
													</div>
												</>
											</div>
											<p className='text-base font-medium text-purple-0 mt-4'></p>
											<blockquote className='mt-2 text-sm text-gray-200 space-y-4'>
												<TextEnhancer
													textToTransform={repoIssueBodyConditional}
												/>
												<figcaption className='mt-3 flex text-sm'>
													<span className='ml-2 inline-flex'>
														{repoIssue.updatedAt ? (
															<ThreadTime
																time={
																	new Date(
																		repoIssue.updatedAt ?? fallbackDate
																	)
																}
															/>
														) : (
															<ThreadTime
																time={
																	new Date(
																		repoIssue.createdAt ?? fallbackDate
																	)
																}
															/>
														)}
													</span>
													<div>
														<IssueCommentsExcisedTemplate
															repoIssue={repoIssue}
														/>
													</div>
												</figcaption>
											</blockquote>
										</div>
									</>
								</div>
							</>
						) : (
							<></>
						);
					}
				)
			) : (
				<></>
			)}
		</>
	);

	const dataRepo = data.data.user?.repository;
	return (
		<>
			<AppLayout
				title={data.data.login ?? 'Dynamic User Query'}
				className='fit'
			>
				<Container className='mx-auto justify-center content-center font-sans w-full min-w-full inline-block py-12 px-12 max-w-8xl col-span-5'>
					<Button
						variant='slim'
						className='mx-auto transform-gpu rounded-xl my-4 justify-center px-4 py-2 bg-redditBG border-purple-900 border-2 hover:bg-redditSearch'
					>
						<a
							className='mx-auto text-2xl text-gray-200 hover:text-gray-50 '
							onClick={() => router.back()}
						>
							Back to Repos
						</a>
					</Button>

					{router.isFallback ? (
						<CommentsSkeleton />
					) : (
						<div className='my-2 max-w-8xl'>
							<AgnosticRepoTemplate
								primaryLanguage={dataRepo?.primaryLanguage}
								source_icon={
									<GitHub className='text-gray-200 fill-current' />
								}
								stars={dataRepo?.stargazerCount ?? 0}
								forks={dataRepo?.forkCount ?? 0}
								repo_user_name={dataRepo?.nameWithOwner ?? ''}
								repo_user_source_url={dataRepo?.homepageUrl ?? ''}
								repo_user_created_timestamp={
									new Date(dataRepo?.createdAt ?? fallbackDate)
								}
								repo_user_updated_timestamp={
									new Date(dataRepo?.updatedAt ?? fallbackDate)
								}
								repo_user_avatar={data.data.user?.avatarUrl}
								repo_user_fallback_avatar={'/doge-404.jpg'}
								repo_user_content={`${
									dataRepo?.description
										? (dataRepo.description as string)
										: ''
								}`}
							>
								<div className='rounded-xl flex-row'>
									<Image
										className='object-cover ring-2 ring-purple-0'
										loader={ImageLoader}
										width='350'
										height='200'
										quality={100}
										alt={dataRepo?.id.toString() ?? 'no user.name'}
										src={
											dataRepo?.openGraphImageUrl
												? dataRepo.openGraphImageUrl
												: '/doge-404.jpg'
										}
									/>
								</div>
								{IssueSubThread}
							</AgnosticRepoTemplate>
						</div>
					)}
					<Button
						variant='slim'
						className='mx-auto transform-gpu rounded-xl my-4 justify-center px-4 py-2 bg-redditBG border-purple-900 border-2 hover:bg-redditSearch'
					>
						<a
							className='mx-auto text-2xl text-gray-200 hover:text-gray-50 '
							onClick={() => router.back()}
						>
							Back to Repos
						</a>
					</Button>
				</Container>
			</AppLayout>
		</>
	);
}
