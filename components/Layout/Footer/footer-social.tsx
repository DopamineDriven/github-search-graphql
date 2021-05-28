import { FC } from 'react';
import cn from 'classnames';
import {
	ExternalLink,
	GitHub,
	Twitter,
	LinkedIn,
	StackOverflow
} from '@/components/UI/Icons';
import css from './footer.module.css';

export interface FooterSocialProps {
	href: string;
	label: string;
	id: number;
	icon: JSX.Element;
}

export const footerSocial: Readonly<FooterSocialProps[]> =
	Object.freeze([
		{
			href: 'https://twitter.com/dopamine_driven',
			label: 'Twitter',
			id: 0,
			icon: <Twitter />
		},
		{
			href: 'https://www.linkedin.com/in/asross',
			label: 'LinkedIn',
			id: 1,
			icon: <LinkedIn />
		},
		{
			href:
				'https://stackoverflow.com/users/13243520/andrew-ross?tab=profile',
			label: 'GitHub',
			id: 2,
			icon: <StackOverflow />
		},
		{
			href: 'https://github.com/DopamineDriven',
			label: 'GitHub',
			id: 3,
			icon: <GitHub />
		},
		{
			href: 'https://andrewross.dev',
			label: 'Portfolio',
			id: 4,
			icon: <ExternalLink />
		}
	] as const);

export interface FooterSocialPropsFC {
	className?: string;
}

const FooterSocial: FC<FooterSocialPropsFC> = ({
	className
}) => {
	return (
		<div className={cn(css.socialRoot, className)}>
			{footerSocial.map((social, i) => (
				<div key={++i}>
					<a
						title={social.label}
						target='__blank'
						href={social.href}
						className={cn(
							css.socialLink,
							'text-purple-800 hover:text-purple-900 transition-transform duration-150 transform-gpu'
						)}
					>
						<span className='sr-only'>
							{`External Link to Andrew's ${social.label} page`}
						</span>
						{social.icon}
					</a>
				</div>
			))}
		</div>
	);
};

export default FooterSocial;
