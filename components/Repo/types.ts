import {
	GetFineDetailsByRepoQuery,
	GetFineDetailsByRepoQueryVariables
} from '@/graphql/graphql';
import {
	IssueCommentsExcised,
	IssueType
} from '@/types/issue-comments-excised';

export interface RepoIssuesCoalescedProps
	extends GetFineDetailsByRepoQuery,
		GetFineDetailsByRepoQueryVariables {
	className?: string;
	fallback?: boolean;
}

export interface IssueCommentsExcisedTemplateProps
	extends IssueCommentsExcised {
	className?: string;
}

export interface RepoIssuesConnectionProps
	extends IssueType {
	className?: string;
}
