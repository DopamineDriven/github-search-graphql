import { Configuration, Fetcher } from 'swr/dist/types';
import {
	GetStaticPropsContext,
	GetStaticPropsResult,
	InferGetStaticPropsType,
	NextPage
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

export default function Index<
	T extends typeof getStaticProps
>({ user }: InferGetStaticPropsType<T>) {
	const { user: userData } = user;
	return (
		<>
			<div className=' filter grayscale text-gray-50 font-bold font-sans text-4xl mx-auto justify-center flex my-24 select-none'>
				<Image
					className=' object-cover backdrop-blur-3xl'
					loader={ImageLoader}
					width='400'
					height='400'
					src={
						userData?.avatarUrl
							? userData.avatarUrl
							: '/architecture.jpg'
					}
				/>
				Configuring Initial Dev Setup, switching to dev branch
			</div>
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
