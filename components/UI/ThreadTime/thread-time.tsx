import { format, formatDistanceToNow } from 'date-fns';

export interface ThreadTimeProps {
	time: Date | number;
}

const ThreadTime = ({ time }: ThreadTimeProps) => {
	return (
		<p className='text-xs text-gray-200'>
			<a className='text-gray-200 no-underline'>
				<time
					className='underline-none has-tooltip'
					dateTime={formatDistanceToNow(time) + ' ago'}
				>
					{formatDistanceToNow(time)} {'ago'}
					<span className={'tooltip'}>
						{format(time, 'LL/dd/yyyy') +
							' at ' +
							format(time, 'h:mm aaa')}{' '}
						{' (' + format(time, 'O') + ')'}
					</span>
				</time>
			</a>
		</p>
	);
};

export default ThreadTime;
