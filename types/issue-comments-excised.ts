import {
	IssueComment,
	IssueCommentConnection,
	EnterpriseUserAccount,
	Mannequin,
	Organization,
	User,
	ReactionConnection,
	GitHubPageInfoPartialFragment,
	Maybe,
	Reaction,
	Bot
} from '@/graphql/graphql';

export type IssueCommentsExcised = {
	comments: {
		__typename?: 'IssueCommentConnection';
	} & Pick<IssueCommentConnection, 'totalCount'> & {
			pageInfo: {
				__typename?: 'PageInfo';
			} & GitHubPageInfoPartialFragment;
			nodes?: Maybe<
				Array<
					Maybe<
						{ __typename?: 'IssueComment' } & Pick<
							IssueComment,
							'bodyText' | 'createdAt' | 'updatedAt'
						> & {
								author?: Maybe<
									| ({ __typename?: 'Bot' } & Pick<
											Bot,
											'avatarUrl' | 'login' | 'url'
									  >)
									| ({
											__typename?: 'EnterpriseUserAccount';
									  } & Pick<
											EnterpriseUserAccount,
											'avatarUrl' | 'login' | 'url'
									  >)
									| ({ __typename?: 'Mannequin' } & Pick<
											Mannequin,
											'avatarUrl' | 'login' | 'url'
									  >)
									| ({
											__typename?: 'Organization';
									  } & Pick<
											Organization,
											'avatarUrl' | 'login' | 'url'
									  >)
									| ({ __typename?: 'User' } & Pick<
											User,
											'avatarUrl' | 'login' | 'url'
									  >)
								>;
								reactions: {
									__typename?: 'ReactionConnection';
								} & Pick<ReactionConnection, 'totalCount'> & {
										pageInfo: {
											__typename?: 'PageInfo';
										} & GitHubPageInfoPartialFragment;
										nodes?: Maybe<
											Array<
												Maybe<
													{ __typename?: 'Reaction' } & Pick<
														Reaction,
														'content' | 'createdAt'
													> & {
															user?: Maybe<
																{ __typename?: 'User' } & Pick<
																	User,
																	| 'login'
																	| 'avatarUrl'
																	| 'twitterUsername'
																	| 'url'
																>
															>;
														}
												>
											>
										>;
									};
							}
					>
				>
			>;
		};
};
