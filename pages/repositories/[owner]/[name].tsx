import { useRouter } from 'next/router';
import { ApolloQueryResult } from '@apollo/client';
import Image from 'next/image';
import {
	initializeApollo,
	addApolloState
} from '@/lib/apollo';
import GetRepoNames from '@/lib/get-repo-names';
import {
	GetStaticPaths,
	GetStaticPathsContext,
	GetStaticPropsContext,
	GetStaticPropsResult,
	InferGetStaticPropsType
} from 'next';
import { AppLayout } from '@/components/Layout';
import {
	Fallback,
	AgnosticCommentThread
} from '@/components/UI';
import RepoConstituents from '@/components/Repo/repo-constituents';
import getReposByNameQuery, {
	GetRepoByNameQueryBatched
} from '@/lib/get-repo-by-name';
import { slashExtractFragment } from '@/lib/string-manipulators';
import { ParsedUrlQuery } from 'querystring';
import RepoCards from '@/components/Repo/repo-cards';
import { ImageLoader } from '@/lib/image-loader';
import { GitHub } from '@/components/UI/Icons';
import { Container } from '@/components/UI';

export async function getStaticPaths({
	locales
}: GetStaticPathsContext): Promise<{
	paths: string[] | undefined;
	fallback: boolean | 'blocking';
}> {
	const data = await GetRepoNames({
		login: 'DopamineDriven'
	});
	return {
		paths: locales
			? locales.reduce<string[]>((arr, locale) => {
					data.data.user?.repositories?.nodes?.forEach(
						nombre => {
							arr.push(
								`/${locale}/repositories/${slashExtractFragment(
									nombre!.nameWithOwner[0]
								)}/${slashExtractFragment(
									nombre!.nameWithOwner[2]
								)}`
							);
						}
					);
					return arr;
			  }, [])
			: data.data.user?.repositories?.nodes?.map(
					nombre =>
						`/repositories/${slashExtractFragment(
							nombre!.nameWithOwner[0]
						)}/${slashExtractFragment(nombre!.nameWithOwner[2])}`
			  ),
		fallback: true
	};
}

export async function getStaticProps<P>(
	ctx: GetStaticPropsContext
): Promise<
	GetStaticPropsResult<
		P & {
			data: ApolloQueryResult<GetRepoByNameQueryBatched>;
			nameSplit: string[];
		}
	>
> {
	const apolloClient = initializeApollo();
	// const names = await getStaticPaths({
	// 	locales: ctx.locales
	// });

	const name = ctx?.params
		? ctx.params.name
		: 'DopamineDriven';

	const x = ctx?.params
		? ctx.params.owner
		: 'DopamineDriven';
	const nameSplit = slashExtractFragment(
		ctx.params!.name as string
	);
	//  names.paths![0];
	console.log(nameSplit[0]);
	const data = await getReposByNameQuery({
		login: 'DopamineDriven',
		name: ctx.params!.name as string
	});

	return addApolloState(apolloClient, {
		props: { data, nameSplit },
		revalidate: 120
	});
}

export default function RepoDynamic<
	T extends typeof getStaticProps
>({ data }: InferGetStaticPropsType<T>) {
	const router = useRouter();
	const parsedUrl = router.query ? router.query.name : '';
	console.log(parsedUrl ?? '');
	return (
		<>
			{router.isFallback ? (
				<Fallback />
			) : (
				<AppLayout title={'landing'} className='fit'>
					<Container className='mx-auto justify-center content-center w-full min-w-full inline-block py-12 px-12'>
						<AgnosticCommentThread
							source_icon={
								<GitHub className='text-gray-200 fill-current' />
							}
							stars={
								data.data.user?.repository?.stargazerCount ?? 0
							}
							forks={data.data.user?.repository?.forkCount ?? 0}
							key={data.data.user?.repository?.id}
							commenter_name={
								data.data.user?.repository?.nameWithOwner ?? ''
							}
							commenter_source_url={
								data.data.user?.repository?.homepageUrl ?? '#'
							}
							commenter_created_timestamp={new Date(Date.now())}
							commenter_updated_timestamp={new Date(Date.now())}
							commenter_avatar={data.data.user?.avatarUrl}
							commenter_fallback_avatar={'/doge-404.jpg'}
							commenter_content={`${
								(data.data.user?.repository
									?.description as string) ??
								'No description provided'
							}`}
						>
							<div className='rounded-full '>
								<Image
									className='object-cover'
									loader={ImageLoader}
									width='200'
									height='200'
									quality={100}
									alt={data.data.user?.name ?? 'no user.name'}
									src={
										data.data.user?.repository?.openGraphImageUrl ??
										'/doge-404.jpg'
									}
								/>
							</div>
						</AgnosticCommentThread>
					</Container>
				</AppLayout>
			)}
		</>
	);
}
