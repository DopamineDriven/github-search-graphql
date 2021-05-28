import mergeRefs from 'react-merge-refs';
import { LoadingSpinner } from '@/components/UI';
import cn from 'classnames';
import css from './anchor.module.css';
import React, {
	FC,
	CSSProperties,
	AnchorHTMLAttributes,
	useRef,
	JSXElementConstructor
} from 'react';
import { Url } from 'url';

// Omit intrinsic href to reinject with conditional Url interface to accept query hrefs from next/link
// query hrefs, e.g.: href={{ query: { slug }, pathname: '', href: '', { ...options, etc } }}

export interface ForwardedAnchorProps<T = HTMLAnchorElement>
	extends Omit<AnchorHTMLAttributes<T>, 'href'> {
	className?: string;
	Component?: string | JSXElementConstructor<any>;
	width?: string | number;
	variant?: 'flat' | 'slim';
	loading?: boolean;
	type?: 'submit' | 'link' | 'active';
	href?: string | Url;
	active?: boolean;
	disabled?: boolean;
	style?: CSSProperties | {};
}

// this component serves to wrap imported functional components -- allows for proper embedding of href in browser when
// wrapping functional components with Link and anchor, respectively

const Anchor: FC<ForwardedAnchorProps<HTMLAnchorElement>> =
	React.forwardRef((props, aRef) => {
		const {
			onClick,
			width,
			className,
			href,
			active,
			style,
			variant = 'flat',
			disabled = false,
			loading = false,
			Component = 'a',
			children,
			...rest
		} = props;

		const ref = useRef<typeof Component>(null);

		const rootClassName = cn(
			css.root,
			{
				[css.slim]: variant === 'slim',
				[css.loading]: loading,
				[css.disabled]: disabled
			},
			className
		);

		return (
			<Component
				aria-pressed={active}
				disabled={disabled}
				ref={mergeRefs([ref, aRef])}
				className={rootClassName}
				onClick={onClick}
				href={href}
				style={{ width, ...style }}
				{...rest}
			>
				{children}
				{loading && (
					<i className='pl-2 m-0 flex'>
						<LoadingSpinner className='transform-gpu transition-all duration-150 animate-spin' />
					</i>
				)}
			</Component>
		);
	});
export default Anchor;
