import {
	AgnosticCommentThread,
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
			<AgnosticCommentThread
				source_icon={<GitHub />}
				stars={0}
				key={issue.id}
				commenter_name={'Active Issue'}
				commenter_created_timestamp={issue.createdAt}
				commenter_updated_timestamp={issue.updatedAt}
				commenter_avatar={'/meta/android-chrome-192x192.png'}
				commenter_fallback_avatar={
					'/meta/android-chrome-192x192.png'
				}
				commenter_content={`${(
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
			</AgnosticCommentThread>
		</Container>
	);
	return AgnosticTemplate;
};
