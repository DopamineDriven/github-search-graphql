import {
	Maybe,
	PinnableItemConnection,
	GitHubPinnableItemPartialFragment,
	GitHubPageInfoPartialFragment
} from '@/graphql/graphql';
import Link from 'next/link';
import { GitHubGrabber } from '../UI/Icons';
import cn from 'classnames';
import {
	Container,
	AgnosticRepoTemplate,
	Button
} from '../UI';

export type PinnedCardProps = {
	pinnedItems: {
		__typename?: 'PinnableItemConnection';
	} & Pick<PinnableItemConnection, 'totalCount'> & {
			pageInfo: {
				__typename?: 'PageInfo';
			} & GitHubPageInfoPartialFragment;
			nodes?: Maybe<
				Array<Maybe<GitHubPinnableItemPartialFragment>>
			>;
		};
};

export interface PinnedCardInterface
	extends PinnedCardProps {
	className?: string;
	avatarUrl?: string;
}

export default function PinnedCards({
	pinnedItems,
	className,
	avatarUrl
}: PinnedCardInterface) {
	const fallbackDate = Date.now();
	return (
		<Container
			className={cn(
				'justify-center content-center font-sans w-full min-w-full grid grid-cols-2 py-6 px-3 space-x-6 max-w-3xl fit select-none',
				className
			)}
		>
			{pinnedItems?.nodes && pinnedItems.nodes.length > 0 ? (
				pinnedItems.nodes.map((repo, i) => {
					return repo?.__typename === 'Repository' ? (
						<div key={i++} className='my-2 max-w-2xl flex-0'>
							<AgnosticRepoTemplate
								primaryLanguage={repo?.primaryLanguage}
								source_icon={
									<GitHubGrabber className='text-gray-200 fill-current w-5 h-5 cursor-move' />
								}
								stars={repo.stargazerCount ?? 0}
								forks={repo.forkCount ?? 0}
								repo_user_name={repo.nameWithOwner ?? ''}
								repo_user_source_url={repo.homepageUrl ?? ''}
								repo_user_created_timestamp={
									new Date(repo.createdAt ?? fallbackDate)
								}
								repo_user_updated_timestamp={
									new Date(repo.updatedAt ?? fallbackDate)
								}
								repo_user_avatar={avatarUrl ?? ''}
								repo_user_fallback_avatar={'/doge-404.jpg'}
								repo_user_content={`${
									repo.description
										? (repo.description as string)
										: ''
								}`}
							>
								<div className='rounded-full inline-flex min-w-full'>
									<Link
										href={`/repos/[login]/[details]`}
										as={`/repos/${repo.nameWithOwner}`}
										passHref
										shallow={true}
										scroll={true}
									>
										<a>
											<Button
												className='bg-redditBG border-2 border-purple-900 w-auto rounded-xl inline-flex justify-start align-top mx-10 my-14 text-center text-gray-300 hover:bg-redditSearch hover:text-gray-50 duration-150 ease-out transition-transform transform-gpu'
												variant='slim'
											>
												Details
											</Button>
										</a>
									</Link>
								</div>
							</AgnosticRepoTemplate>
						</div>
					) : (
						<></>
					);
				})
			) : (
				<></>
			)}
		</Container>
	);
}
