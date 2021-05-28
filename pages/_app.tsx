import '@/styles/index.css';
import '@/styles/chrome-bug.css';

import { AppProps, NextWebVitalsMetric } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/lib/apollo';
// import { useRouter } from 'next/router';
import { useEffect, FC } from 'react';
import { Head } from '@/components/Head';
import { SWRConfig } from 'swr';
import { Configuration, Fetcher } from 'swr/dist/types';
import fetch from 'isomorphic-unfetch';

const configValues = {
	errorRetryCount: 5,
	refreshInterval: 43200 * 10,
	onLoadingSlow: (
		key: string,
		config: Readonly<
			Required<Configuration<any, any, Fetcher<any>>>
		>
	) => [key, { ...config }]
};

const Noop: FC = ({ children }) => <>{children}</>;
export default function NextApp({
	Component,
	pageProps
}: AppProps) {
	const apolloClient = useApollo({});

	const LayoutNoop = (Component as any).LayoutNoop || Noop;

	// const router = useRouter();

	// remove chrome-bug.css loading class on FCP
	useEffect(() => {
		document.body.classList?.remove('loading');
	}, []);

	return (
		<>
			{/* <SWRConfig value={configValues}> */}
			<ApolloProvider client={apolloClient}>
				<Head />
				<LayoutNoop pageProps={pageProps}>
					<Component {...pageProps} />
				</LayoutNoop>
			</ApolloProvider>
			{/* </SWRConfig> */}
		</>
	);
}

// quickmetrics
// const sendAnalytics = ({
// 	name,
// 	value
// }: NextWebVitalsMetric): void => {
// 	if (process.env.NEXT_PUBLIC_SEND_ANALYTICS) {
// 		const url = `https://qckm.io?m=${name}&v=${value}&k=${process.env.NEXT_PUBLIC_QUICK_METRICS_API_KEY}`;
// 		if (navigator.sendBeacon) {
// 			navigator.sendBeacon(url);
// 		} else {
// 			fetch(url, { method: 'POST', keepalive: true });
// 		}
// 	} else {
// 		console.warn('analytcs is disabled');
// 	}
// };

// export function reportWebVitals(
// 	metric: NextWebVitalsMetric
// ): void {
// 	if (process.env.NODE_ENV === 'production') {
// 		switch (metric.name) {
// 			case 'FCP':
// 				sendAnalytics(metric);
// 				break;
// 			case 'LCP':
// 				sendAnalytics(metric);
// 				break;
// 			case 'CLS':
// 				sendAnalytics(metric);
// 				break;
// 			case 'FID':
// 				sendAnalytics(metric);
// 				break;
// 			case 'TTFB':
// 				sendAnalytics(metric);
// 				break;
// 			case 'Next.js-hydration':
// 				sendAnalytics(metric);
// 				break;
// 			case 'Next.js-route-change-to-render':
// 				sendAnalytics(metric);
// 				break;
// 			case 'Next.js-render':
// 				sendAnalytics(metric);
// 				break;
// 			default:
// 				break;
// 		}
// 	}
// 	console.log('metric: ', metric);
// }
