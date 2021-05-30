# github-search-graphql

Next, TypeScript, GraphQL, Apollo Client, SWR, Codegen, Tailwindcss, OneGraph Integration

```graphql
fragment GitHubPageInfoPartial on PageInfo {
	startCursor
	endCursor
	hasNextPage
	hasPreviousPage
}

fragment GitHubLanguagePartial on Language {
	color
	id
	name
}

fragment GitHubRepoOwnerPartial on RepositoryOwner {
	avatarUrl(size: 12)
	id
	login
	url
}

fragment GitHubLanguagesPartial on LanguageConnection {
	totalSize
	totalCount
	pageInfo {
		...GitHubPageInfoPartial
	}
	edges {
		cursor
		size
		node {
			...GitHubLanguagePartial
		}
	}
}

fragment GitHubLicenseRulePartial on LicenseRule {
	key
	label
	description
}

fragment GitHubLicensePartial on License {
	id
	key
	nickname
	name
	spdxId
	pseudoLicense
	description
	url
	conditions {
		...GitHubLicenseRulePartial
	}
	limitations {
		...GitHubLicenseRulePartial
	}
	permissions {
		...GitHubLicenseRulePartial
	}
}

fragment GitHubRepositoryPartial on Repository {
	id
	name
	url
	shortDescriptionHTML
	descriptionHTML
	description
	createdAt
	updatedAt
	diskUsage
	homepageUrl
	stargazerCount
	forkCount
	openGraphImageUrl
	usesCustomOpenGraphImage
	isArchived
	isInOrganization
	watchers {
		totalCount
	}
	languages(orderBy: { field: SIZE, direction: DESC }) {
		...GitHubLanguagesPartial
	}
	licenseInfo {
		...GitHubLicensePartial
	}
	owner {
		...GitHubRepoOwnerPartial
	}
	primaryLanguage {
		...GitHubLanguagePartial
	}
}

fragment GitHubSearchResultItemConnectionPartial on SearchResultItemConnection {
	codeCount
	userCount
	issueCount
	repositoryCount
	pageInfo {
		...GitHubPageInfoPartial
	}
	edges {
		cursor
		node {
			...GitHubRepositoryPartial
		}
	}
}

query GitHubSearchRepos($query: String!, $first: Int!) {
	Search: search(
		first: $first
		query: $query
		type: REPOSITORY
	) {
		...GitHubSearchResultItemConnectionPartial
	}
}
```

`comment-fields.graphql`

```graphql
# import GitHubActorPartial from './actor-fields.graphql'
# import GitHubReactionConnectionPartial from './reaction-fields.graphql'
# import GitHubPageInfoPartial from './page-info-fields.graphql'

fragment GitHubDiscussionCommentPartial on GitHubDiscussionComment {
	id
	url
	isAnswer
	createdAt
	updatedAt
	upvoteCount
	body
	bodyHTML
	author {
		...GitHubActorPartial
	}
	reactions(first: 20) {
		...GitHubReactionConnectionPartial
	}
}

fragment GitHubDiscussionCommentsPartial on GitHubDiscussionCommentConnection {
	edges {
		cursor
		node {
			...GitHubDiscussionCommentPartial
		}
	}
	totalCount
	pageInfo {
		...GitHubPageInfoPartial
	}
}
```

`category-fields.graphql`

```graphql
fragment GitHubDiscussionsCategory on GitHubDiscussionCategory {
	id
	name
	emojiHTML
	emoji
	createdAt
	updatedAt
	isAnswerable
	description
}
```

`discussion-fields.graphql`

```graphql
# import GitHubActorPartial from './atomic/actor-fields.graphql'
# import GitHubDiscussionCommentsPartial from './atomic/comment-fields.graphql'
# import GitHubDiscussionCommentPartial from './atomic/comment-fields.graphql'
# import GitHubDiscussionsCategory from './atomic/category-fields.graphql'
# import GitHubReactionConnectionPartial from './atomic/reaction-fields.graphql'
# import GitHubPageInfoPartial from './atomic/page-info-fields.graphql'

fragment GitHubDiscussionPartial on GitHubDiscussion {
	id
	url
	number
	title
	upvoteCount
	createdAt
	includesCreatedEdit
	updatedAt
	body
	bodyHTML
	answer {
		...GitHubDiscussionCommentPartial
	}
	author {
		...GitHubActorPartial
	}
	category {
		...GitHubDiscussionsCategory
	}
	reactions(first: 20) {
		...GitHubReactionConnectionPartial
	}
	comments(first: 10) {
		...GitHubDiscussionCommentsPartial
	}
}

fragment GitHubDiscussionsPartial on GitHubDiscussionConnection {
	totalCount
	pageInfo {
		...GitHubPageInfoPartial
	}
	edges {
		cursor
		node {
			...GitHubDiscussionPartial
		}
	}
}
```

```bash
Found 14 unused files:
components/Context/index.tsx
components/Landing/Card/card-coalesced.tsx
components/Landing/Pagination/index.ts
components/Landing/index.ts
components/Layout/Featurebar/featurebar.module.css
components/Layout/Featurebar/featurebar.tsx
components/Layout/Featurebar/index.ts
components/Layout/Header/header.tsx
components/Layout/Header/index.ts
components/Layout/Search/index.ts
components/Layout/Search/search.tsx
lib/colors.ts
lib/fetchers.ts
lib/helpers/filter-query.ts
```
