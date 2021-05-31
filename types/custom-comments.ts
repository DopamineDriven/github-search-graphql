import { GitHubLanguagePartialFragment } from '../graphql/graphql';
/**
 * @interface RepoOverviewProps
 */

export type Language = {
	name?: string;
	color?: string;
	id?: string | number;
};
export interface RepoOverviewProps {
	repo_user_name: string;
	repo_user_first_name?: string;
	repo_user_last_name?: string;
	repo_user_source_url?: string;
	repo_user_avatar?: string;
	repo_user_fallback_avatar: string;
	repo_user_created_timestamp: any;
	repo_user_updated_timestamp?: any;
	repo_user_content: string;
	primaryLanguage:
		| GitHubLanguagePartialFragment
		| undefined
		| null;
	forks: number;
	stars: number;
	source_icon?: React.ReactNode;
}

/**
 * @interface SubRepoOverviewProps
 */

export interface SubRepoOverviewProps {
	subrepo_user_name?: string;
	subrepo_user_first_name?: string;
	subrepo_user_last_name?: string;
	subrepo_user_source_url?: string;
	subrepo_user_avatar?: string;
	subrepo_user_fallback_avatar?: string;
	subrepo_user_created_timestamp?: any;
	subrepo_user_updated_timestamp?: any;
	subrepo_user_content?: string;
	subrepo_user_business_name?: string;
}

/**
 * @interface AgnosticRepoTemplateProps
 */

export interface AgnosticRepoTemplateProps
	extends RepoOverviewProps,
		SubRepoOverviewProps {}
