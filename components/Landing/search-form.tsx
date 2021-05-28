import { SyntheticEvent, useRef } from 'react';
import { Container, Input, Button } from '../UI';

export interface SearchFormProps {
	login: string;
	setLogin: (value: string) => void;
}

const SearchForm = ({
	login,
	setLogin
}: SearchFormProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const onClick = (e: SyntheticEvent<EventTarget>) => {
		e.preventDefault();
		setLogin((inputRef.current || { value: login }).value);
	};

	return (
		<div className=''>
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
