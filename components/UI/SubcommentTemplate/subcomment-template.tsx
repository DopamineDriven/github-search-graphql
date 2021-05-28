import { SubcommenterProps } from '@/types/custom-comments';
import Image from 'next/image';
import parser from 'html-react-parser';
import { ReplyIcon } from '../Icons';
import cn from 'classnames';
import { ThreadTime } from '../index';
import { ImageLoader } from '@/lib/image-loader';

export default function SubcommentTemplate({
	subcommenter_content,
	subcommenter_avatar,
	subcommenter_fallback_avatar,
	subcommenter_business_name,
	subcommenter_created_timestamp,
	subcommenter_updated_timestamp,
	subcommenter_first_name,
	subcommenter_last_name,
	subcommenter_name
}: SubcommenterProps) {
	const subcommenterName =
		subcommenter_last_name != null
			? `${subcommenter_first_name} + ${subcommenter_last_name}`
			: subcommenter_first_name
			? subcommenter_first_name
			: subcommenter_name;

	return (
		<>
			<div className='inline-flex max-w-3xl w-full'>
				<div className='flex-col'>
					<ReplyIcon />
				</div>
				<>
					<div className='flex-col space-y-4 bg-redditSearch rounded-lg sm:ml-6 p-3 w-full'>
						<div className='flex space-x-3'>
							<div
								className={cn(
									'flex-shrink-0 w-12 h-12 rounded-full'
								)}
							>
								<Image
									alt={subcommenter_name}
									loader={ImageLoader}
									className='h-10 w-10 rounded-full'
									width={500}
									layout='responsive'
									aria-orientation='vertical'
									height={500}
									objectFit='fill'
									src={
										subcommenter_avatar!
											? subcommenter_avatar
											: subcommenter_fallback_avatar!
									}
									priority
									quality={100}
								/>
							</div>
							<>
								<div className='min-w-0 flex-1'>
									<p className='text-sm font-medium text-olive-300'>
										{subcommenter_business_name ?? ' '}
									</p>
									<h2
										id={'reply-' + subcommenterName}
										className='text-base font-medium text-olive-300 flex-row'
									>
										<p className='text-base font-bold tracking-wide text-gray-50 flex-row'>
											{subcommenterName}
										</p>
									</h2>
								</div>
							</>
						</div>
						<p className='text-base font-medium text-secondary-0 mt-4'></p>
						<blockquote className='mt-2 text-sm text-olive-300 space-y-4'>
							<p>{parser(`${subcommenter_content}`)}</p>
							<figcaption className='mt-3 flex text-sm'>
								<span className='ml-2'>
									{subcommenter_updated_timestamp ? (
										<ThreadTime
											time={subcommenter_updated_timestamp}
										/>
									) : (
										<ThreadTime
											time={subcommenter_created_timestamp!}
										/>
									)}
								</span>
							</figcaption>
						</blockquote>
					</div>
				</>
			</div>
		</>
	);
}
