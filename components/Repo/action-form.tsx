import { useRef } from 'react';

import { TextEnhancer, Button } from '../UI';

export interface ActionFormProps {
	show: boolean;
	isLoading: boolean;
	onSubmit: (text: string) => void;
}

const ActionForm = ({
	show,
	onSubmit,
	isLoading
}: ActionFormProps) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const submit = () => {
		if (inputRef?.current?.value) {
			onSubmit(inputRef.current.value);
		}
	};
	return (
		<div className='mx-auto'>
			{!show ? (
				<></>
			) : (
				<>
					<textarea
						placeholder='Type Comment...'
						inputMode='text'
						disabled={isLoading}
						ref={inputRef}
					/>
					<br />
					<Button disabled={isLoading} onClick={submit}>
						Submit
					</Button>
				</>
			)}
		</div>
	);
};

export default ActionForm;
