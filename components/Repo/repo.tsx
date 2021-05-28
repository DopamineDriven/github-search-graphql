import { FC, useState } from 'react';
import {
	useViewerReposQuery,
	ViewerReposQuery,
	Repository
} from '@/graphql/graphql';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import parser from 'html-react-parser';
import { TextEnhancer, LoadingSpinner } from '../UI';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import RepoConstituents from './repo-constituents';
import Link from 'next/link';
import { Container, Anchor } from '@/components/UI';
import RepoCards from './repo-cards';
export type ViewerRepoQueryProps = {
	className?: string;
	viewer: ViewerReposQuery['viewer'];
};

const dynamicProps = {
	loading: () => <LoadingSpinner />
};

const ApolloError = dynamic(
	() => import('@/components/UI/ApolloError'),
	dynamicProps
);

const ReposCoalesced = ({
	viewer,
	className
}: ViewerRepoQueryProps) => {
	const { data, loading, error } = useViewerReposQuery();
	data ? data.viewer === viewer : '';
	return (
		<Container
			className={cn(
				className,
				' bg-gray-50 shadow overflow-hidden sm:rounded-md w-full min-w-full max-w-4xl transform-gpu transition-colors hover:bg-redditBG'
			)}
		>
			{error ? (
				<>
					<ApolloError error={error} />
				</>
			) : loading && !error ? (
				<LoadingSpinner />
			) : data?.viewer?.repositories.nodes &&
			  data.viewer.repositories.nodes.length > 0 ? (
				data.viewer.repositories.nodes.map((repo, i) => {
					const txt = parser(
						repo?.description ? repo.description : ''
					);
					console.log(repo?.nameWithOwner);
					return repo ? (
						<Container
							key={++i}
							clean
							className={cn(
								className,
								'mx-auto flex-col font-sans text-olive-300 max-w-7xl sm:px-4'
							)}
						>
							<h3 className='font-medium text-2xl py-2 lg:py-4 tracking-wide h-full'>
								{repo.nameWithOwner}
							</h3>
							<Link
								passHref
								href={`/repo/[name]`}
								as={`/repo/${encodeURIComponent(repo.name)}`}
								shallow={true}
							>
								<Anchor
									className='block hover:bg-opacity-50 transition-transform transform-gpu duration-150'
									key={i++}
								>
									<RepoCards repo={repo} />
								</Anchor>
							</Link>
						</Container>
					) : (
						<></>
					);
				})
			) : (
				<></>
			)}
		</Container>
	);
};

export default ReposCoalesced;
