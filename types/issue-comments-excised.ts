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
	Bot,
	Issue,
	IssueConnection
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

export type IssueType = {
	issues?: { __typename?: 'IssueConnection' } & Pick<
		IssueConnection,
		'totalCount'
	> & {
			pageInfo: {
				__typename?: 'PageInfo';
			} & GitHubPageInfoPartialFragment;
			nodes?: Maybe<
				Array<
					Maybe<
						{ __typename?: 'Issue' } & Pick<
							Issue,
							| 'id'
							| 'url'
							| 'bodyUrl'
							| 'number'
							| 'title'
							| 'body'
							| 'bodyText'
							| 'state'
							| 'bodyHTML'
							| 'createdAt'
							| 'updatedAt'
						> & {
								author?: Maybe<
									| ({ __typename?: 'Bot' } & Pick<
											Bot,
											'url' | 'login' | 'avatarUrl'
									  >)
									| ({
											__typename?: 'EnterpriseUserAccount';
									  } & Pick<
											EnterpriseUserAccount,
											'url' | 'login' | 'avatarUrl'
									  >)
									| ({ __typename?: 'Mannequin' } & Pick<
											Mannequin,
											'url' | 'login' | 'avatarUrl'
									  >)
									| ({ __typename?: 'Organization' } & Pick<
											Organization,
											'url' | 'login' | 'avatarUrl'
									  >)
									| ({ __typename?: 'User' } & Pick<
											User,
											'url' | 'login' | 'avatarUrl'
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
														'content'
													>
												>
											>
										>;
									};
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
															} & Pick<
																ReactionConnection,
																'totalCount'
															> & {
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
							}
					>
				>
			>;
		};
};
