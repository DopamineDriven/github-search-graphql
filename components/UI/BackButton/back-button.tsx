import { Button, Anchor } from '../index';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import cn from 'classnames';
import Link from 'next/link';

export default function ButtonBack(
	className?: string,
	login?: string
) {
	const [loading, setLoading] = useState(false);
	const loadingRef = useRef(loading);
	const router = useRouter();
	const dynamicParams = (router.query.login as string) ?? '';
	const dynamicRef = useRef(dynamicParams);
	useEffect(() => {
		(async function stateFeedbackLoop() {
			!loading &&
			loading.valueOf() === loadingRef.current.valueOf()
				? false
				: await setLoading((loadingRef.current = loading));
		})();
		(async function routingFeedbackLoop() {
			await router.prefetch(
				`/repos/[login]`,
				`/repos/${encodeURIComponent(
					login ?? (dynamicParams as string)
				)}`,
				{
					priority: true
				}
			);
		})();
	}, [
		loadingRef.current,
		loading,
		dynamicRef.current,
		dynamicParams
	]);

	return (
		<Link
			href={{
				pathname: '/repos/[login]',
				query: {
					login: dynamicParams ?? `${() => router.back()}`
				}
			}}
			as={`/repos/${encodeURIComponent(
				(router.query.login as string) ?? login
			)}`}
			passHref={true}
			shallow={true}
			replace={true}
		>
			<Button
				variant='slim'
				className={cn(
					'mx-auto transform-gpu rounded-xl my-4 justify-center px-4 py-2 bg-redditBG border-purple-900 border-2 hover:bg-redditSearch',
					className,
					loading === true
						? 'cursor-wait opacity-80'
						: 'cursor-auto'
				)}
			>
				<Anchor
					id={`${
						`/repos/${encodeURIComponent(
							router.query.login as string
						)}` ?? (() => router.back())
					}`}
					className='mx-auto text-2xl text-gray-200 hover:text-gray-50 '
					onClick={() =>
						router.push(
							`/repos/[login]`,
							`${
								dynamicParams !== '' ? dynamicParams : router.back()
							}`
						)
					}
				>
					Go Back
				</Anchor>
			</Button>
		</Link>
	);
}
