import { FontAwesomeHacked } from '@/components/UI/Icons';
import Link from 'next/link';
import cn from 'classnames';
import css from './footer.module.css';

const FooterLogo = () => {
	return (
		<Link href='/'>
			<a className={cn(css.footerLogoAlpga)}>
				<span className={css.footerLogoBeta}>
					<FontAwesomeHacked className='rounded-full h-40 w-40 z-150 ' />
				</span>
			</a>
		</Link>
	);
};

export default FooterLogo;
