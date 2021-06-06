import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType
} from 'next';
import {
	initializeApollo,
	addApolloState
} from '@/lib/apollo';
import { ApolloQueryResult } from '@apollo/client';
import { useRouter } from 'next/router';
import { AppLayout } from '@/components/Layout';
import { GetFineDetailsByRepoQueryBatched } from '@/lib/ServerlessSnacks/get-fine-details-by-repo';
import { GetFineDetailsByRepoDocument } from '@/graphql/graphql';
import { RepoIssuesCoalesced } from '@/components/Repo/index';
import { CommentsSkeleton } from '@/components/UI';

export async function getServerSideProps<
	P extends GetFineDetailsByRepoQueryBatched
>(
	context: GetServerSidePropsContext
): Promise<
	GetServerSidePropsResult<{ data: ApolloQueryResult<P> }>
> {
	const {
		query: { details, login }
	} = context;

	const apolloClient = initializeApollo();
	const data = await apolloClient.query<P>({
		query: GetFineDetailsByRepoDocument,
		variables: {
			login: login as string,
			name: details as string
		},
		notifyOnNetworkStatusChange: true
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
				title={data.data.login ?? 'Dynamic User Query'}
				className='fit'
			>
				{data.data?.user ? (
					<RepoIssuesCoalesced
						user={data.data?.user}
						login={data.data.login}
						name={data.data.name}
						fallback={router.isFallback}
					/>
				) : (
					<CommentsSkeleton />
				)}
			</AppLayout>
		</>
	);
}
