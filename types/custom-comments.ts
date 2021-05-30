import { GitHubLanguagePartialFragment } from '../graphql/graphql';
/**
 * @interface CommenterProps
 */

export type Language = {
	name?: string;
	color?: string;
	id?: string | number;
};
export interface CommenterProps {
	commenter_name: string;
	commenter_first_name?: string;
	commenter_last_name?: string;
	commenter_source_url?: string;
	commenter_avatar?: string;
	commenter_fallback_avatar: string;
	commenter_created_timestamp: any;
	commenter_updated_timestamp?: any;
	commenter_content: string;
	primaryLanguage:
		| GitHubLanguagePartialFragment
		| undefined
		| null;
	forks: number;
	stars: number;
	source_icon?: React.ReactNode;
}

/**
 * @interface SubcommenterProps
 */

export interface SubcommenterProps {
	subcommenter_name?: string;
	subcommenter_first_name?: string;
	subcommenter_last_name?: string;
	subcommenter_source_url?: string;
	subcommenter_avatar?: string;
	subcommenter_fallback_avatar?: string;
	subcommenter_created_timestamp?: any;
	subcommenter_updated_timestamp?: any;
	subcommenter_content?: string;
	subcommenter_business_name?: string;
}

// export class UICustomComment {
// 	responder: SubcommenterProps;
// 	reviewer: CommenterProps;
// }
/**
 * @interface CommenterTemplateProps
 */

export interface UICustomComment
	extends CommenterProps,
		SubcommenterProps {}
