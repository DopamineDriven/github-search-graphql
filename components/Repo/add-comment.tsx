import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { update } from 'lodash';
import { ImageLoader } from '@/lib/image-loader';
import ActionForm from './action-form';
import Image from 'next/image';
import cn from 'classnames';
import parser from 'html-react-parser';
import {
	IssueState,
	Issue,
	IssueComment,
	GetFineDetailsByRepoQueryVariables,
	GetFineDetailsByRepoDocument,
	useAddCommentMutation,
	AddCommentMutationVariables,
	AddCommentMutation,
	UserConnection,
	GetFineDetailsByRepoQuery,
	useCloseIssueMutation,
	useReopenIssueMutation
} from '@/graphql/graphql';
import {
	TextEnhancer,
	Anchor,
	Button,
	Container,
	ApolloError
} from '../UI';

export type IssueProps = Issue & { queryVariables: {} };

export interface AddCommentMutationBatched
	extends AddCommentMutationVariables,
		AddCommentMutation {
	className?: string;
	user: GetFineDetailsByRepoQuery['user'];
}

const AddCommentTemplate: FC<AddCommentMutationBatched> = ({
	issueId,
	body,
	addComment,
	className,
	user
}) => {
	const id = user?.id;
	const repository = user?.repository
		? user.repository
		: user?.repository!;

	const variables = {
		issueId: id!
	};
	const node = user?.repository?.issues?.nodes || [];

	const [owner, name] = repository.nameWithOwner.split('/');

	const [isWriting, setIsWriting] = useState(false);

	const [closeIssue, { loading: isClosing }] =
		useCloseIssueMutation({
			variables
		});

	const [reopenIssue, { loading: isReopening }] =
		useReopenIssueMutation({
			variables
		});

	const {
		query: { login, details }
	} = useRouter();

	const [
		addCommentFunction,
		{
			loading: isAddingCommentLoading,
			error: isAddingCommentError,
			data: isAddingCommentData
		}
	] = useAddCommentMutation({
		update: (cache, result) => {
			const data = cache.readQuery<
				GetFineDetailsByRepoQuery,
				GetFineDetailsByRepoQueryVariables
			>({
				query: GetFineDetailsByRepoDocument,
				variables: {
					login: login as string,
					name: details as string
				}
			});
			user = data?.user;
			if (user?.repository?.issues?.nodes?.length) {
				return;
			}

			const index = (
				user?.repository?.issues?.nodes || []
			).findIndex(x => x?.id === id);

			addComment = isAddingCommentData?.addComment
				? isAddingCommentData.addComment
				: {};

			const updated = update(
				data as {},
				`user.repository.issues.nodes.${index}.comments.nodes`,
				(comments: IssueComment[]) => [
					result?.data?.addComment?.commentEdge?.node?.id,
					...comments
				]
			);

			cache.writeQuery<
				GetFineDetailsByRepoQuery,
				GetFineDetailsByRepoQueryVariables
			>({
				query: GetFineDetailsByRepoDocument,
				variables:
					{
						login: login as string,
						name: details as string
					} ?? {},
				data: updated
			});
		}
	});
	const onSubmit = () => {
		addCommentFunction({
			variables: {
				issueId,
				body
			}
		});
	};

	return (
		<>
			{node.map((d, i) => {
				const isOpen = d?.state === IssueState.Open;
				const isClosed = d?.state === IssueState.Closed;
				const isChangingState = isClosing || isReopening;
				const parseD = parser((d?.bodyHTML as string) ?? '');
				const textHTML = parseD as string;

				return (
					<div key={i++}>
						{d?.__typename !== 'Issue' ? (
							<></>
						) : isAddingCommentError ? (
							<>
								<ApolloError error={isAddingCommentError} />
							</>
						) : (
							<Container
								className={cn(
									'font-sans text-gray-300 text-sm',
									className
								)}
								clean
							>
								<div>
									<div className='mx-auto p-2'>
										<Image
											loader={ImageLoader}
											src={d?.author?.avatarUrl}
											width={250}
											height={250}
											className='rounded-full'
											priority
										/>
									</div>
									<div className=''>
										<h3>{d?.title}</h3>
										<div className=''>
											<Anchor
												href={d?.url}
												target='__blank'
												variant='slim'
											>
												{repository.nameWithOwner ??
													'no name with owner'}{' '}
											</Anchor>
											<span>{d?.participants.totalCount ?? 0}</span>
											<span>{d?.comments.totalCount ?? 0}</span>
										</div>
										<div className=''>
											{isOpen && (
												<Button
													variant='slim'
													disabled={isChangingState}
													onClick={() => closeIssue()}
												>
													Close Issue
												</Button>
											)}
											{isClosed && (
												<Button
													variant='slim'
													disabled={isChangingState}
													onClick={() => reopenIssue()}
												>
													Reopen Issue
												</Button>
											)}
											<Button
												variant='slim'
												onClick={() => setIsWriting(!isWriting)}
											>
												{!isWriting ? 'Write Comment' : 'Hide Form'}
											</Button>
										</div>
									</div>
								</div>
								<TextEnhancer textToTransform={`${textHTML}`} />
								<div />
								<ActionForm
									show={isWriting}
									onSubmit={onSubmit}
									isLoading={isAddingCommentLoading}
								/>
							</Container>
						)}
					</div>
				);
			})}
		</>
	);
};

export default AddCommentTemplate;
