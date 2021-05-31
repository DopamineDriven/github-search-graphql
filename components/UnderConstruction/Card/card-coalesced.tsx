import { CardTemplate } from './card';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import {
	Issue,
	useGetIssuesMinimalQuery
} from '@/graphql/graphql';
import {
	CommentsSkeleton,
	Container,
	AgnosticRepoTemplate,
	TextEnhancer
} from '@/components/UI';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import { GitHub } from '@/components/UI/Icons';
import HTMLReactParser from 'html-react-parser';

export type IssueCardCoalescedProps = {
	login: string;
	className?: string;
};

const dynamicProps = {
	loading: () => <CommentsSkeleton />
};

const ApolloError = dynamic(
	() => import('@/components/UI/ApolloError'),
	dynamicProps
);

const IssueCardCoalesced = ({
	login
}: IssueCardCoalescedProps) => {
	const { data, loading, error } = useGetIssuesMinimalQuery({
		variables: {
			login
		}
	});
	const issueArrAssert = (data?.user?.issues?.nodes ??
		[]) as Issue[];

	const listIssues = issueArrAssert.map((issue, i) => {
		const parsed = HTMLReactParser(issue.bodyHTML);
		const AgnosticTemplate = (
			<Container>
				<AgnosticRepoTemplate
					primaryLanguage={issue.repository.primaryLanguage}
					forks={issue.repository.forkCount}
					source_icon={<GitHub />}
					stars={issue.repository.stargazerCount}
					key={i++}
					repo_user_name={'Active Issue'}
					repo_user_created_timestamp={issue.createdAt}
					repo_user_updated_timestamp={issue.updatedAt}
					repo_user_avatar={'/meta/android-chrome-192x192.png'}
					repo_user_fallback_avatar={
						'/meta/android-chrome-192x192.png'
					}
					repo_user_content={`${(
						<TextEnhancer
							textToTransform={
								(parsed as string) ?? issue.bodyHTML
							}
						/>
					)}`}
				>
					<Image
						className='object-cover'
						loader={ImageLoader}
						width='400'
						height='400'
						quality={100}
						alt={issue.title}
						src={'/doge-404.jpg'}
					/>
				</AgnosticRepoTemplate>
			</Container>
		);
		return AgnosticTemplate;
	});

	return (
		<Container className='font-sans text-lg text-gray-50 font-medium tracking-wide justify-between'>
			{loading ? (
				<CommentsSkeleton />
			) : !loading && error ? (
				<ApolloError error={error} />
			) : (
				<div className='container'>{listIssues}</div>
			)}
		</Container>
	);
};

// const CardCoalescence = () => {
// 	return <IssueCardCoalesced login={'DopamineDriven'} />;
// };
export default IssueCardCoalesced;
