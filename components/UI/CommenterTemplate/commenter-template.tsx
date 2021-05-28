import cn from 'classnames';
import Image from 'next/image';
import parser from 'html-react-parser';
import { StarRating, ThreadTime } from '../index';
import { FC } from 'react';
import type { CommenterProps } from '@/types/custom-comments';
import { ImageLoader } from '@/lib/image-loader';

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
	stars,
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
			<ul className='list-none shadow-cardHover'>
				<li
					className={cn(
						'bg-redditNav px-4 py-6 shadow sm:p-6 sm:rounded-lg list-none max-w-5xl'
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
										'flex-shrink-0 w-12 h-12 rounded-full'
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
										{/* <p className='text-sm text-olive-300'>
											<StarRating stars={stars} />
										</p> */}
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
									</div>
								</>
								<div className='flex-shrink-0 self-center flex'>
									{source_icon}
								</div>
							</div>
							<p className='text-base font-medium text-secondary-0 mt-4'></p>
						</div>
						<blockquote className='mt-2 text-sm text-olive-300 space-y-4'>
							<p>{parser(`${commenter_content}`)}</p>
							<figcaption className='mt-3 flex font-medium text-sm text-olive-300'>
								<span className='ml-2 text-gray-200'>
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
