import '@/styles/index.css';
import '@/styles/chrome-bug.css';

import { AppProps, NextWebVitalsMetric } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/lib/apollo';
import { useEffect, FC } from 'react';
import { Head } from '@/components/Head';
import fetch from 'isomorphic-unfetch';

const Noop: FC = ({ children }) => <>{children}</>;
export default function NextApp({
	Component,
	pageProps: { ...pageProps }
}: AppProps) {
	const apolloClient = useApollo(pageProps);

	const LayoutNoop = (Component as any).LayoutNoop || Noop;
	// remove chrome-bug.css loading class on FCP
	useEffect(() => {
		document.body.classList?.remove('loading');
	}, []);

	return (
		<>
			<ApolloProvider client={apolloClient}>
				<Head />
				<LayoutNoop pageProps={pageProps}>
					<Component {...pageProps} />
				</LayoutNoop>
			</ApolloProvider>
		</>
	);
}

const quickMetricsKey =
	process.env.NEXT_PUBLIC_QUICK_METRICS_API_KEY ?? '';

// quickmetrics
const sendAnalytics = ({
	name,
	value
}: NextWebVitalsMetric): void => {
	if (process.env.NEXT_PUBLIC_SEND_ANALYTICS) {
		const url = `https://qckm.io?m=${name}&v=${value}&k=${quickMetricsKey}`;
		if (navigator.sendBeacon) {
			navigator.sendBeacon(url);
		} else {
			fetch(url, { method: 'POST', keepalive: true });
		}
	} else {
		console.warn('analytcs is disabled');
	}
};

export function reportWebVitals(
	metric: NextWebVitalsMetric
): void {
	if (process.env.NODE_ENV === 'production') {
		switch (metric.name) {
			case 'FCP':
				sendAnalytics(metric);
				break;
			case 'LCP':
				sendAnalytics(metric);
				break;
			case 'CLS':
				sendAnalytics(metric);
				break;
			case 'FID':
				sendAnalytics(metric);
				break;
			case 'TTFB':
				sendAnalytics(metric);
				break;
			case 'Next.js-hydration':
				sendAnalytics(metric);
				break;
			case 'Next.js-route-change-to-render':
				sendAnalytics(metric);
				break;
			case 'Next.js-render':
				sendAnalytics(metric);
				break;
			default:
				break;
		}
	}
	// don't send analytics in process.env.NODE_ENV === "dev"
	console.log('metric: ', metric);
}

// const configValues = {
// 	errorRetryCount: 5,
// 	refreshInterval: 43200 * 10,
// 	onLoadingSlow: (
// 		key: string,
// 		config: Readonly<
// 			Required<Configuration<any, any, Fetcher<any>>>
// 		>
// 	) => [key, { ...config }]
// };
