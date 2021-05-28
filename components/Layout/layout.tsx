import { Navbar } from './Navbar';
import { Meta } from './Meta';
import cn from 'classnames';
import { Footer } from './Footer';
import { Button, Fallback } from '../UI';
import { useAcceptCookies } from '@/lib/use-accept-cookies';
import Head from 'next/head';
import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';

const dynamicProps = {
	loading: () => <Fallback />
};

const Featurebar = dynamic(
	() => import('./Featurebar'),
	dynamicProps
);

const Header = dynamic(
	() => import('./Header/header'),
	dynamicProps
);

export interface LayoutProps {
	className?: string;
	title?: string;
	hero?: React.ReactNode | JSX.Element;
	children?: React.ReactNode;
}
function AppLayout({
	className,
	title,
	children,
	hero
}: LayoutProps) {
	const { acceptedCookies, onAcceptCookies } =
		useAcceptCookies();
	// const { displayModal, closeModal } = useGlobal();
	// const { locale = 'en-US' } = useRouter();
	// const router = useRouter();

	return (
		<>
			<Head>
				<title>{title ?? 'GitHub Search GraphQL'}</title>
			</Head>
			<Meta />
			<Navbar />
			<>
				{/* {router.pathname === '/' ? <Header /> : hero ?? <></>} */}
				{/* <Modal open={displayModal} onClose={closeModal}>
					{modalView === 'LOGIN_VIEW' && <LoginView />}
					{modalView === 'SIGNUP_VIEW' && <RegisterView />}
                    {modalView === 'FORGOT_VIEW' && <ForgotView />}
				</Modal> */}
				<div className={cn(className)}>
					<main className='fit'>
						{children}
						<Footer />
					</main>
					<div className='font-sans z-150'>
						<Featurebar
							title='This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy.'
							hide={acceptedCookies}
							className='prose-lg sm:prose-xl bg-opacity-90 sm:text-center'
							action={
								<Button
									type='submit'
									variant='slim'
									className='mx-auto text-secondary-0 text-center rounded-xl border-purple-800 border-1 hover:bg-gray-700 hover:bg-opacity-80 hover:border-purple-800 duration-500 ease-in-out transform-gpu transition-colors'
									onClick={() => onAcceptCookies()}
								>
									Accept Cookies
								</Button>
							}
						/>
					</div>
				</div>
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
