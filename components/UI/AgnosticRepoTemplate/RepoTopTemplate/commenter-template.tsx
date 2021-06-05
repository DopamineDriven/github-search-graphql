import cn from 'classnames';
import Image from 'next/image';
import parser from 'html-react-parser';
import { ThreadTime } from '../../index';
import { FC } from 'react';
import type { RepoOverviewProps } from '@/types/custom-comments';
import { ImageLoader } from '@/lib/image-loader';
import { GitHubFork, StarIcon } from '../../Icons';

const CommenterTemplate: FC<RepoOverviewProps> = ({
	repo_user_name,
	repo_user_first_name,
	repo_user_last_name,
	repo_user_content,
	repo_user_created_timestamp,
	repo_user_updated_timestamp,
	repo_user_avatar,
	repo_user_fallback_avatar,
	repo_user_source_url,
	primaryLanguage,
	stars,
	forks,
	source_icon,
	children
}) => {
	const commenterName =
		repo_user_last_name != null
			? `${repo_user_first_name} + ${repo_user_last_name}`
			: repo_user_first_name
			? repo_user_first_name
			: repo_user_name;
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
						<div className='flex space-x-3 justify-items-center my-auto justify-center'>
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
										repo_user_avatar!
											? repo_user_avatar
											: repo_user_fallback_avatar
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
										{repo_user_source_url ? (
											<a
												href={repo_user_source_url}
												target='__blank'
												className='capitalize font-bold no-underline mx-0.5 hover:text-gray-300 duration-300 ease-in-out transition-transform transform-gpu'
											>
												{`${repo_user_name}`}
											</a>
										) : (
											<p className='capitalize font-bold no-underline mx-0.5'>
												{repo_user_name}
											</p>
										)}
									</h2>
									<p className='text-sm text-gray-200'>
										{
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
														id={primaryLanguage?.id ?? ''}
														fill={`${
															primaryLanguage?.color ?? 'rgb(88,166,255)'
														}`}
														viewBox='0 0 100 100'
														className='text-xs w-3 h-3 inline-block justify-start py-0.5'
														xmlns='http://www.w3.org/2000/svg'
													>
														<circle cx='50' cy='50' r='50' />
													</svg>
													{primaryLanguage?.name ?? 'Markdown'}
												</span>
											</p>
										}
										&nbsp;&nbsp;&nbsp;
										<StarIcon
											stars={stars}
											className='w-5 h-5 inline-block justify-start py-0.5 text-xs '
										/>{' '}
										{stars ?? 0}
										&nbsp;&nbsp;&nbsp;
										<GitHubFork className='w-5 h-5 inline-block justify-start py-0.5 text-xs ' />{' '}
										{forks ?? 0}
									</p>
								</div>
							</>
							<div className='flex-shrink-0 self-center flex align-top'>
								{source_icon}
							</div>
						</div>

						<blockquote className='mt-2 text-sm text-gray-200 font-light space-y-4'>
							<p>{parser(`${repo_user_content}`)}</p>
							<figcaption className='my-1 inline-flex font-light text-xs text-gray-300'>
								<span className='ml-2 text-gray-300 inline-flex text-xs'>
									Created&nbsp;
									{repo_user_updated_timestamp ? (
										<ThreadTime time={repo_user_created_timestamp} />
									) : (
										<ThreadTime time={repo_user_created_timestamp} />
									)}
								</span>
							</figcaption>
							<figcaption className='my-1 flex font-light text-xs'>
								<span className='ml-2 text-gray-300 inline-flex text-xs'>
									Updated&nbsp;
									{repo_user_updated_timestamp ? (
										<ThreadTime time={repo_user_updated_timestamp} />
									) : (
										<ThreadTime time={repo_user_created_timestamp} />
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
