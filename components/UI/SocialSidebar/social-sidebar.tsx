import FooterSocial from '../../Layout/Footer/footer-social';

export interface SocialSidebarProps {
	className?: string;
}
export default function SocialSidebar({
	className
}: SocialSidebarProps) {
	return (
		<div
			className={'md:flex md:float-right hidden' + className}
		>
			<div className='h-screen sticky-top-0 absolute'>
				<ul className='flex flex-row my-auto lg:flex-row list-none py-1 bg-scroll sticky top-0 bg-redditBG rounded-lg'>
					<li className='grid grid-cols-1 items-end mx-auto py-1 pr-1 my-2 mr-1 pl-2 relative'>
						<FooterSocial />
					</li>
				</ul>
			</div>
		</div>
	);
}
