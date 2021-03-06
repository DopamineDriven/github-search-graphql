import IssueCommentsExcisedTemplate from './repo-issues-comment-template';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import cn from 'classnames';
import { FC } from 'react';
import { ThreadTime, TextEnhancer } from '../UI';
import { ReplyIcon } from '../UI/Icons';
import type { RepoIssuesConnectionProps } from './types';

const RepoIssuesConnection: FC<RepoIssuesConnectionProps> =
	({ issues, className, children }) => {
		const fallbackDate = Date.now();
		return (
			<>
				{issues?.nodes && issues.nodes.length > 0 ? (
					issues.nodes.map((repoIssue, j) => {
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
															<IssueCommentsExcisedTemplate
																comments={repoIssue.comments}
															/>
														</div>
														{children ? <div>{children}</div> : <></>}
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
			</>
		);
	};

export default RepoIssuesConnection;
