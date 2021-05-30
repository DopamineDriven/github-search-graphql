import cn from 'classnames';
import Image from 'next/image';
import parser from 'html-react-parser';
import { ThreadTime } from '../../index';
import { FC } from 'react';
import type { CommenterProps } from '@/types/custom-comments';
import { ImageLoader } from '@/lib/image-loader';
import { GitHubFork, StarIcon } from '../../Icons';

const CommenterTemplate: FC<CommenterProps> = ({
	commenter_name,
	commenter_first_name,
	commenter_last_name,
	commenter_content,
	commenter_created_timestamp,
	commenter_updated_timestamp,
	commenter_avatar,
	commenter_fallback_avatar,
	commenter_source_url,
	primaryLanguage,
	stars,
	forks,
	source_icon,
	children
}) => {
	const commenterName =
		commenter_last_name != null
			? `${commenter_first_name} + ${commenter_last_name}`
			: commenter_first_name
			? commenter_first_name
			: commenter_name;
	return (
		<>
			<ul className='list-none'>
				<li
					className={cn(
						'bg-redditNav px-4 py-6 sm:p-6 sm:rounded-lg list-none max-w-5xl shadow-cardHover select-none'
					)}
				>
					<article
						aria-labelledby={'review-' + commenterName}
						className='max-w-5xl'
					>
						<div>
							<div className='flex space-x-3'>
								<div
									className={cn(
										'flex-shrink-0 w-12 h-12 rounded-full ring-2 ring-purple-0'
									)}
								>
									<Image
										alt={commenterName}
										loader={ImageLoader}
										className='h-10 w-10 rounded-full'
										width={500}
										layout='responsive'
										aria-orientation='vertical'
										height={500}
										objectFit='fill'
										src={
											commenter_avatar!
												? commenter_avatar
												: commenter_fallback_avatar
										}
										priority
										quality={100}
									/>
								</div>
								<>
									<div className='min-w-0 flex-1'>
										<h2
											id={'review-' + commenterName}
											className='text-base font-medium tracking-wide text-gray-50 flex-row'
										>
											{commenter_source_url ? (
												<a
													href={commenter_source_url}
													target='__blank'
													className='capitalize font-bold no-underline mx-0.5'
												>
													{commenterName}
												</a>
											) : (
												<p className='capitalize font-bold no-underline mx-0.5'>
													{commenterName}
												</p>
											)}
										</h2>
										<p className='text-sm text-gray-200'>
											{primaryLanguage?.name !== undefined ? (
												<p className='text-sm font-semibold text-gray-200 inline-block rounded-lg'>
													<span className='sr-only'>
														Primary Language:{' '}
														{primaryLanguage
															? primaryLanguage.id &&
															  primaryLanguage.color &&
															  primaryLanguage.name
															: 'no primary Language for this repo'}
													</span>
													<span>
														<svg
															id={primaryLanguage.id ?? ''}
															fill={`${
																primaryLanguage.color ?? 'rgb(26,26,27)'
															}`}
															viewBox='0 0 100 100'
															className='text-xs w-3 h-3 inline-block justify-start py-0.5'
															xmlns='http://www.w3.org/2000/svg'
														>
															<circle cx='50' cy='50' r='50' />
														</svg>
														{primaryLanguage.name}
													</span>
												</p>
											) : (
												<p></p>
											)}
											&nbsp;&nbsp;&nbsp;
											<StarIcon stars={stars} /> {stars ?? 0}
											&nbsp;&nbsp;&nbsp;
											<GitHubFork /> {forks ?? 0}
										</p>
										<p></p>
									</div>
								</>
								<div className='flex-shrink-0 self-center flex'>
									{source_icon}
								</div>
							</div>
						</div>
						<blockquote className='mt-2 text-sm text-purple-0 space-y-4'>
							<p>{parser(`${commenter_content}`)}</p>
							<figcaption className='mt-3 flex font-medium text-sm text-olive-300'>
								<span className='ml-2 text-gray-200 inline-flex text-xs'>
									Created&nbsp;
									{commenter_updated_timestamp ? (
										<ThreadTime time={commenter_created_timestamp} />
									) : (
										<ThreadTime time={commenter_created_timestamp} />
									)}
								</span>
							</figcaption>
							<figcaption className='mt-3 flex font-medium text-sm text-olive-300'>
								<span className='ml-2 text-gray-200 inline-flex text-xs'>
									Updated&nbsp;
									{commenter_updated_timestamp ? (
										<ThreadTime time={commenter_updated_timestamp} />
									) : (
										<ThreadTime time={commenter_created_timestamp} />
									)}
								</span>
							</figcaption>
							{children ?? <></>}
						</blockquote>
					</article>
				</li>
			</ul>
		</>
	);
};

export default CommenterTemplate;
