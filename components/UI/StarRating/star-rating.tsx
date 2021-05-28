import { FC } from 'react';
import { StarIcon } from '../Icons';
export type StarRatingProps = {
	stars: number;
};

const StarRating: FC<StarRatingProps> = ({ stars }) => {
	const Star = <StarIcon />;
	return (
		<>
			{stars === 1 ? (
				<>{Star}</>
			) : stars === 2 ? (
				<>
					{Star}
					{Star}
				</>
			) : stars === 3 ? (
				<>
					{Star}
					{Star}
					{Star}
				</>
			) : stars === 4 ? (
				<>
					{Star}
					{Star}
					{Star}
					{Star}
				</>
			) : stars === 5 ? (
				<>
					{Star}
					{Star}
					{Star}
					{Star}
					{Star}
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default StarRating;
