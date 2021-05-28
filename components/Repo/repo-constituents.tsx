import { GitHubRepositoryPartialFragment } from '@/graphql/graphql';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import parser from 'html-react-parser';
import { TextEnhancer } from '../UI';
import { Repository, Maybe } from '../../graphql/graphql';

export type IRepoConstituents = {
	login?: string;
};

export type IRepo = Partial<{
	description: Maybe<string> | undefined;
	url: any;
	name: string;
	openGraphImageUrl: string;
	id: string;
}>;

export type Repooo = {
	repo: IRepo;
};
export default function RepoConstituents({ repo }: Repooo) {
	const txt = parser(repo.description ?? repo.url);
	return (
		<ul
			className='divide-y divide-purple-700 max-w-7xl mx-auto px-2 sm:px-1 lg:px-0'
			key={repo.id}
		>
			<li className='max-w-4xl mx-auto'>
				<div className='px-4 py-4 sm:px-6'>
					<div className='flex items-center justify-between'>
						<a
							className='text-sm font-medium text-secondary-0 truncate no-underline hover:text-olive-400 duration-150 transition-colors'
							href={repo.url}
							target='__blank'
						>
							<span className='sr-only'>{`link to ${repo.name}, an open issue in ${repo.name}'s repository `}</span>
							{repo.description ? repo.description : ''}
						</a>
						<div className='ml-2 flex-shrink-0 flex'>
							<p className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-0 text-redditSearch'></p>
						</div>
					</div>
					<div className='mt-2 sm:flex sm:justify-between'>
						<div className='sm:flex'>
							<p className='flex items-center text-sm text-gray-100'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									aria-hidden='true'
									className='flex-shrink-0 h-5 w-5 text-gray-100'
								>
									<line x1='12' y1='1' x2='12' y2='23'></line>
									<path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
								</svg>
								<TextEnhancer textToTransform={txt as string} />{' '}
							</p>
						</div>
						<div className='mt-2 flex items-center text-sm text-gray-100 sm:mt-0'>
							<svg
								className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-100'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								aria-hidden='true'
							>
								<path
									fillRule='evenodd'
									d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
									clipRule='evenodd'
								/>
							</svg>
							<Image
								className='object-cover'
								loader={ImageLoader}
								width='400'
								height='400'
								quality={100}
								alt={'/doge-404.jpg' ?? repo.id}
								src={
									repo.openGraphImageUrl
										? repo.openGraphImageUrl
										: '/doge-404.jpg'
								}
							/>
						</div>
					</div>
				</div>
			</li>
		</ul>
	);
}
