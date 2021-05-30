import { Container, Fallback } from '@/components/UI';
import { GitHub } from '@/components/UI/Icons';
import dynamic from 'next/dynamic';
import CommentsSkeleton from '../UI/CommentsSkeleton/comments-skeleton';
import { useGetIssuesMinimalQuery } from '@/graphql/graphql';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import cn from 'classnames';
import parser from 'html-react-parser';
import AgnosticCommentThread from '../UI/AgnosticCommentThread/agnostic-thread';
import { fromUnixTime } from 'date-fns';

export type IssueFinderProps = {
	login: string;
	className?: string;
};

const dynamicProps = {
	loading: () => <Fallback />
};

const ApolloError = dynamic(
	() => import('../UI/ApolloError'),
	dynamicProps
);

const IssueFinder = ({
	login,
	className
}: IssueFinderProps) => {
	const { data, loading, error } = useGetIssuesMinimalQuery({
		variables: {
			login
		}
	});

	const AgnosticTemplate = (
		<Container>
			{data?.user?.issues?.nodes &&
			data.user.issues.nodes.length > 0 ? (
				data.user.issues.nodes.map((usr, i) => {
					const getTime = Date.now();

					return usr ? (
						<AgnosticCommentThread
							forks={usr.repository.forkCount}
							source_icon={<GitHub />}
							stars={usr.repository.stargazerCount}
							key={usr.id}
							commenter_name={'Active Issue'}
							commenter_created_timestamp={fromUnixTime(
								getTime.valueOf()
							)}
							commenter_avatar={'/meta/android-chrome-192x192.png'}
							commenter_fallback_avatar={
								'/meta/android-chrome-192x192.png'
							}
							commenter_content={`${
								++i + ':' + parser(usr.bodyHTML ?? '')
							}`}
						>
							<Image
								className='object-cover  backdrop-blur-3xl'
								loader={ImageLoader}
								width='400'
								height='400'
								quality={100}
								alt={data?.user?.login ? data.user.login : ''}
								src={
									data?.user?.avatarUrl
										? data.user.avatarUrl
										: '/architecture.jpg'
								}
							/>
						</AgnosticCommentThread>
					) : (
						<></>
					);
				})
			) : (
				<></>
			)}
		</Container>
	);

	const issueTemplateComponent = (
		<div
			className={cn(
				className,
				' bg-redditNav shadow overflow-hidden sm:rounded-md w-full min-w-full max-w-4xl transform-gpu transition-colors hover:bg-redditBG'
			)}
		>
			{data?.user?.issues?.nodes &&
			data.user.issues.nodes.length > 0 ? (
				data.user.issues.nodes.map((issue, i) => {
					return issue ? (
						<ul
							className='divide-y divide-gray-200 max-w-7xl mx-auto px-2 sm:px-1 lg:px-0'
							key={issue.id}
						>
							<li className='max-w-4xl mx-auto'>
								<div className='px-4 py-4 sm:px-6'>
									<div className='flex items-center justify-between'>
										<a
											className='text-sm font-medium text-secondary-0 truncate no-underline hover:text-olive-400 duration-150 transition-colors'
											href={issue.url}
											target='__blank'
										>
											<span className='sr-only'>{`link to ${issue.title}, an open issue in ${issue.author?.login}'s repository `}</span>
											{issue.repository.nameWithOwner
												? issue.repository.nameWithOwner
												: ''}
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
												{++i + ':' + parser(issue.bodyHTML ?? '')}
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
										</div>
									</div>
									<Image
										className='object-cover  backdrop-blur-3xl'
										loader={ImageLoader}
										width='400'
										height='400'
										quality={100}
										alt={data?.user?.login ? data.user.login : ''}
										src={
											data?.user?.avatarUrl
												? data.user.avatarUrl
												: '/architecture.jpg'
										}
									/>
								</div>
							</li>
						</ul>
					) : (
						<></>
					);
				})
			) : (
				<></>
			)}
		</div>
	);
	return (
		<>
			{error ? (
				<ApolloError error={{ ...error }} />
			) : loading && !error ? (
				<CommentsSkeleton />
			) : (
				<Container clean className={cn(className)}>
					{issueTemplateComponent}
					{AgnosticTemplate}
				</Container>
			)}
		</>
	);
};
// const landing = () => {
// 	return <IssueFinder login={'DopamineDriven'} />;
// };
export default IssueFinder;
