import { AngledBracketClosed } from '@/components/UI/Icons';
import Link from 'next/link';
import cn from 'classnames';
import css from './footer.module.css';

const FooterLogo = () => {
	return (
		<Link href='/'>
			<a className={cn(css.footerLogoAlpga)}>
				<span className={css.footerLogoBeta}>
					<AngledBracketClosed
						className={cn(
							'stroke-current text-purple-700 h-14 w-14',
							css.svg,
							'cursor-default focus:outline-none transition-all transform-gpu ease-in-out duration-500'
						)}
					/>
				</span>
			</a>
		</Link>
	);
};

export default FooterLogo;
