import Skeleton from './skeleton';
import css from './skeleton-sections.module.css';
import { FC } from 'react';
import cn from 'classnames';

const SkeletonSections: FC<{ className?: string }> = ({
	className,
	children
}) => {
	return (
		<div className={cn(css.container, className)}>
			<div className={css.content}>
				<Skeleton style={{ height: '2.25rem' }} />
				<Skeleton
					style={{ height: '7rem', margin: '1.25rem 0' }}
				/>
				<Skeleton style={{ height: '1.25rem' }} />
			</div>
			{children}
			<div className={css.footer}>
				<Skeleton style={{ height: '1.25rem' }} />
			</div>
		</div>
	);
};

export default SkeletonSections;
