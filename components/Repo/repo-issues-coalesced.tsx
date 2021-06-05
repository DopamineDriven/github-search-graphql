import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import {
	GetFineDetailsByRepoDocument,
	useGetFineDetailsByRepoQuery
} from '@/graphql/graphql';
import {
	Container,
	Button,
	AgnosticRepoTemplate,
	CommentsSkeleton,
	LoadingSpinner
} from '../UI';
import { GitHub } from '../UI/Icons';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { RepoIssuesConnection } from './index';
import cn from 'classnames';
import Anchor from '../UI/Anchor/anchor';
import Link from 'next/link';
import type { RepoIssuesCoalescedProps } from './types';

const dynamicProps = {
	loading: () => <LoadingSpinner />
};

const ApolloError = dynamic(
	() => import('@/components/UI/ApolloError'),
	dynamicProps
);

export default function RepoIssuesCoalesced<
	P extends RepoIssuesCoalescedProps
>({ className, user, login, name, fallback }: P) {
	const fallbackDate = Date.now();
	const router = useRouter();
	const { query } = useRouter();
	console.log(
		'[login query params from repo coalesced component]: ',
		query.login ? query.login : '',
		'[login query params from repo coalesced component]: ',
		query.details ? query.details : ''
	);
	const { data, loading, error } =
		useGetFineDetailsByRepoQuery({
			query: GetFineDetailsByRepoDocument,
			variables: {
				login: (query.login as string)
					? (query.login as string)
					: login,
				name: (query.details as string)
					? (query.details as string)
					: name
			}
		});

	user = data?.user;
	const dataRepo = user?.repository;
	return (
		<Container
			className={cn(
				'mx-auto justify-center content-center font-sans w-full min-w-full inline-block py-12 px-12 max-w-8xl col-span-5',
				className
			)}
		>
			<Link
				passHref
				shallow={true}
				scroll={false}
				href={`/repos/[login]`}
				as={`${
					(('/repos/' + router.query.login) as string)
						? ((`/repos/` + router.query.login) as string)
						: `/repos/` + login
				}`}
			>
				<Button
					variant='slim'
					className='mx-auto transform-gpu rounded-xl my-4 justify-center px-4 py-2 bg-redditBG border-purple-900 border-2 hover:bg-redditSearch'
				>
					<Anchor
						className='mx-auto text-2xl text-gray-200 hover:text-gray-50 '
						onClick={() => router.back()}
					>
						Back to Repos
					</Anchor>
				</Button>
			</Link>

			{fallback === true ? (
				<CommentsSkeleton />
			) : loading && !error && !router.isFallback ? (
				<>
					<LoadingSpinner />
				</>
			) : error ? (
				<>
					<ApolloError error={error} />
				</>
			) : (
				<div className='my-2 max-w-8xl'>
					<AgnosticRepoTemplate
						primaryLanguage={dataRepo?.primaryLanguage}
						source_icon={
							<GitHub className='text-gray-200 fill-current' />
						}
						stars={dataRepo?.stargazerCount ?? 0}
						forks={dataRepo?.forkCount ?? 0}
						repo_user_name={dataRepo?.nameWithOwner ?? ''}
						repo_user_source_url={dataRepo?.homepageUrl ?? ''}
						repo_user_created_timestamp={
							new Date(dataRepo?.createdAt ?? fallbackDate)
						}
						repo_user_updated_timestamp={
							new Date(dataRepo?.updatedAt ?? fallbackDate)
						}
						repo_user_avatar={user?.avatarUrl}
						repo_user_fallback_avatar={'/doge-404.jpg'}
						repo_user_content={`${
							dataRepo?.description
								? (dataRepo.description as string)
								: ''
						}`}
					>
						<div className='rounded-xl flex-row'>
							<Image
								className='object-cover ring-2 ring-purple-0'
								loader={ImageLoader}
								width='350'
								height='200'
								quality={100}
								alt={dataRepo?.id.toString() ?? 'no user.name'}
								src={
									dataRepo?.openGraphImageUrl
										? dataRepo.openGraphImageUrl
										: '/doge-404.jpg'
								}
							/>
						</div>
						{dataRepo?.issues ? (
							<RepoIssuesConnection issues={dataRepo.issues} />
						) : (
							<></>
						)}
					</AgnosticRepoTemplate>
				</div>
			)}
			<Button
				variant='slim'
				className='mx-auto transform-gpu rounded-xl my-4 justify-center px-4 py-2 bg-redditBG border-purple-900 border-2 hover:bg-redditSearch'
			>
				<a
					className='mx-auto text-2xl text-gray-200 hover:text-gray-50 '
					onClick={() => router.back()}
				>
					Back to Repos
				</a>
			</Button>
		</Container>
	);
}
