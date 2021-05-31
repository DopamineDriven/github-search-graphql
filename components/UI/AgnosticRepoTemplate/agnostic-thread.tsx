import { CommenterTemplate } from './RepoTopTemplate';
import { SubcommentTemplate } from './SubRepoTemplate';
import { FC } from 'react';
import type { AgnosticRepoTemplateProps } from '@/types/custom-comments';

/**
 * A reusable, provider agnostic, UI template intended for
 * feeds. Features a conditionally rendered embedded
 * User sub-comment template for responses. Renders
 * empty JSX brackets if no response exists on a per comment basis.
 *
 * @export **AgnosticThread**
 * @interface FC<AgnosticRepoTemplateProps>
 *
 * _Where_
 * @interface CommenterTemplateProps
 * @extends
 * @interface commenterProps
 * @interface ResponderProps
 *
 * @kind _commenter Props_
 * @param {string} repo_user_name required
 * @param {string | undefined} repo_user_first_name conditional
 * @param {string | undefined} repo_user_last_name conditional
 * @param {string} repo_user_content required
 * @param {Date} repo_user_created_timestamp required
 * @param {Date | undefined} repo_user_updated_timestamp conditional
 * @param {string | undefined} repo_user_avatar conditional
 * @param {string} repo_user_fallback_avatar required
 * @param {string | undefined} repo_user_source_url conditional - link to external comment
 * @param {number} stars required - starGazers Count
 * @param {forks} forks required - forkCount
 * @param {primaryLanguage} primaryLanguage required - defaults to MD if no discernible language exists
 * @param {ReactNode} source_icon required - pass an SVG or Image logo in for comment source
 *
 * @kind _Responder Props_ - all props conditionally undefined
 * @param {string | undefined} subrepo_user_name
 * @param {string | undefined} subrepo_user_first_name
 * @param {string | undefined} subrepo_user_last_name
 * @param {string | undefined} subrepo_user_content
 * @param {Date | undefined} subrepo_user_created_timestamp
 * @param {Date | undefined} subrepo_user_updated_timestamp
 * @param {string | undefined} subrepo_user_first_name
 * @param {string | undefined} subrepo_user_avatar
 * @param {string | undefined} subrepo_user_fallback_avatar
 * @param {string | undefined} subrepo_user_business_name
 *
 * @kind React.ReactNode for injecting content if no Response exists
 * @param {ReactNode | undefined} children
 */

const AgnosticRepoTemplate: FC<AgnosticRepoTemplateProps> =
	({
		repo_user_name,
		repo_user_first_name,
		repo_user_last_name,
		repo_user_content,
		repo_user_created_timestamp,
		repo_user_updated_timestamp,
		repo_user_avatar,
		repo_user_fallback_avatar,
		repo_user_source_url,
		stars,
		forks,
		primaryLanguage,
		source_icon,
		subrepo_user_name,
		subrepo_user_content,
		subrepo_user_created_timestamp,
		subrepo_user_updated_timestamp,
		subrepo_user_first_name,
		subrepo_user_last_name,
		subrepo_user_avatar,
		subrepo_user_fallback_avatar,
		subrepo_user_business_name,
		children
	}) => {
		const subcommenterName = subrepo_user_first_name
			? subrepo_user_last_name
				? `${subrepo_user_first_name} + ${subrepo_user_last_name}`
				: subrepo_user_first_name
			: subrepo_user_name;
		const commenterName = repo_user_first_name
			? repo_user_last_name
				? `${repo_user_first_name} + ${repo_user_last_name}`
				: repo_user_first_name
			: repo_user_name;
		return (
			<CommenterTemplate
				repo_user_name={commenterName}
				forks={forks}
				stars={stars}
				primaryLanguage={primaryLanguage}
				repo_user_avatar={repo_user_avatar}
				repo_user_fallback_avatar={repo_user_fallback_avatar}
				repo_user_updated_timestamp={
					repo_user_updated_timestamp
				}
				repo_user_created_timestamp={
					repo_user_created_timestamp
				}
				repo_user_content={repo_user_content}
				repo_user_first_name={repo_user_first_name}
				repo_user_last_name={repo_user_last_name}
				source_icon={source_icon}
				repo_user_source_url={repo_user_source_url}
			>
				{subrepo_user_content ? (
					<SubcommentTemplate
						subrepo_user_name={subcommenterName}
						subrepo_user_content={subrepo_user_content}
						subrepo_user_updated_timestamp={
							subrepo_user_updated_timestamp
						}
						subrepo_user_created_timestamp={
							subrepo_user_created_timestamp
						}
						subrepo_user_business_name={
							subrepo_user_business_name
						}
						subrepo_user_fallback_avatar={
							subrepo_user_fallback_avatar
						}
						subrepo_user_avatar={subrepo_user_avatar}
						subrepo_user_first_name={subrepo_user_first_name}
						subrepo_user_last_name={subrepo_user_last_name}
					/>
				) : (
					children ?? <></>
				)}
			</CommenterTemplate>
		);
	};

export default AgnosticRepoTemplate;
