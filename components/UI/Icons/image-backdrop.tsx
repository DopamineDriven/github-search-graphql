export default function ImageBackdrop({ ...props }) {
	return (
		<svg
			className='hidden lg:block absolute top-0 right-0 -mt-20 -mr-24 transform-gpu'
			width='404'
			height='384'
			fill='none'
			viewBox='0 0 404 384'
			aria-hidden='true'
			{...props}
		>
			<defs>
				<pattern
					id='de316486-4a29-4312-bdfc-fbce2132a2c1'
					x='0'
					y='0'
					width='20'
					height='20'
					patternUnits='userSpaceOnUse'
				>
					<rect
						x='0'
						y='0'
						width='4'
						height='4'
						className='text-secondary-0'
						fill='currentColor'
					/>
				</pattern>
			</defs>
			<rect
				width='404'
				height='384'
				fill='url(#de316486-4a29-4312-bdfc-fbce2132a2c1)'
			/>
		</svg>
	);
}
