import { FC } from 'react';
import { Container } from '../UI';
import cn from 'classnames';
import React from 'react';
import { TypeScript } from '../UI/Icons';

export type RepoWrapperProps = {
	className?: string;
	otherData?: React.ReactNode | JSX.Element;
};

const RepoWrapper: FC<RepoWrapperProps> = ({
	children,
	className,
	otherData
}) => {
	return (
		<>
			<Container clean className={cn(className, ' fit')}>
				<>
					<div
						className={cn(
							'overflow-hidden select-none font-sans',
							className
						)}
					>
						<div className='relative max-w-8xl mx-auto pt-8 px-1 sm:px-6 lg:px-8'>
							<div className='hidden lg:block bg-purple-700 absolute top-0 bottom-0 left-3/4 w-screen'></div>
							<div className='mx-auto text-base max-w-prose lg:grid lg:grid-cols-9 lg:gap-8 lg:max-w-none'>
								<div className='lg:col-span-5 pr-0 sm:pr-6 md:mr-10'>
									{otherData}
								</div>
								<div className='mt-8 lg:grid lg:col-span-4 lg:gap-8 flex-grow'>
									<div className='flex-col lg:row-start-1 lg:col-start-1'>
										<svg
											className='hidden lg:block absolute top-0 right-0 -mt-20 -mr-24 transform-gpu'
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
														className='text-secondary-0'
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
												<div className='lg:aspect-none lg:mx-3'>
													{children}
												</div>
												<figcaption className='mt-3 flex text-sm text-olive-300'>
													<span className='ml-2 text-secondary-0'></span>
												</figcaption>
											</figure>
											<div className='lg:w-full lg:min-h-full lg:m-24  lg:pl-12 lg:flex-grow lg:border-collapse lg:rounded-xl lg:mx-auto'>
												<TypeScript className='w-64 h-64' />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			</Container>
		</>
	);
};

export default RepoWrapper;
