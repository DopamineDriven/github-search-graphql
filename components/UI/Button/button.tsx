import cn from 'classnames';
import React, {
	forwardRef,
	ButtonHTMLAttributes,
	JSXElementConstructor,
	useRef
} from 'react';
import mergeRefs from 'react-merge-refs';
import css from './button.module.css';
import LoadingSpinner from '../LoadingSpinner';

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	href?: string;
	className?: string;
	variant?: 'flat' | 'slim';
	active?: boolean;
	type?: 'submit' | 'reset' | 'button';
	Component?: string | JSXElementConstructor<any>;
	width?: string | number;
	loading?: boolean;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = forwardRef(
	(props, buttonRef) => {
		const {
			className,
			variant = 'flat',
			children,
			active,
			width,
			Component = 'button',
			loading = false,
			disabled = false,
			style = {},
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
				data-variant={variant}
				ref={mergeRefs([ref, buttonRef])}
				className={rootClassName}
				disabled={disabled}
				style={{
					width,
					...style
				}}
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
	}
);

export default Button;
