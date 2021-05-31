import React from 'react';

export interface PaginationControlsProps {
	hasPreviousPage?: boolean;
	hasNextPage?: boolean;
	onPrevious?: (hasPreviousPage?: boolean) => void;
	onNext?: (hasNextPage?: boolean) => void;
}

const PaginationControls = ({
	hasPreviousPage = false,
	hasNextPage = false,
	onPrevious = () => {},
	onNext = () => {}
}: PaginationControlsProps) => (
	<div>
		{hasPreviousPage && (
			<button
				onClick={() => {
					onPrevious();
					window.scrollTo(0, 0);
				}}
			>
				Previous
			</button>
		)}
		{hasNextPage && (
			<button
				onClick={() => {
					onNext();
					window.scrollTo(0, 0);
				}}
			>
				Next
			</button>
		)}
	</div>
);

export default PaginationControls;
