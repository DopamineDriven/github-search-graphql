import StarRating from '../StarRating';
import { GitHub } from '../Icons/index';
import cn from 'classnames';
import Container from '../Container';

export default function CommentsSkeleton() {
	const skeletonInternal = (
		<ul className='list-none shadow-cardHover'>
			<li
				className={
					'bg-redditNav px-4 py-6 shadow sm:p-6 sm:rounded-lg list-none max-w-5xl'
				}
			>
				<article
					aria-labelledby={'review-'}
					className='max-w-5xl h-40 min-h-full'
				>
					<div>
						<div className='flex space-x-3'>
							<div
								className={
									'flex-shrink-0 w-12 h-12 animate-pulse rounded-full bg-olive-300'
								}
							></div>
							<>
								<div className='min-w-0 flex-1'>
									<p className='text-sm text-olive-300 animate-pulse'>
										<StarRating stars={5} />
									</p>
									<h2 className='text-base font-medium tracking-wide text-gray-50 flex-row'>
										<p className='capitalize font-bold no-underline mx-0.5'></p>
									</h2>
								</div>
							</>
							<div className='flex-shrink-0 self-center flex'>
								<GitHub className='w-8 h-8 inline-block lg:-mt-5' />
							</div>
						</div>
						<p className='text-base font-medium text-secondary-0 mt-4'></p>
					</div>
					<blockquote className='mt-2 text-sm text-olive-300 space-y-4'>
						<p></p>
						<figcaption className='mt-3 flex font-medium text-sm text-olive-300'>
							<span className='ml-2 text-gray-200'></span>
						</figcaption>
					</blockquote>
				</article>
			</li>
		</ul>
	);
	return (
		<Container clean className={cn('py-10 cusor-default')}>
			<div className='max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:pr-8 lg:gap-y-8'>
				<div
					className={cn(
						' text-secondary-0 mx-auto font-sans select-none place-content-center justify-center'
					)}
				>
					<div className='pb-5 min-w-0 flex-1'>
						<h3 className='text-3xl sm:text-5xl leading-6 font-medium text-secondary-0 flex-row'>
							Booksy Reviews
						</h3>
					</div>
					<nav aria-label='Pagination'>
						<div className='hidden sm:block'>
							<p className='text-sm text-gray-50 w-10 animate-pulse'></p>
						</div>
						<div className='flex-1 inline-flex justify-between sm:justify-center my-auto'>
							<button
								className={cn(
									'm-3 relative inline-flex items-center px-4 py-2 border-olive-300 text-sm font-medium rounded-md text-olive-300 bg-redditBG hover:bg-redditSearch'
								)}
							>
								Previous
							</button>

							<button
								className={cn(
									'm-3 relative inline-flex items-center px-4 py-2 border-olive-300 text-sm font-medium rounded-md text-olive-300 bg-redditBG hover:bg-redditSearch'
								)}
							>
								Next
							</button>
						</div>
					</nav>
					<div className='mt-4 space-y-4 animate-pulse'>
						<h1 className='sr-only'>Booksy Reviews</h1>
						{skeletonInternal}
						{skeletonInternal}
						{skeletonInternal}
						{skeletonInternal}
						{skeletonInternal}
						{skeletonInternal}
						{skeletonInternal}
						{skeletonInternal}
						{skeletonInternal}
						{skeletonInternal}
					</div>
				</div>
			</div>
		</Container>
	);
}
