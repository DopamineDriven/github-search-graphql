import { Navbar } from './Navbar';
import { Meta } from './Meta';
import cn from 'classnames';
import { Footer } from './Footer';
import { Button, Fallback } from '../UI';
import { useAcceptCookies } from '@/lib/use-accept-cookies';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { SearchUser } from './SearchUser';

const dynamicProps = {
	loading: () => <Fallback />
};

const Featurebar = dynamic(
	() => import('./Featurebar'),
	dynamicProps
);

// const Header = dynamic(
// 	() => import('./Header/header'),
// 	dynamicProps
// );

export interface LayoutProps {
	className?: string;
	title?: string;
	// hero?: React.ReactNode | JSX.Element;
	children?: React.ReactNode;
}

function AppLayout({
	className,
	title,
	children
}: LayoutProps) {
	const { acceptedCookies, onAcceptCookies } =
		useAcceptCookies();
	const { query: LoginTest } = useRouter();
	console.log(LoginTest.login ?? '');

	return (
		<>
			<Head>
				<title>{title ?? 'GitHub Search GraphQL'}</title>
			</Head>
			<Meta />
			<Navbar
				SearchUser={
					<SearchUser />
					// router.pathname === '/' ? <></> : <SearchUser />
				}
			/>
			<>
				<main className={cn('fit bg-purple-800 ', className)}>
					{children}
					<Footer />
				</main>

				<Featurebar
					title='This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy.'
					hide={acceptedCookies}
					className='prose-lg sm:prose-xl bg-opacity-90 sm:text-center z-150'
					action={
						<Button
							variant='slim'
							className='mx-auto text-gray-50 font-medium text-center rounded-xl border-gray-50 border-2 hover:bg-purple-800 hover:bg-opacity-80 hover:border-purple-800 duration-300 ease-in-out transform-gpu transition-colors'
							onClick={() => onAcceptCookies()}
						>
							Accept Cookies
						</Button>
					}
				/>
			</>
		</>
	);
}

export default AppLayout;

// const LoginView = dynamic(
// 	() => import('../Auth/github-login'),
// 	dynamicProps
// );

// const RegisterView = dynamic(
// 	() => import('../Auth/github-register'),
// 	dynamicProps
// );
/* {router.pathname === '/' ? <Header /> : hero ?? <></>} */
/* <Modal open={displayModal} onClose={closeModal}>
{modalView === 'LOGIN_VIEW' && <LoginView />}
{modalView === 'SIGNUP_VIEW' && <RegisterView />}
{modalView === 'FORGOT_VIEW' && <ForgotView />}
</Modal> */
// const { displayModal, closeModal } = useGlobal();
// const { locale = 'en-US' } = useRouter();
// const router = useRouter();
