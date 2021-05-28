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
		return config;
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
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US'
	}
});

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
