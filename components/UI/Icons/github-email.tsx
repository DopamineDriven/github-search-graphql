export default function GitHubEmail({ ...props }) {
	return (
		<svg
			viewBox='0 0 16 16'
			version='1.1'
			width='16'
			height='16'
			className='h-5 w-5 inline-block mr-0.5'
			aria-hidden='true'
			{...props}
		>
			<path
				fillRule='evenodd'
				fill='#6c5ab5'
				d='M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z'
			></path>
		</svg>
	);
}
