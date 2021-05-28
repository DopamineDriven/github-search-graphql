import { SyntheticEvent, useRef } from 'react';
import { Container, Input, Button } from '../UI';

export interface SearchFormProps {
	login: string;
	setLogin: (value: string) => void;
	className?: string;
}

const SearchForm = ({
	className,
	login,
	setLogin
}: SearchFormProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const onClick = (e: SyntheticEvent<EventTarget>) => {
		e.preventDefault();
		setLogin((inputRef.current || { value: login }).value);
	};

	return (
		<div className={className}>
			<label>
				Username
				<input
					type='text'
					ref={inputRef}
					defaultValue={login}
					placeholder={'login'}
				/>
			</label>
			<Button onClick={() => onClick}>Search</Button>
		</div>
	);
};
export default SearchForm;
