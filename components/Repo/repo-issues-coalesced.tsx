import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import {
	GetFineDetailsByRepoDocument,
	useGetFineDetailsByRepoQuery
} from '@/graphql/graphql';
import {
	Anchor,
	Container,
	Button,
	AgnosticRepoTemplate,
	CommentsSkeleton,
	LoadingSpinner,
	ThreadTime,
	TextEnhancer
} from '../UI';
import { GitHub, ReplyIcon } from '../UI/Icons';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import Link from 'next/link';
import type { RepoIssuesCoalescedProps } from './types';
import parser from 'html-react-parser';

const dynamicProps = {
	loading: () => <LoadingSpinner />
};

const ApolloError = dynamic(
	() => import('@/components/UI/ApolloError'),
	dynamicProps
);

export default function RepoIssuesCoalesced<
	P extends RepoIssuesCoalescedProps
>({ className, user, login, name, fallback }: P) {
	const fallbackDate = Date.now();
	const router = useRouter();
	const { query } = useRouter();
	console.log(
		'[login query params from repo coalesced component]: ',
		query.login ? query.login : '',
		'[login query params from repo coalesced component]: ',
		query.details ? query.details : ''
	);
	const { data, loading, error } =
		useGetFineDetailsByRepoQuery({
			query: GetFineDetailsByRepoDocument,
			variables: {
				login: (query.login as string)
					? (query.login as string)
					: login,
				name: (query.details as string)
					? (query.details as string)
					: name
			}
		});

	user = data?.user;
	const dataRepo = user?.repository;
	return (
		<Container
			className={cn(
				'mx-auto justify-center content-center font-sans w-full min-w-full inline-block py-12 px-12 max-w-8xl col-span-5',
				className
			)}
		>
			<Link
				passHref
				shallow={true}
				scroll={false}
				href={`/repos/[login]`}
				as={`${
					(('/repos/' + router.query.login) as string)
						? ((`/repos/` + router.query.login) as string)
						: `/repos/` + login
				}`}
			>
				<Button
					variant='slim'
					className='mx-auto transform-gpu rounded-xl my-4 justify-center px-4 py-2 bg-redditBG border-purple-900 border-2 hover:bg-redditSearch'
				>
					<Anchor
						className='mx-auto text-2xl text-gray-200 '
						onClick={() => router.back()}
					>
						Back to Repos
					</Anchor>
				</Button>
			</Link>

			{fallback === true ? (
				<CommentsSkeleton />
			) : loading && !error && !router.isFallback ? (
				<>
					<LoadingSpinner />
				</>
			) : error ? (
				<>
					<ApolloError error={error} />
				</>
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
						repo_user_avatar={user?.avatarUrl}
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
						{user?.repository?.issues?.nodes &&
						user?.repository?.issues.nodes.length > 0 ? (
							user.repository.issues.nodes.map((repoIssue, j) => {
								const repoIssueBodyConditional = repoIssue?.body
									? repoIssue.body
									: repoIssue?.bodyText
									? repoIssue.bodyText
									: '';
								return repoIssue ? (
									<>
										<div
											className={cn(
												'inline-flex max-w-8xl w-full',
												className ?? ''
											)}
											key={++j}
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
															<div className='min-w-full mb-4'>
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
																<div className='mt-6'>
																	{repoIssue.comments.nodes &&
																	repoIssue.comments.nodes.length > 0 ? (
																		repoIssue.comments.nodes.map(
																			(comment, k) => {
																				const commentIssueBodyConditional =
																					comment?.body ? comment.body : '';
																				const commentParsed = parser(
																					comment?.bodyHTML as string
																				);
																				return comment ? (
																					<>
																						<div
																							className='inline-flex max-w-3xl w-full'
																							key={++k}
																						>
																							<div className='flex-col'>
																								<ReplyIcon className='text-gray-300 rotate-180 transform-gpu ml-2 mt-6' />
																							</div>
																							<>
																								<div className='flex-row space-y-4 bg-redditNav rounded-lg sm:ml-6 p-3 w-full'>
																									<div className='flex space-x-3'>
																										<div
																											className={cn(
																												'flex-shrink-0 w-12 h-12 rounded-full'
																											)}
																										>
																											<Image
																												alt={
																													comment.author?.login
																														? comment.author.login
																														: 'author user unknown'
																												}
																												loader={ImageLoader}
																												className='h-10 w-10 rounded-full'
																												width={500}
																												layout='responsive'
																												aria-orientation='vertical'
																												height={500}
																												objectFit='fill'
																												src={
																													comment.author?.avatarUrl
																														? comment.author.avatarUrl
																														: '/doge-404.jpg'
																												}
																												priority
																												quality={100}
																											/>
																										</div>
																										<>
																											<div className='min-w-0 flex-1'>
																												<p className='text-sm font-medium text-gray-50'>
																													{comment.author?.login ?? ' '}
																												</p>
																												<h2
																													id={
																														'reply-' +
																															comment.author?.login ?? ''
																													}
																													className='text-base font-medium text-gray-50 flex-row'
																												></h2>
																											</div>
																										</>
																									</div>
																									<p className='text-base font-medium text-purple-0 mt-4'></p>
																									<blockquote className='my-2 text-sm text-gray-200 space-y-4'>
																										<TextEnhancer
																											textToTransform={
																												commentIssueBodyConditional as string
																											}
																										/>
																										<p className='text-base font-bold tracking-wide text-gray-50 flex-row'>
																											{comment.reactions.nodes?.map(
																												(react, l) => {
																													const emojiReaction:
																														| ''
																														| '👍'
																														| '👎'
																														| '🤣'
																														| '❤'
																														| '👀'
																														| '🚀'
																														| '🎉'
																														| '😕' = react
																														? react.content.valueOf() ===
																														  'THUMBS_UP'
																															? '👍'
																															: react.content.valueOf() ===
																															  'THUMBS_DOWN'
																															? '👎'
																															: react.content.valueOf() ===
																															  'LAUGH'
																															? '🤣'
																															: react.content.valueOf() ===
																															  'HEART'
																															? '❤'
																															: react.content.valueOf() ===
																															  'EYES'
																															? '👀'
																															: react.content.valueOf() ===
																															  'ROCKET'
																															? '🚀'
																															: react.content.valueOf() ===
																															  'HOORAY'
																															? '🎉'
																															: react.content.valueOf() ===
																															  'CONFUSED'
																															? '😕'
																															: ''
																														: '';

																													return react ? (
																														<div
																															className='has-tooltip'
																															key={l++}
																														>
																															<TextEnhancer
																																textToTransform={
																																	commentParsed
																																		? (commentParsed as string)
																																		: ''
																																}
																															/>
																															<TextEnhancer
																																textToTransform={
																																	emojiReaction
																																}
																															/>
																															<p className='tooltip transform -translate-y-4 translate-x-5'>
																																{react.user?.login ?? ''}
																															</p>
																														</div>
																													) : (
																														<></>
																													);
																												}
																											)}
																										</p>
																										<figcaption className='mt-3 flex text-sm'>
																											<span className='ml-2 inline-flex w-32'>
																												{comment.updatedAt ? (
																													<ThreadTime
																														time={
																															new Date(
																																comment.updatedAt ??
																																	fallbackDate
																															)
																														}
																													/>
																												) : (
																													<ThreadTime
																														time={
																															new Date(
																																comment.createdAt ??
																																	fallbackDate
																															)
																														}
																													/>
																												)}
																											</span>
																											<div>
																												{/* <div className='flex-row w-full py-3 text-xs'>
															<TextEnhancer
																textToTransform={total.toLocaleString()}
															/>
														</div> */}
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
																</div>
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
							})
						) : (
							<></>
						)}
					</AgnosticRepoTemplate>
				</div>
			)}
			<Button
				variant='slim'
				className='mx-auto transform-gpu rounded-xl my-4 justify-center px-4 py-2 bg-redditBG border-purple-900 border-2 hover:bg-redditSearch'
			>
				<Anchor
					className='mx-auto text-2xl text-gray-200 hover:text-gray-50 '
					onClick={() => router.back()}
				>
					Back to Repos
				</Anchor>
			</Button>
		</Container>
	);
}
