import { DefaultSeo } from 'next-seo';
import Config from '@/config/next-seo';
import NextHead from 'next/head';

// inject in root _app.tsx file
const Head = () => {
	return (
		<>
			<DefaultSeo {...Config} />
			<NextHead>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<meta property='og:type' content='website' />
				<meta
					property='og:url'
					content='https://github-search-graphql-blond.vercel.app/'
				/>
				<meta
					property='og:title'
					content='GitHub Search GraphQL'
				/>
				<meta
					property='og:image'
					content='https://og-image.vercel.app/**GitHub%20Search%20GraphQL**.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fremojansen%2Flogo.ts%40master%2Fts.svg&widths=auto&heights=300&heights=300'
				/>
			</NextHead>
		</>
	);
};

export default Head;
