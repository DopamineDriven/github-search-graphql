const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');

(async () => {
	const prettierConfig = await prettier.resolveConfig(
		'./.prettierrc'
	);
	const pages = await globby([
		'pages/*.js',
		'pages/*.tsx',
		'pages/*.ts',
		'!pages/[...slug].tsx',
		'!pages/_*.tsx',
		'!pages/_*.ts',
		'!pages/api'
	]);

	const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${pages
			.map(page => {
				const path = page
					.replace('pages', '')
					.replace('.tsx', '')
					.replace('.ts', '')
					.replace('.js', '')
					.replace('.mdx', '');
				const route = path === '/index' ? '' : path;

				return `
			<url>
				<loc>${`https://github-search-graphql.vercel.app${route}`}</loc>
			</url>
		`;
			})
			.join('')}
		</urlset>
    `;

	const formatted = prettier.format(sitemap, {
		...prettierConfig,
		parser: 'html'
	});

	// eslint-disable-next-line no-sync
	fs.writeFileSync('public/sitemap.xml', formatted);
})();
