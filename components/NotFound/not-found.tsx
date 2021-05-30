import Image, { ImageLoaderProps } from 'next/image';
import Link from 'next/link';
import css from './not-found.module.css';
import cn from 'classnames';
import { Container, ApolloError, Fallback } from '../UI';
import { FC } from 'react';

import parser from 'html-react-parser';
import { ImageLoader } from '../../lib/image-loader';

export interface NotFoundProps {
	className?: string;
}

export default function NotFound({
	className
}: NotFoundProps) {
	return (
		<>
			<Container clean className=''>
				<>
					<div
						className={cn(
							'overflow-hidden select-none font-sans',
							className
						)}
					>
						<div className='relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
							<div className='hidden lg:block bg-redditBG absolute top-0 bottom-0 left-3/4 w-screen'></div>
							<div className='mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none'>
								<div className='lg:col-span-2'>
									<h2 className='text-4xl text-purple-0 font-semibold tracking-wide uppercase'>
										Wow Not Found
									</h2>
									<h3 className='mt-2 text-2xl leading-8 font-extrabold tracking-tight text-purple-0 sm:text-3xl hover:text-olive-500 duration-300 transition-colors'>
										{"That's a 404. Click "}
										<Link href='/' as='/' passHref scroll={true}>
											<a className='w-auto'>
												<span className='sr-only'>
													{
														"That's a 404 Not Found Error. Click Here to Return Home."
													}
												</span>
												<p className={css.p}>{'here'}</p>
											</a>
										</Link>
									</h3>
								</div>
							</div>
							<div className='mt-8 lg:grid lg:grid-cols-2 lg:gap-8'>
								<div className='relative lg:row-start-1 lg:col-start-2'>
									<svg
										className='hidden lg:block absolute top-0 right-0 -mt-20 -mr-20'
										width='404'
										height='384'
										fill='none'
										viewBox='0 0 404 384'
										aria-hidden='true'
									>
										<defs>
											<pattern
												id='de316486-4a29-4312-bdfc-fbce2132a2c1'
												x='0'
												y='0'
												width='20'
												height='20'
												patternUnits='userSpaceOnUse'
											>
												<rect
													x='0'
													y='0'
													width='4'
													height='4'
													className='text-purple-0'
													fill='currentColor'
												/>
											</pattern>
										</defs>
										<rect
											width='404'
											height='384'
											fill='url(#de316486-4a29-4312-bdfc-fbce2132a2c1)'
										/>
									</svg>
									<div className='relative text-base mx-auto max-w-prose lg:max-w-none'>
										<figure>
											<div className='aspect-w-12 aspect-h-7 lg:aspect-none'>
												<Image
													loader={ImageLoader}
													className='rounded-lg shadow-lg object-cover object-center'
													width={500}
													aria-orientation='vertical'
													height={720}
													objectFit={'cover'}
													src={'/doge-404.jpg'}
													priority
													quality={100}
												/>
											</div>
											<figcaption className='mt-3 flex text-sm text-gray-100'>
												<svg
													className='flex-none w-5 h-5 text-redditBG'
													stroke='#6c5ab5'
													strokeWidth='0.5'
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 20 20'
													fill='currentColor'
													aria-hidden='true'
												>
													<path
														fillRule='evenodd'
														d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
														clipRule='evenodd'
													/>
												</svg>
												<span className='ml-2 text-purple-0'>
													Photograph via CloudFront Doge
												</span>
											</figcaption>
										</figure>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			</Container>
		</>
	);
}

// export function WowNotFound() {
// 	return (
// 		<div className='text-center text-3xl text-gray-300 m-auto space-y-4 pb-12 '>
// 			<p>
// 				Not Amaze. Many&nbsp;
// 				<Link href='/' passHref>
// 					<a className={css.wow}>Return Home</a>
// 				</Link>
// 				.
// 			</p>
// 			<div>
// 				<Image
// 					priority
// 					src={'/doge-404.jpg'}
// 					width={500}
// 					height={720}
// 					alt='wow. not found.'
// 					aria-orientation='vertical'
// 				/>
// 			</div>
// 		</div>
// 	);
// }
