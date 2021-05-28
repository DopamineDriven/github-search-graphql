import { parseISO, format } from 'date-fns';
import { FC } from 'react';
import cn from 'classnames';

interface TimestampProps {
	timestamp: string;
	className?: string;
}

const Timestamp: FC<TimestampProps> = ({
	timestamp,
	className
}) => {
	const date: Date = parseISO(timestamp);
	return (
		<time
			dateTime={timestamp}
			className={cn(className, 'font-sans text-primary-0')}
		>
			{format(date, 'LLLL	d, yyyy')}
		</time>
	);
};

export default Timestamp;
