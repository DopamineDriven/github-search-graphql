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
	const {
		query: { login },
		req: { headers }
	} = context;

	console.log('incoming headers: ', headers ?? '');
	context.res.setHeader(
		'AccessControl',
		'strict-origin-when-cross-origin'
	);
	const apolloClient = initializeApollo();
	const data = await apolloClient.query<P>({
		query: GetReposWithDetailsDocument,
		variables: {
			login: login as string
		}
	});
	return addApolloState(apolloClient, {
		props: { data }
	});
}

export default function DynamicUserQuery<
	T extends typeof getServerSideProps
>({ data }: InferGetServerSidePropsType<T>) {
	const {
		query: { login }
	} = useRouter();
	return (
		<>
			<AppLayout
				title={('Repo Overview - ' + login) as string}
				className='fit'
			>
				{data.data.user ? (
					<SearchLanding
						user={data.data.user}
						login={
							data.data.login
								? data.data.login
								: (login as string)
								? (login as string)
								: 'DopamineDriven'
						}
					/>
				) : (
					<Fallback />
				)}
			</AppLayout>
		</>
	);
}
