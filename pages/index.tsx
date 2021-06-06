import {
	GetStaticPropsContext,
	GetStaticPropsResult,
	InferGetStaticPropsType
} from 'next';
import {
	initializeApollo,
	addApolloState
} from '@/lib/apollo';
import {
	ViewerReposQuery,
	ViewerReposQueryVariables,
	ViewerReposDocument,
	GetReposWithDetailsQuery,
	GetReposWithDetailsQueryVariables,
	GetReposWithDetailsDocument
} from '@/graphql/graphql';
import { AppLayout } from '@/components/Layout';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { LandingCoalesced } from '@/components/Landing';

export default function Index<
	T extends typeof getStaticProps
>({ repo, user }: InferGetStaticPropsType<T>) {
	const [search, setSearch] = useState('');
	const router = useRouter();
	const refParams = useRef(router.query.login);
	const { pathname } = useRouter();
	const { asPath: login } = useRouter();
	const { query: LoginTest } = useRouter();
	console.log(LoginTest.login ?? '');
	useEffect(() => {
		const pathSubString = login.split('/');
		console.log(pathSubString.length);
		console.log(pathSubString);
		if (!login.includes('/repos/[login]')) {
			setSearch('');
			return;
		}
		if (
			login.includes('/repos/[login]') &&
			login.length === 3
		) {
			setSearch(
				refParams.current
					? (refParams.current as string)
					: pathSubString[2]
			);
			return;
		}
		console.log(refParams);
	}, [login, search]);
	return (
		<>
			<AppLayout>
				<div className='bg-purple-0 text-gray-50 font-bold font-sans text-4xl select-none'>
					<LandingCoalesced user={user.user} />
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
			user: GetReposWithDetailsQuery;
			repo: ViewerReposQuery;
		}
	>
> {
	console.log(ctx.params?.login ?? 'no params');
	const apolloClient = initializeApollo();

	const { data: repo } = await apolloClient.query<
		ViewerReposQuery,
		ViewerReposQueryVariables
	>({
		query: ViewerReposDocument
	});

	const { data: user } = await apolloClient.query<
		GetReposWithDetailsQuery,
		GetReposWithDetailsQueryVariables
	>({
		query: GetReposWithDetailsDocument,
		variables: {
			login: ctx.params?.login
				? (ctx.params.login as string)
				: 'DopamineDriven'
		}
	});
	return addApolloState(apolloClient, {
		props: { user, repo },
		revalidate: 120
	});
}

/**
const searchBarStyled = (
	<Container className='px-1/12 sm:px-1/6 lg:px-1/4 my-10'>
		{'Feeling lucky: '}
		<Searchbar />
	</Container>
	);
	const searchUserStyled = (
	<Container className='px-1/12 sm:px-1/6 lg:px-1/4 my-10'>
		{'Search by user: '}
		<SearchUser />
	</Container>
	);
 */
