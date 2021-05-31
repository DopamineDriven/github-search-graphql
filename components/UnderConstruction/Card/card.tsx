import {
	AgnosticRepoTemplate,
	TextEnhancer,
	CommentsSkeleton,
	Container
} from '@/components/UI';
import { GitHub, TypeScript } from '@/components/UI/Icons';
import { Issue } from '@/graphql/graphql';
import Image from 'next/image';
import { ImageLoader } from '@/lib/image-loader';
import parser from 'html-react-parser';

export type CardTemplateProps = {
	issue: Issue;
};

export const CardTemplate = ({
	issue
}: CardTemplateProps) => {
	const parsed = parser(issue.bodyHTML);
	const AgnosticTemplate = (
		<Container>
			<AgnosticRepoTemplate
				primaryLanguage={issue.repository.primaryLanguage}
				forks={issue.repository.forkCount}
				source_icon={<GitHub />}
				stars={issue.repository.stargazerCount}
				key={issue.id}
				repo_user_name={'Active Issue'}
				repo_user_created_timestamp={issue.createdAt}
				repo_user_updated_timestamp={issue.updatedAt}
				repo_user_avatar={'/meta/android-chrome-192x192.png'}
				repo_user_fallback_avatar={
					'/meta/android-chrome-192x192.png'
				}
				repo_user_content={`${(
					<TextEnhancer
						textToTransform={(parsed as string) ?? issue.bodyHTML}
					/>
				)}`}
			>
				<Image
					className='backdrop-blur-3xl'
					loader={ImageLoader}
					width='400'
					height='400'
					quality={100}
					alt={issue.title}
					src={'/doge-404.jpg'}
				/>
			</AgnosticRepoTemplate>
		</Container>
	);
	return AgnosticTemplate;
};
