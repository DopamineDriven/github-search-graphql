import Document, {
	Head,
	Html,
	Main,
	NextScript,
	DocumentContext,
	DocumentProps,
	DocumentInitialProps
} from 'next/document';
import { GA_TRACKING_ID } from '@/lib/analytics';
export default class FadeDocument extends Document<
	DocumentProps | unknown
> {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const originalRenderPage = ctx.renderPage;
		const initialProps = await Document.getInitialProps(ctx);
		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => <App {...props} />
				});
		} catch (error) {
			console.log(error);
		}
		return {
			...initialProps,
			styles: <>{initialProps.styles}</>
		};
	}

	render() {
		return (
			<Html lang='en-US'>
				<Head>
					<meta charSet='utf-8' />
					<link
						rel='stylesheet'
						href='https://rsms.me/inter/inter.css'
					/>
					<link rel='shortcut icon' href='/meta/favicon.ico' />
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `window.dataLayer = window.dataLayer || [];
									function gtag(){dataLayer.push(arguments);}
									gtag('js', new Date());

									gtag('config', '${GA_TRACKING_ID}', {
										page: window.location.pathname
									});`
						}}
					/>
				</Head>
				<body className='loading'>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
