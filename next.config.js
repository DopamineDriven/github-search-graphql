const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')(
	{
		enabled: !!process.env.ANALYZE
	}
);

module.exports = withBundleAnalyzer({
	webpack(
		config,
		{
			dev = process.env.NODE_ENV === 'development',
			isServer = typeof window === 'undefined'
		}
	) {
		if (isServer) {
			require('./scripts/generate-sitemap');
		}
		/**
		 * !dev ? preact/compat : react, react-dom on build
		 * reduce page weight in production by ~10%
		 */
		if (!dev && !isServer) {
			Object.assign(
				(config.resolve.alias['@/'] = path.resolve('./')),
				{
					react: 'preact/compat',
					'react-dom': 'preact/compat'
				}
			);
		}
		config.module.rules.push({
			test: /\.ya?ml$/,
			type: 'json',
			use: 'yaml-loader'
		});
		return config;
	},
	async Headers() {
		return [
			{
				source: '/(.*)',
				headers: securityHeaders
			}
		];
	},
	reactStrictMode: true,
	sourceMaps: {
		productionBrowserSourceMaps: true
	},
	images: {
		domains: [
			'avatars.githubusercontent.com',
			'github.githubassets.com',
			'serve.onegraph.com',
			'onegraph.com',
			'api.github.com',
			'repository-images.githubusercontent.com'
		]
	},
	future: {
		webpack5: true,
		strictPostcssConfiguration: true
	},
	experimental: {
		turboMode: true,
		eslint: true
	},
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US'
	}
});

// shout out to Leerob -- leerob.io portfolio repo
// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com cdn.usefathom.com;
  child-src *.youtube.com *.google.com *.twitter.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;

const securityHeaders = [
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
	{
		key: 'Content-Security-Policy',
		value: ContentSecurityPolicy.replace(/\n/g, '')
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	{
		key: 'Referrer-Policy',
		value: 'origin-when-cross-origin'
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
	{
		key: 'X-Frame-Options',
		value: 'DENY'
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff'
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on'
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=31536000; includeSubDomains; preload'
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
	// Opt-out of Google FLoC: https://amifloced.org/
	{
		key: 'Permissions-Policy',
		value:
			'camera=(), microphone=(), geolocation=(), interest-cohort=()'
	}
];

console.log(
	'next.config.js',
	JSON.stringify(module.exports, null, 2)
);

// i18n: {
// 	// These are all the locales you want to support in
// 	// your application
// 	locales: ['en-US'],
// 	// This is the default locale you want to be used when visiting
// 	// a non-locale prefixed path e.g. `/hello`
// 	defaultLocale: 'en-US',
// 	// This is a list of locale domains and the default locale they
// 	// should handle (these are only required when setting up domain routing)
// 	// Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
// 	domains: [
// 		{
// 			domain: 'thefaderoominc.com',
// 			defaultLocale: 'en-US'
// 		},
// 		{
// 			domain: 'es.thefaderoominc.com',
// 			defaultLocale: 'es-MX'
// 		},
// 	]
// }
