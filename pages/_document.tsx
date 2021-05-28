import Document, {
	Head,
	Html,
	Main,
	NextScript,
	DocumentContext,
	DocumentProps,
	DocumentInitialProps
} from 'next/document';

// export default class FadeDocument extends Document<
// 	DocumentProps | unknown
// > {
// 	static async getInitialProps(
// 		ctx: DocumentContext
// 	): Promise<DocumentInitialProps> {
// 		const originalRenderPage = ctx.renderPage;
// 		const initialProps = await Document.getInitialProps(ctx);
// 		try {
// 			ctx.renderPage = () =>
// 				originalRenderPage({
// 					enhanceApp: App => props => <App {...props} />
// 				});
// 		} catch (error) {
// 			console.log(error);
// 		}
// 		return {
// 			...initialProps,
// 			styles: <>{initialProps.styles}</>
// 		};
// 	}
export default class GitHubSearch extends Document {
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
				</Head>
				<body className='loading'>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

/* <script
	type='text/javascript'
	src={`https://maps.googleapis.com/maps/api/js?v=beta&key=${googleMapsKey}&callback=initMap`}
/> */
