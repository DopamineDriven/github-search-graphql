import { CommenterTemplate } from './CommenterTemplate';
import { SubcommentTemplate } from './SubcommentTemplate';
import { FC } from 'react';
import type { UICustomComment } from '@/types/custom-comments';

/**
 * A reusable, provider agnostic, UI template intended for
 * comment feeds. Features a conditionally rendered embedded
 * Business/User sub-comment template for responses. Renders
 * empty JSX brackets if no response exists on a per comment basis.
 *
 * @export **AgnosticCommentThread**
 * @interface FC<CommenterTemplateProps>
 *
 * _Where_
 * @interface CommenterTemplateProps
 * @extends
 * @interface commenterProps
 * @interface ResponderProps
 *
 * @kind _commenter Props_
 * @param {string} commenter_name required
 * @param {string | undefined} commenter_first_name conditional
 * @param {string | undefined} commenter_last_name conditional
 * @param {string} commenter_content required
 * @param {Date} commenter_created_timestamp required
 * @param {Date | undefined} commenter_updated_timestamp conditional
 * @param {string | undefined} commenter_avatar conditional
 * @param {string} commenter_fallback_avatar required
 * @param {string | undefined} commenter_source_url conditional - link to external comment
 * @param {number} stars required - star rating, 1-5; renders empty JSX brackets if 0
 * @param {ReactNode} source_icon required - pass an SVG or Image logo in for comment source
 *
 * @kind _Responder Props_ - all props conditionally undefined
 * @param {string | undefined} subcommenter_name
 * @param {string | undefined} subcommenter_first_name
 * @param {string | undefined} subcommenter_last_name
 * @param {string | undefined} subcommenter_content
 * @param {Date | undefined} subcommenter_created_timestamp
 * @param {Date | undefined} subcommenter_updated_timestamp
 * @param {string | undefined} subcommenter_first_name
 * @param {string | undefined} subcommenter_avatar
 * @param {string | undefined} subcommenter_fallback_avatar
 * @param {string | undefined} subcommenter_business_name
 *
 * @kind React.ReactNode for injecting content if no Response exists
 * @param {ReactNode | undefined} children
 */

const AgnosticCommentThread: FC<UICustomComment> = ({
	commenter_name,
	commenter_first_name,
	commenter_last_name,
	commenter_content,
	commenter_created_timestamp,
	commenter_updated_timestamp,
	commenter_avatar,
	commenter_fallback_avatar,
	commenter_source_url,
	stars,
	forks,
	source_icon,
	subcommenter_name,
	subcommenter_content,
	subcommenter_created_timestamp,
	subcommenter_updated_timestamp,
	subcommenter_first_name,
	subcommenter_last_name,
	subcommenter_avatar,
	subcommenter_fallback_avatar,
	subcommenter_business_name,
	children
}) => {
	const subcommenterName = subcommenter_first_name
		? subcommenter_last_name
			? `${subcommenter_first_name} + ${subcommenter_last_name}`
			: subcommenter_first_name
		: subcommenter_name;
	const commenterName = commenter_first_name
		? commenter_last_name
			? `${commenter_first_name} + ${commenter_last_name}`
			: commenter_first_name
		: commenter_name;
	return (
		<CommenterTemplate
			commenter_name={commenterName}
			forks={forks}
			stars={stars}
			commenter_avatar={commenter_avatar}
			commenter_fallback_avatar={commenter_fallback_avatar}
			commenter_updated_timestamp={commenter_updated_timestamp}
			commenter_created_timestamp={commenter_created_timestamp}
			commenter_content={commenter_content}
			commenter_first_name={commenter_first_name}
			commenter_last_name={commenter_last_name}
			source_icon={source_icon}
			commenter_source_url={commenter_source_url}
		>
			{subcommenter_content != null ? (
				<SubcommentTemplate
					subcommenter_name={subcommenterName}
					subcommenter_content={subcommenter_content}
					subcommenter_updated_timestamp={
						subcommenter_updated_timestamp
					}
					subcommenter_created_timestamp={
						subcommenter_created_timestamp
					}
					subcommenter_business_name={subcommenter_business_name}
					subcommenter_fallback_avatar={
						subcommenter_fallback_avatar
					}
					subcommenter_avatar={subcommenter_avatar}
					subcommenter_first_name={subcommenter_first_name}
					subcommenter_last_name={subcommenter_last_name}
				/>
			) : (
				children ?? <></>
			)}
		</CommenterTemplate>
	);
};

export default AgnosticCommentThread;
