import { FC } from 'react';
import cn from 'classnames';
import { Container } from '@/components/UI';
import FooterLogo from './footer-logo';
import FooterSocial from './footer-social';
import { format } from 'date-fns';
import { WcdIcon } from '@/components/UI/Icons';

interface FooterProps {
	className?: string;
}

const FooterFixture: FC<FooterProps> = ({
	children,
	className
}) => {
	return (
		<>
			<footer
				className={cn(
					className,
					' bg-redditNav text-purple-800 select-none font-sans z-150 pt-12 md:pt-0'
				)}
				aria-labelledby='footerHeading'
			>
				<Container className='px-8 2xl:px-12 3xl:px-14' clean>
					<div
						id='footerHeading'
						className='grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-white-50 py-12 text-secondary-0 transition-colors duration-150'
					>
						<div className='col-span-1 lg:col-span-2 rounded-full'>
							<FooterLogo />
						</div>
						<div className='col-span-1 lg:col-span-3 list-none text-olive-300'>
							{children}
						</div>
						<div className='col-span-1 lg:col-span-7 flex items-start lg:justify-end'>
							<FooterSocial />
						</div>
					</div>
					<div className='py-12 flex flex-col md:flex-row justify-between items-center space-y-4'>
						<div>
							<span className='font-medium'>
								&copy; {format(Date.now(), 'y')}, Andrew Ross. All
								Rights Reserved.
							</span>
						</div>
						<div className='flex items-center'>
							<a
								href='https://andrewross.dev/'
								target='__blank'
								aria-label='Andrew Ross'
								className=''
							>
								<div>
									<WcdIcon />
								</div>
							</a>
						</div>
					</div>
				</Container>
			</footer>
		</>
	);
};

export default FooterFixture;
