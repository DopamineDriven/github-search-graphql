import {
	GetStaticPropsContext,
	GetStaticPropsResult,
	InferGetStaticPropsType
} from 'next';
import {
	initializeApollo,
	addApolloState
} from '../lib/apollo';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import { GetIssuesMinimalDocument } from '../graphql/graphql';
import { ApolloError } from '@apollo/client';
import {
	GetIssuesMinimalQueryVariables,
	GetIssuesMinimalQuery
} from '../graphql/graphql';
import PaginationControls from '@/components/Landing/Pagination/controls';
import {
	Container,
	AgnosticCommentThread
} from '@/components/UI';
import { GitHub } from '@/components/UI/Icons';
import { fromUnixTime } from 'date-fns';
import HTMLReactParser from 'html-react-parser';
import { useState, useRef } from 'react';
import SearchForm from '@/components/Landing/search-form';
import IssueFinder from '@/components/Landing/Pagination/paginaton';
import { AppLayout } from '@/components/Layout';
const X = () => {
	const [login, setLogin] = useState<string>(
		'DopamineDriven'
	);
	const loginRef = useRef(login);
	return (
		<>
			<div className='container font-sans text-gray-50'>
				<h1>GitHub Issue Tracker</h1>
				<SearchForm login={login} setLogin={setLogin} />
			</div>
			<IssueFinder login={login} />
		</>
	);
};

export default function Issues<
	T extends typeof getStaticProps
>({ user }: InferGetStaticPropsType<T>) {
	const [login, setLogin] = useState<string>(
		'DopamineDriven'
	);
	const loginRef = useRef(login);
	const { user: userData } = user;
	const AgnosticTemplate = (
		<Container>
			{user?.user?.issues?.nodes &&
			user.user.issues.nodes.length > 0 ? (
				user.user.issues.nodes.map((usr, i) => {
					const getTime = Date.now();

					return usr ? (
						<AgnosticCommentThread
							forks={0}
							source_icon={<GitHub />}
							stars={1}
							key={usr.id}
							commenter_name={'Active Issue'}
							commenter_created_timestamp={fromUnixTime(
								getTime.valueOf()
							)}
							commenter_avatar={'/meta/android-chrome-192x192.png'}
							commenter_fallback_avatar={
								'/meta/android-chrome-192x192.png'
							}
							commenter_content={`${
								++i + ':' + HTMLReactParser(usr.bodyHTML ?? '')
							}`}
						>
							<Image
								className='object-cover  backdrop-blur-3xl'
								loader={ImageLoader}
								width='400'
								height='400'
								quality={100}
								alt={usr?.author?.login ? usr.author.login : ''}
								src={
									usr.author?.avatarUrl
										? usr.author.avatarUrl
										: '/architecture.jpg'
								}
							/>
						</AgnosticCommentThread>
					) : (
						<></>
					);
				})
			) : (
				<></>
			)}
		</Container>
	);
	return (
		<>
			<AppLayout>
				<Container>
					{user?.user?.issues?.nodes &&
					user.user.issues.nodes.length > 0 ? (
						user.user.issues.nodes.map((usr, i) => {
							const getTime = Date.now();

							return usr ? (
								<AgnosticCommentThread
									forks={0}
									source_icon={<GitHub />}
									stars={1}
									key={usr.id}
									commenter_name={'Active Issue'}
									commenter_created_timestamp={fromUnixTime(
										getTime.valueOf()
									)}
									commenter_avatar={
										'/meta/android-chrome-192x192.png'
									}
									commenter_fallback_avatar={
										'/meta/android-chrome-192x192.png'
									}
									commenter_content={`${
										++i + ':' + HTMLReactParser(usr.bodyHTML ?? '')
									}`}
								>
									<Image
										className='object-cover  backdrop-blur-3xl'
										loader={ImageLoader}
										width='400'
										height='400'
										quality={100}
										alt={usr?.author?.login ? usr.author.login : ''}
										src={
											usr.author?.avatarUrl
												? usr.author.avatarUrl
												: '/architecture.jpg'
										}
									/>
								</AgnosticCommentThread>
							) : (
								<></>
							);
						})
					) : (
						<></>
					)}
				</Container>
				<div className='text-gray-50 font-bold font-sans text-4xl mx-auto justify-center flex  select-none'>
					<Image
						className=' object-cover'
						loader={ImageLoader}
						width='400'
						height='400'
						src={
							userData?.avatarUrl
								? userData.avatarUrl
								: '/doge-404.jpg'
						}
					/>
					<IssueFinder login={loginRef.current ?? 'leerob'} />
					<SearchForm
						className='bg-gray-200 text-gray-900 my-auto pb-8 ml-8 absolute origin-top top-10 right-0'
						login={loginRef.current ?? 'Leerob'}
						setLogin={() => 'Leerob'}
					/>
					<PaginationControls />
				</div>
			</AppLayout>
		</>
	);
}

export async function getStaticProps<P>(
	ctx: GetStaticPropsContext
): Promise<
	GetStaticPropsResult<
		P & {
			user: GetIssuesMinimalQuery;
			error: ApolloError;
			loading: boolean;
		}
	>
> {
	const p = ctx.params ? ctx.params.q : '';
	console.log(p ?? 'no params at the moment');
	const apolloClient = initializeApollo();

	const {
		data: user,
		loading,
		error
	} = await apolloClient.query<
		GetIssuesMinimalQuery,
		GetIssuesMinimalQueryVariables
	>({
		query: GetIssuesMinimalDocument,
		variables: {
			login: 'DopamineDriven'
		}
	});
	return addApolloState(apolloClient, {
		props: { user },
		revalidate: 120
	});
}
