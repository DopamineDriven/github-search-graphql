import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType
} from 'next';
import { Fallback } from '@/components/UI';
import { GetReposWithDetailsDocument } from '@/graphql/graphql';
import { GetReposWithDetailsQueryBatched } from '@/lib/ServerlessSnacks/get-user-repos-search-result';
import {
	initializeApollo,
	addApolloState
} from '@/lib/apollo';
import { ApolloQueryResult } from '@apollo/client';
import { useRouter } from 'next/router';
import { AppLayout } from '@/components/Layout';
import { SearchLanding } from '@/components/SearchLanding';

export async function getServerSideProps<
	P extends GetReposWithDetailsQueryBatched
>(
	context: GetServerSidePropsContext
): Promise<
	GetServerSidePropsResult<{
		data: ApolloQueryResult<P>;
	}>
> {
	const parsedParams = context.params?.login
		? context.params.login
		: '';
	const inc = context.req.headers;
	console.log('incoming headers: ', inc ?? '');
	context.res.setHeader(
		'AccessControl',
		'strict-origin-when-cross-origin'
	);
	const apolloClient = initializeApollo();
	const data = await apolloClient.query<P>({
		query: GetReposWithDetailsDocument,
		variables: {
			login: (parsedParams as string) ?? 'leerob'
		}
	});
	return addApolloState(apolloClient, {
		props: { data }
	});
}

export default function DynamicUserQuery<
	T extends typeof getServerSideProps
>({ data }: InferGetServerSidePropsType<T>) {
	const router = useRouter();
	return (
		<>
			<AppLayout
				title={data.data.user?.login ?? 'Dynamic User Query'}
				className='fit'
			>
				{data.data.user ? (
					<SearchLanding
						user={data.data.user}
						login={
							data.data.login ??
							(router.query.login as string) ??
							'DopamineDriven'
						}
					/>
				) : (
					<Fallback />
				)}
			</AppLayout>
		</>
	);
}
