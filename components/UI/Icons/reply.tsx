export default function ReplyIcon({ ...props }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='transition-transform transform-gpu rotate-180'
			width='24'
			height='24'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			{...props}
		>
			<path
				vectorEffect='non-scaling-stroke'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6'
			/>
		</svg>
	);
}
