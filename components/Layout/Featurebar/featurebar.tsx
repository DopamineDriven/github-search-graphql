import cn from 'classnames';
import { FC } from 'react';
import css from './featurebar.module.css';

export interface FeatureBarProps {
	className?: string;
	title: string;
	description?: string;
	hide?: boolean;
	action?: React.ReactNode;
}

const Featurebar: FC<FeatureBarProps> = ({
	title,
	description,
	hide,
	action,
	className
}) => {
	const rootClassName = cn(
		css.root,
		{
			transform: true,
			'opacity-100 bg-redditNav text-gray-50 z-150 select-none':
				!hide,
			'translate-y-full opacity-0': hide
		},
		className
	);
	return (
		<div className={rootClassName}>
			<span className='block md:inline mx-auto'>{title}</span>
			<span className='block mb-6 md:inline md:mb-0 md:ml-2'>
				{description}
			</span>
			{action && action}
		</div>
	);
};

export default Featurebar;
