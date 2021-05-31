import { AgnosticRepoTemplate, Container } from '../UI';
import { GitHub } from '../UI/Icons';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import {
	Maybe,
	GitHubLanguagePartialFragment
} from '@/graphql/graphql';
import parser from 'html-react-parser';

export type IRepoConstituents = {
	login?: string;
};

export type IRepo = Partial<{
	description: Maybe<string> | undefined;
	url: any;
	createdAt?: any;
	updatedAt?: any;
	name: string;
	stargazerCount?: number;
	nameWithOwner?: string;
	openGraphImageUrl: string;
	id: string;
	forkCount?: number;
	primaryLanguage:
		| GitHubLanguagePartialFragment
		| undefined
		| null;
}>;

export type Repooo = {
	repo: IRepo;
};
export default function RepoCards({ repo }: Repooo) {
	const newDateCreated = new Date(repo.createdAt);
	const newDateUpdated = new Date(repo.updatedAt);
	const txtFeed = repo.description
		? (repo.description as string)
		: repo.url;
	const txt = parser(`${txtFeed}`);

	return (
		<Container className='transition-transform transform-gpu duration-150 max-w-4xl ring-1 ring-purple-0'>
			<AgnosticRepoTemplate
				source_icon={
					<GitHub className='text-gray-200 fill-current' />
				}
				stars={repo.stargazerCount ?? 0}
				key={repo.id}
				repo_user_name={repo.name ?? ''}
				repo_user_created_timestamp={newDateCreated}
				repo_user_updated_timestamp={newDateUpdated}
				repo_user_avatar={repo.openGraphImageUrl}
				primaryLanguage={
					repo!.primaryLanguage ? repo.primaryLanguage : null
				}
				repo_user_fallback_avatar={'/doge-404.jpg'}
				repo_user_content={`${txt as string}`}
				forks={repo.forkCount ?? 0}
			>
				<div className='rounded-full '>
					<Image
						className='object-cover'
						loader={ImageLoader}
						width='200'
						height='200'
						quality={100}
						alt={repo.name}
						src={repo.openGraphImageUrl ?? '/doge-404.jpg'}
					/>
				</div>
			</AgnosticRepoTemplate>
		</Container>
	);
}
