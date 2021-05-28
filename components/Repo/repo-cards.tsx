import {
	AgnosticCommentThread,
	Container,
	TextEnhancer
} from '../UI';
import { GitHub } from '../UI/Icons';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import { Maybe } from '../../graphql/graphql';
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
}>;
export type Repooo = {
	repo: IRepo;
};
export default function RepoCards({ repo }: Repooo) {
	const newDateCreated = new Date(repo.createdAt);
	const newDateUpdated = new Date(repo.updatedAt);

	const txt = parser(repo.description ?? repo.url);
	return (
		<Container className='hover:bg-opacity-50 transition-transform transform-gpu duration-150'>
			<AgnosticCommentThread
				source_icon={<GitHub className='text-white' />}
				stars={repo.stargazerCount ?? 0}
				key={repo.id}
				commenter_name={repo.name ?? ''}
				commenter_created_timestamp={newDateCreated}
				commenter_updated_timestamp={newDateUpdated}
				commenter_avatar={repo.openGraphImageUrl}
				commenter_fallback_avatar={'/doge-404.jpg'}
				commenter_content={`${(
					<TextEnhancer
						textToTransform={(txt as string) ?? ''}
					/>
				)}`}
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
			</AgnosticCommentThread>
		</Container>
	);
}
