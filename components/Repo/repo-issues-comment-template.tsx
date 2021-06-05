import { FC } from 'react';
import { IssueCommentsExcised } from '@/types/issue-comments-excised';
import cn from 'classnames';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import { TextEnhancer, ThreadTime, Container } from '../UI';
import { ReplyIcon } from '../UI/Icons';
import {
	EmojiOptions,
	ReactType
} from '@/types/user-reaction';

export type IssueCommentsExcisedTemplateProps = {
	repoIssue: IssueCommentsExcised;
	className?: string;
};

const IssueCommentsExcisedTemplate: FC<IssueCommentsExcisedTemplateProps> =
	({
		repoIssue,
		className,
		children: subCommentChildren
	}) => {
		const fallbackDate = Date.now();
		const total = repoIssue.comments.totalCount ?? 0;
		return (
			<Container className={cn(className, '')} clean>
				{total} total comments
				{repoIssue.comments.nodes &&
				repoIssue.comments.nodes.length > 0 ? (
					repoIssue.comments.nodes.map((comment, j) => {
						const commentIssueBodyConditional = comment?.bodyText
							? comment.bodyText
							: '';
						return comment ? (
							<>
								<div
									className='inline-flex max-w-3xl w-full'
									key={++j}
								>
									<div className='flex-col'>
										<ReplyIcon className='text-purple-0 rotate-180 transform-gpu ml-2 mt-6' />
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
															id={'reply-' + comment.author?.login ?? ''}
															className='text-base font-medium text-gray-50 flex-row'
														></h2>
													</div>
												</>
											</div>
											<p className='text-base font-medium text-purple-0 mt-4'></p>
											<blockquote className='mt-2 text-sm text-gray-200 space-y-4'>
												<TextEnhancer
													textToTransform={commentIssueBodyConditional}
												/>
												<p className='text-base font-bold tracking-wide text-gray-50 flex-row'>
													{comment.reactions.nodes?.map((react, k) => {
														return react ? (
															<div className='has-tooltip' key={k++}>
																<TextEnhancer
																	textToTransform={
																		react
																			? react.content.valueOf() === 'THUMBS_UP'
																				? '👍'
																				: react.content.valueOf() ===
																				  'THUMBS_DOWN'
																				? '👎'
																				: react.content.valueOf() === 'LAUGH'
																				? '🤣'
																				: react.content.valueOf() === 'HEART'
																				? '❤'
																				: react.content.valueOf() === 'EYES'
																				? '👀'
																				: react.content.valueOf() === 'ROCKET'
																				? '🚀'
																				: react.content.valueOf() === 'HOORAY'
																				? '🎉'
																				: react.content.valueOf() === 'CONFUSED'
																				? '😕'
																				: ''
																			: ''
																	}
																/>
																<p className='tooltip'>
																	{react.user?.login ?? ''}
																</p>
															</div>
														) : (
															<></>
														);
													})}
												</p>
												<figcaption className='mt-3 flex text-sm'>
													<span className='ml-2 inline-flex w-32'>
														{comment.updatedAt ? (
															<ThreadTime
																time={
																	new Date(comment.updatedAt ?? fallbackDate)
																}
															/>
														) : (
															<ThreadTime
																time={
																	new Date(comment.createdAt ?? fallbackDate)
																}
															/>
														)}
													</span>
													{subCommentChildren ? (
														<div>{subCommentChildren}</div>
													) : (
														<></>
													)}
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
			</Container>
		);
	};

export default IssueCommentsExcisedTemplate;
