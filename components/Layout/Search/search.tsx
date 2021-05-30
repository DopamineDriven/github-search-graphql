import { FC, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import css from './search.module.css';
import { useRouter } from 'next/router';
import { Input } from '../../UI';
import { filterQuery } from '@/lib/helpers/filter-query';
import { GitHub } from '@/components/UI/Icons';
import { slashExtractFragment } from '@/lib/string-manipulators';
interface Props {
	className?: string;
	id?: string;
}

const Searchbar: FC<Props> = ({
	className,
	id = 'github/'
}) => {
	const router = useRouter();
	const [value, setValue] = useState('');

	console.log(router.query ?? '');
	const xx = router.query ?? '';
	const xxSlash = slashExtractFragment(`${xx}`);
	console.log(xxSlash[0]);

	useEffect(() => {
		// router.prefetch(url, as)
		router.prefetch(
			'/github/[nameWithOwner]',
			`/github/${router.query}`,
			{
				priority: true
			}
		);
	}, [value]);

	return useMemo(
		() => (
			<div
				className={cn(
					'relative bg-accents-1 text-base w-full transition-colors duration-150',
					className
				)}
			>
				<label className='sr-only' htmlFor={id}>
					repo
				</label>
				<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
					<span className='text-gray-100 font-semibold sm:text-base'>
						<GitHub />
					</span>
				</div>
				<Input
					id={id}
					name={id}
					onChange={setValue}
					className={css.input}
					// placeholder='/github/'
					defaultValue={
						router && router.query
							? (router.query.q as string)
							: ''
					}
					onKeyUp={e => {
						e.preventDefault();

						if (e.key === 'Enter') {
							const q = e.currentTarget.value;

							router.push(
								{
									pathname: `/github/${q}`,
									query: q ? filterQuery({ q }) : {}
								},
								undefined,
								{ shallow: true }
							);
						}
					}}
				/>
				<div className={css.iconContainer}>
					<svg
						className={css.icon}
						fill='rgb(229, 231, 235)'
						viewBox='0 0 20 20'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
						/>
					</svg>
				</div>
			</div>
		),
		[]
	);
};

export default Searchbar;
