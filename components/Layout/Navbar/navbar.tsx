import { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import NavbarLinks from './navbar-links';
import css from './navbar.module.css';
import { Transition } from '@headlessui/react/dist';
import {
	AngledBracketClosed,
	Menu,
	X
} from '../../UI/Icons';
import Link from 'next/link';
import throttle from 'lodash.throttle';
import { SearchUser } from '../SearchUser';

export interface NavbarProps {
	className?: string;
	Desktop?: React.ReactNode;
	Mobile?: React.ReactNode;
}

const Navbar: FC<NavbarProps> = ({
	className,
	Desktop,
	Mobile
}) => {
	const [menuOpen, setMenuOpen] = useState(true);
	const [isOpen] = useState(false);
	const [hasScrolled, setHasScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = throttle(() => {
			const offset = 0;
			const { scrollTop } = document.documentElement;
			const scrolled = scrollTop > offset;
			setHasScrolled(scrolled);
		}, 200);
		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, [hasScrolled]);
	return (
		<>
			<nav className={cn(className, css.root, css.stickyNav)}>
				<div
					className={cn(
						css.stickyNav,
						{ 'shadow-magical': hasScrolled },
						'max-w-full mx-auto px-4 sm:px-6 lg:px-8 font-sans text-purple-600 transform-gpu duration-300 ease-in-out transition-all'
					)}
				>
					<div
						className={cn(
							'flex flex-row-reverse justify-between transform-gpu duration-500 ease-in-out transition-all',
							css.stickyNav,
							{
								'h-24': !hasScrolled,
								'h-20': hasScrolled
							}
						)}
					>
						<div className='flex'>
							<div className='-ml-2 mr-2 flex items-center lg:hidden w-full min-w-full'>
								<button
									className='inline-flex items-center justify-center p-2 rounded-md text-purple-600 hover:text-opacity-80 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-700'
									aria-expanded={false}
									onClick={() => setMenuOpen(!menuOpen)}
								>
									<span className='sr-only'>Open Main Menu</span>
									{menuOpen ? (
										<Menu
											className={cn('h-8 w-8 focus:outline-none', {
												hidden: !menuOpen,
												block: menuOpen
											})}
										/>
									) : (
										<X
											className={cn('h-8 w-8 focus:outline-none', {
												hidden: menuOpen,
												block: !menuOpen
											})}
										/>
									)}
								</button>
							</div>
							<div className='hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4'>
								{Desktop ?? <NavbarLinks />}
							</div>
						</div>
						<div className='flex items-center'>
							<div className='flex-shrink-0'>
								<div className='lg:mx-4 lg:flex-shrink-0 lg:flex lg:items-center'>
									<div className='ml-3 '>
										<div className=''>
											<span className='sr-only'>
												Github Search GraphQL
											</span>
											<Link href='/' passHref scroll={true}>
												<a className='#logo'>
													<AngledBracketClosed
														className={cn(
															'stroke-current text-purple-700',
															css.svg,
															'cursor-default focus:outline-none transition-all transform-gpu ease-in-out duration-500',
															{
																'w-18 h-18': !hasScrolled,
																'w-14 h-14': hasScrolled
															}
														)}
													/>
												</a>
											</Link>
										</div>

										<Transition show={isOpen && !hasScrolled}>
											<Transition.Child
												enter='transition ease-out duration-200'
												enterFrom='transform opacity-0 scale-95'
												enterTo='transform opacity-100 scale-100'
												leave='transition ease-in duration-200'
												leaveFrom='transform opacity-100 scale-100'
												leaveTo='transform opacity-0 scale-95'
											>
												<div
													role='menu'
													aria-orientation='vertical'
													aria-labelledby='user-menu'
													className={
														'origin-top-right absolute right-0 mt-2 h-40 w-44 rounded-md shadow-lg ring-2 ring-purple-600 outline-none grid grid-cols-1 bg-secondary-0 z-50 px-3 py-2 hover:bg-opacity-80'
													}
												>
													<NavbarLinks
														root={cn('px-3 py-2 hover:bg-purple-800')}
													/>
												</div>
											</Transition.Child>
										</Transition>
									</div>
								</div>
							</div>
							<div className='float-right inline-flex w-full'>
								<SearchUser />
							</div>
						</div>
					</div>
				</div>
				<div
					className={cn('lg:hidden text-purple-700', {
						block: !menuOpen,
						hidden: menuOpen
					})}
				>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 align-middle'>
						{Mobile ?? (
							<NavbarLinks
								root={cn(
									'block px-3 py-2 rounded-md text-2xl font-medium text-purple-700 font-sans'
								)}
							/>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
