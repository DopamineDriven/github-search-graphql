import cn from 'classnames';
import css from './input.module.css';
import React, { InputHTMLAttributes } from 'react';

// reusable Input component

export interface InputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	// mixxxin
	onChange?: (...args: any[]) => any;
}

function Input(props: InputProps): JSX.Element {
	const { className, children, onChange, ...rest } = props;

	const rootClassName = cn(css.root, {}, className);

	const handleOnChange = <T extends HTMLInputElement>(
		e: React.ChangeEvent<T>
	) => {
		if (onChange) {
			onChange(e.target.value);
		}
		return null;
	};

	return (
		<label>
			<input
				className={rootClassName}
				onChange={handleOnChange}
				autoComplete='on'
				autoCorrect='off'
				autoCapitalize='off'
				spellCheck='false'
				{...rest}
			/>
		</label>
	);
}

export default Input;
//	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
/*
import cn from 'classnames';
import css from './input.module.css';
import React, { InputHTMLAttributes } from 'react';
// import ReactHTMLElement from 'react';
import JSX from 'react';

interface RefObject<T> {
	readonly current: T | null;
}

type T = HTMLInputElement
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	onChange?: (...args: any[]) => any;
	ref?: RefObject<T>;
}

const Input: React.FC<InputProps> = props => {
	const { className, children, onChange, ...rest } = props;

	const rootClassName = cn(css.root, {}, className);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e.target.value);
		}
		return null;
	};

	return (
		<label>
			<input
				className={rootClassName}
				onChange={handleOnChange}
				autoComplete='off'
				autoCorrect='off'
				autoCapitalize='off'
				spellCheck='false'
				{...rest}
			/>
		</label>
	);
};

export default Input;

export function InputSimplified({ ...props }) {
	const rootClassName = cn(css.root);
	return <input className={rootClassName} {...props} />;
}

*/
