import {
	Maybe,
	Repository,
	GitHubLanguagePartialFragment
} from 'graphql/graphql';

export type Repo = {
	repository: Maybe<
		{ __typename?: 'Repository' } & Pick<
			Repository,
			| 'id'
			| 'url'
			| 'nameWithOwner'
			| 'description'
			| 'name'
			| 'createdAt'
			| 'updatedAt'
			| 'homepageUrl'
			| 'stargazerCount'
			| 'forkCount'
			| 'openGraphImageUrl'
			| 'isArchived'
			| 'isInOrganization'
		> & {
				primaryLanguage?: Maybe<
					{
						__typename?: 'Language';
					} & GitHubLanguagePartialFragment
				>;
			}
	>;
};
