import Head from 'next/head';

const MetaData = () => {
	return (
		<>
			<Head>
				<link
					rel='apple-icon-57x57'
					type='img/png'
					sizes='57x57'
					href='/meta/apple-icon-57x57.png'
				/>
				<link
					rel='apple-icon-60x60'
					type='img/png'
					sizes='60x60'
					href='/meta/apple-icon-60x60.png'
				/>
				<link
					rel='apple-icon-72x72'
					type='img/png'
					sizes='72x72'
					href='/meta/apple-icon-72x72.png'
				/>
				<link
					rel='apple-icon-76x76'
					type='img/png'
					sizes='76x76'
					href='/meta/apple-icon-76x76.png'
				/>
				<link
					rel='apple-icon-114x114'
					type='img/png'
					sizes='114x114'
					href='/meta/apple-icon-114x114.png'
				/>
				<link
					rel='apple-icon-120x120'
					type='img/png'
					sizes='120x120'
					href='/meta/apple-icon-120x120.png'
				/>
				<link
					rel='apple-icon-144x144'
					type='img/png'
					sizes='144x144'
					href='/meta/apple-icon-144x144.png'
				/>
				<link
					rel='apple-icon-152x152'
					type='img/png'
					sizes='152x152'
					href='/meta/apple-icon-152x152.png'
				/>
				<link
					rel='apple-icon-precomposed'
					type='img/png'
					sizes='192x192'
					href='/meta/apple-icon-precomposed.png'
				/>
				<link
					rel='apple-icon'
					type='img/png'
					sizes='192x192'
					href='/meta/apple-icon.png'
				/>
				<link
					rel='apple-icon'
					type='img/png'
					sizes='152x152'
					href='/meta/apple-icon-152x152.png'
				/>
				<link
					rel='apple-touch-icon'
					type='img/png'
					sizes='180x180'
					href='/meta/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/meta/favicon-16x16.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/meta/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='96x96'
					href='/meta/favicon-96x96.png'
				/>
				<meta charSet='utf-8' />
				<link rel='manifest' href='/meta/site.webmanifest' />
				<link
					rel='mask-icon'
					href='/meta/safari-pinned-tab.svg'
					color='#000000'
				/>
				<link rel='shortcut icon' href='/meta/favicon.ico' />
				<link
					rel='canonical'
					href={'https://github-search-graphql.vercel.app'}
				/>
				<meta name='robots' content='all' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5'
					key='viewport'
				/>
				<meta name='format-detection' content='telephone=no' />
				<title>{'GitHub Search GraphQL'}</title>
				<meta
					name='msapplication-TileColor'
					content='#000000'
				/>
				<meta
					name='msapplication-config'
					content='/meta/browserconfig.xml'
				/>
				<meta name='theme-color' content='#000000' />
				{/* <link
					rel='alternate'
					type='application/rss+xml'
					href='/feed.xml'
				/> */}
				<meta
					name='description'
					content={
						'%s | TypeSafe GraphQL-to-TypeScript Code Generation/Consumption powered by OneGraph + GitHub '
					}
				/>
				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta
					name='keywords'
					content='nextjs, typescript, react, WPGraphQL, Apollo, GraphQL, OneGraph, HeadlessUI, tailwindcss, vercel, figma'
				/>
				<meta
					name='twitter:card'
					content='summary_large_image'
				/>
				<meta name='twitter:site' content='@Dopamine_Driven' />
				<meta
					name='twitter:title'
					content='Andrew Ross — Full-Stack Engineer'
				/>
				<meta
					name='twitter:description'
					content={
						'TypeSafe GraphQL-to-TypeScript Code Generation/Consumption powered by OneGraph + GitHub + Apollo Client - https://github-search-graphql.vercel.app/'
					}
				/>
				<meta
					name='twitter:image'
					content={
						'https://og-image.vercel.app/**GitHub%20Search%20GraphQL**.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fremojansen%2Flogo.ts%40master%2Fts.svg&widths=auto&heights=300&heights=300'
					}
				/>
				<meta
					name='twitter:creator'
					content='@Dopamine_Driven'
				/>
				<meta property='og:type' content='website' />
				<meta
					property='og:url'
					content='https://github-search-graphql.vercel.app'
				/>
				<meta
					property='og:title'
					content='GitHub Search GraphQL'
				/>
				<meta
					property='og:description'
					content={
						'TypeSafe GraphQL-to-TypeScript Code Generation/Consumption powered by OneGraph + GitHub + Apollo Client - https://github-search-graphql.vercel.app/'
					}
				/>
				<meta
					property='og:image'
					content={
						'https://og-image.vercel.app/**GitHub%20Search%20GraphQL**.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fremojansen%2Flogo.ts%40master%2Fts.svg&widths=auto&heights=300&heights=300'
					}
				/>
				<meta property='og:image:width' content='2048' />
				<meta property='og:image:height' content='1170' />
			</Head>
		</>
	);
};

export default MetaData;
