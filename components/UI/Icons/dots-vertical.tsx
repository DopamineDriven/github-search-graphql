export default function DotsVertical({
	...props
}: {
	[x: string]: any;
}): JSX.Element {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='#d7be69'
			{...props}
		>
			<path
				d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'
				fill='currentColor'
			/>
		</svg>
	);
}
