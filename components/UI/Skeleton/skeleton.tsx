import css from './skeleton.module.css';
import { FC, CSSProperties } from 'react';

const Skeleton: FC<{ style: CSSProperties }> = ({
	children,
	style
}) => {
	return (
		<span className={css.skeleton} style={style}>
			{children}
		</span>
	);
};
export default Skeleton;
