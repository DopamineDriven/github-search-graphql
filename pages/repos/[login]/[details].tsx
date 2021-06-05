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
	const login = context.query
		? context.query.login
		: 'no login';
	const details = context.query
		? context.query.details
		: 'no details';
	const apolloClient = initializeApollo();
	const data = await apolloClient.query<P>({
		query: GetFineDetailsByRepoDocument,
		variables: {
			login: login,
			name: details
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
// const IssueSubThread = (
// 	<>
// 		{data.data.user?.repository?.issues.nodes &&
// 		data.data.user.repository.issues.nodes.length > 0 ? (
// 			data.data.user.repository.issues.nodes.map(
// 				(repoIssue, i) => {
// 					const repoIssueBodyConditional = repoIssue?.body
// 						? repoIssue.body
// 						: repoIssue?.bodyText
// 						? repoIssue.bodyText
// 						: '';
// 					return repoIssue ? (
// 						<>
// 							<div
// 								className='inline-flex max-w-8xl w-full'
// 								key={++i}
// 							>
// 								<div className='flex-col'>
// 									<ReplyIcon />
// 								</div>
// 								<>
// 									<div className='flex-col space-y-4 bg-redditSearch rounded-lg sm:ml-6 p-3 w-full'>
// 										<div className='flex space-x-3'>
// 											<div
// 												className={cn(
// 													'flex-shrink-0 w-12 h-12 rounded-full'
// 												)}
// 											>
// 												<Image
// 													alt={repoIssue.number.toString()}
// 													loader={ImageLoader}
// 													className='h-10 w-10 rounded-full'
// 													width={500}
// 													layout='responsive'
// 													aria-orientation='vertical'
// 													height={500}
// 													objectFit='fill'
// 													src={
// 														repoIssue.author?.avatarUrl
// 															? repoIssue.author.avatarUrl
// 															: repoIssue.url
// 													}
// 													priority
// 													quality={100}
// 												/>
// 											</div>
// 											<>
// 												<div className='min-w-0 flex-1'>
// 													<p className='text-sm font-medium text-gray-50'>
// 														{repoIssue.title ?? ' '}
// 													</p>
// 													<h2
// 														id={
// 															'reply-' + repoIssue.author?.login
// 																? repoIssue.author?.login ?? ''
// 																: ''
// 														}
// 														className='text-base font-medium text-gray-50 flex-row'
// 													>
// 														<p className='text-base font-bold tracking-wide text-gray-50 flex-row'>
// 															{repoIssue.author?.login}
// 														</p>
// 													</h2>
// 												</div>
// 											</>
// 										</div>
// 										<p className='text-base font-medium text-purple-0 mt-4'></p>
// 										<blockquote className='mt-2 text-sm text-gray-200 space-y-4'>
// 											<TextEnhancer
// 												textToTransform={repoIssueBodyConditional}
// 											/>
// 											<figcaption className='mt-3 flex text-sm'>
// 												<span className='ml-2 inline-flex'>
// 													{repoIssue.updatedAt ? (
// 														<ThreadTime
// 															time={
// 																new Date(
// 																	repoIssue.updatedAt ?? fallbackDate
// 																)
// 															}
// 														/>
// 													) : (
// 														<ThreadTime
// 															time={
// 																new Date(
// 																	repoIssue.createdAt ?? fallbackDate
// 																)
// 															}
// 														/>
// 													)}
// 												</span>
// 												<div>
// 													<IssueCommentsExcisedTemplate
// 														comments={repoIssue.comments}
// 													/>
// 												</div>
// 											</figcaption>
// 										</blockquote>
// 									</div>
// 								</>
// 							</div>
// 						</>
// 					) : (
// 						<></>
// 					);
// 				}
// 			)
// 		) : (
// 			<></>
// 		)}
// 	</>
// );
