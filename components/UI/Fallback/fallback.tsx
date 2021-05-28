import Logo from '../Logo';
import SkeletonSections from '../Skeleton/skeleton-sections';

export default function Fallback() {
	const Loading = () => (
		<SkeletonSections>
			<div className='w-80 h-80 flex mx-auto items-center text-center justify-center p-3'>
				<Logo className='w-40 h-40 animate-pulse transform-gpu' />
			</div>
		</SkeletonSections>
	);
	return <Loading />;
}
