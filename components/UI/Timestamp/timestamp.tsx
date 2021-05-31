import { parseISO, format } from 'date-fns';
import { FC } from 'react';
import cn from 'classnames';

export interface TimestampProps {
	timestamp: string;
	className?: string;
	date: Date;
}

export default function Timestamp<
	P extends TimestampProps
>({ timestamp, className, date }: P) {
	date = parseISO(timestamp);
	return (
		<time
			dateTime={timestamp}
			className={cn(className, 'font-sans text-primary-0')}
		>
			{format(date, 'LLLL	d, yyyy')}
		</time>
	);
}
