## .env and .env.local

### Overview

##### To create a GitHub Personal Access Token, follow the directions provided [here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token)

### Two .env\* files -- .env and .env.local

### `.env`

- These values are used for `"**/*.yml"` file types and for the `.graphqlconfig` file -- the value in each key-val pair must be a string (e.g., KEY="VALUE")

`.env`

```s
GITHUB_OAUTH_TOKEN_YML="YOUR_TOKEN_HERE"
NEXT_PUBLIC_GITHUB_GRAPHQL_ENDPOINT_YML="https://api.github.com/graphql"
```

### `.env.local`

- These values are for all other file types -- [`"**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"`]
- They do not need to be strings

`.env.local`

```s
GITHUB_OAUTH_TOKEN=
NEXT_PUBLIC_SEND_ANALYTICS=true
QUICK_METRICS_API_KEY=
NEXT_PUBLIC_GITHUB_GRAPHQL_ENDPOINT=https://api.github.com/graphql
```

- Note: For the `QUICK_METRICS_API_KEY` value, I will send the key to collaborators directly. For all others, check out [Quick Metrics](https://app.quickmetrics.io/metrics)

- Alternatively, to opt out, simply change the following code in `pages/_app.tsx` from this:

```tsx
const quickMetricsKey =
	process.env.QUICK_METRICS_API_KEY ?? '';

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
		console.warn('analytics is disabled');
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
```

- To this:

```tsx
export function reportWebVitals(
	metric: NextWebVitalsMetric
): void {
	switch (metric.name) {
		case 'FCP':
			console.log('FCP: ', metric);
			break;
		case 'LCP':
			console.log('LCP: ', metric);
			break;
		case 'CLS':
			console.log('CLS: ', metric);
			break;
		case 'FID':
			console.log('FID: ', metric);
			break;
		case 'TTFB':
			console.log('TTFB: ', metric);
			break;
		case 'Next.js-hydration':
			console.log('Next.js-hydration: ', metric);
			break;
		case 'Next.js-route-change-to-render':
			console.log('Next.js-route-change-to-render: ', metric);
			break;
		case 'Next.js-render':
			console.log('Next.js-render: ', metric);
			break;
		default:
			break;
	}
}
```
