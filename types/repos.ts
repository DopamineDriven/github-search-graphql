import {
	RepoPartialFragment,
	RepositoryConnection,
	GitHubPageInfoPartialFragment,
	RepositoryEdge,
	Maybe,
	CommitCommentConnection,
	CommitComment,
	EnterpriseUserAccount,
	Mannequin,
	Organization,
	User,
	Bot
} from '@/graphql/graphql';

export type RepoExcised = {
	repositories: {
		__typename?: 'RepositoryConnection';
	} & Pick<RepositoryConnection, 'totalCount'> & {
			pageInfo: {
				__typename?: 'PageInfo';
			} & GitHubPageInfoPartialFragment;
			edges?: Maybe<
				Array<
					Maybe<
						{ __typename?: 'RepositoryEdge' } & Pick<
							RepositoryEdge,
							'cursor'
						> & {
								node?: Maybe<
									{ __typename?: 'Repository' } & {
										commitComments: {
											__typename?: 'CommitCommentConnection';
										} & Pick<
											CommitCommentConnection,
											'totalCount'
										> & {
												pageInfo: {
													__typename?: 'PageInfo';
												} & GitHubPageInfoPartialFragment;
												nodes?: Maybe<
													Array<
														Maybe<
															{ __typename?: 'CommitComment' } & Pick<
																CommitComment,
																| 'body'
																| 'bodyText'
																| 'bodyHTML'
																| 'id'
																| 'createdAt'
															> & {
																	author?: Maybe<
																		| ({ __typename?: 'Bot' } & Pick<
																				Bot,
																				'login' | 'avatarUrl' | 'url'
																		  >)
																		| ({
																				__typename?: 'EnterpriseUserAccount';
																		  } & Pick<
																				EnterpriseUserAccount,
																				'login' | 'avatarUrl' | 'url'
																		  >)
																		| ({ __typename?: 'Mannequin' } & Pick<
																				Mannequin,
																				'login' | 'avatarUrl' | 'url'
																		  >)
																		| ({
																				__typename?: 'Organization';
																		  } & Pick<
																				Organization,
																				'login' | 'avatarUrl' | 'url'
																		  >)
																		| ({ __typename?: 'User' } & Pick<
																				User,
																				'login' | 'avatarUrl' | 'url'
																		  >)
																	>;
																}
														>
													>
												>;
											};
									} & RepoPartialFragment
								>;
							}
					>
				>
			>;
		};
};
