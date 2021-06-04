import Logo from '../Logo';
import SkeletonSections from '../Skeleton/skeleton-sections';
import { AngledBracketClosed } from '../Icons';

export default function Fallback() {
	const Loading = () => (
		<SkeletonSections>
			<div className='w-80 h-80 flex mx-auto items-center text-center justify-center p-3'>
				<AngledBracketClosed className='w-40 h-40 animate-pulse transform-gpu stroke-current text-purple-700 transition-all' />
			</div>
		</SkeletonSections>
	);
	return <Loading />;
}
