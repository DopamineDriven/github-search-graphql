import { ApolloError } from '@apollo/client';

export interface ErrorInterface {
	error: ApolloError;
}
const Error = ({ error }: ErrorInterface) => {
	return (
		<div className='flex mx-auto items-center text-left sm:text-justify justify-center p-3 text-2xl font-sans text-rojo-100'>
			{error}
		</div>
	);
};

export default Error;
