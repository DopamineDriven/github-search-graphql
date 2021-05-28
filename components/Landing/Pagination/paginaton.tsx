import { useState } from 'react';
import { CardTemplate } from '../Card/card';
import SearchForm from '../search-form';
import PaginationControls from './controls';
import { IssueFinderProps } from '../landing';
import {
	Container,
	CommentsSkeleton
} from '@/components/UI';
import {
	Issue,
	useGetIssuesMinimalPaginationQuery
} from '@/graphql/graphql';
import dynamic from 'next/dynamic';

const dynamicProps = {
	loading: () => <CommentsSkeleton />
};

const ApolloError = dynamic(
	() => import('@/components/UI/ApolloError'),
	dynamicProps
);

export type CursorStateProps = {
	before?: string | null;
	after?: string | null;
};

export default function IssueFinder({
	login,
	className
}: IssueFinderProps) {
	const [cursorState, setCursorState] =
		useState<CursorStateProps>();
	const { data, loading, error } =
		useGetIssuesMinimalPaginationQuery({
			variables: {
				login,
				...[cursorState]
			}
		});

	const pageInfo = data?.user?.issues?.pageInfo;
	const issues = (data?.user?.issues ?? []) as Issue[];

	const onPrevious = () =>
		setCursorState({ before: pageInfo?.startCursor });
	const onNext = () =>
		setCursorState({ after: pageInfo?.endCursor });

	const issuesList = issues.map((x: Issue) => (
		<CardTemplate key={x.id} issue={issues[0]} />
	));
	const Controls = (
		<PaginationControls
			{...pageInfo}
			onPrevious={onPrevious}
			onNext={onNext}
		/>
	);
	return (
		<>
			{loading ? (
				<CommentsSkeleton />
			) : !loading && error ? (
				<ApolloError error={error} />
			) : (
				<Container className={className}>
					<div className=''>
						{[...Array(issuesList).values()]}
					</div>
					{Controls}
				</Container>
			)}
		</>
	);
}
