import { SubRepoOverviewProps } from '@/types/custom-comments';
import Image from 'next/image';
import parser from 'html-react-parser';
import { ReplyIcon } from '../../Icons';
import cn from 'classnames';
import { ThreadTime } from '../../index';
import { ImageLoader } from '@/lib/image-loader';

export default function SubcommentTemplate({
	subrepo_user_content,
	subrepo_user_avatar,
	subrepo_user_fallback_avatar,
	subrepo_user_business_name,
	subrepo_user_created_timestamp,
	subrepo_user_updated_timestamp,
	subrepo_user_first_name,
	subrepo_user_last_name,
	subrepo_user_name
}: SubRepoOverviewProps) {
	const subcommenterName =
		subrepo_user_last_name != null
			? `${subrepo_user_first_name} + ${subrepo_user_last_name}`
			: subrepo_user_first_name
			? subrepo_user_first_name
			: subrepo_user_name;

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
									alt={subrepo_user_name}
									loader={ImageLoader}
									className='h-10 w-10 rounded-full'
									width={500}
									layout='responsive'
									aria-orientation='vertical'
									height={500}
									objectFit='fill'
									src={
										subrepo_user_avatar!
											? subrepo_user_avatar
											: subrepo_user_fallback_avatar!
									}
									priority
									quality={100}
								/>
							</div>
							<>
								<div className='min-w-0 flex-1'>
									<p className='text-sm font-medium text-olive-300'>
										{subrepo_user_business_name ?? ' '}
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
							<p>{parser(`${subrepo_user_content}`)}</p>
							<figcaption className='mt-3 flex text-sm'>
								<span className='ml-2'>
									{subrepo_user_updated_timestamp ? (
										<ThreadTime
											time={subrepo_user_updated_timestamp}
										/>
									) : (
										<ThreadTime
											time={subrepo_user_created_timestamp!}
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
