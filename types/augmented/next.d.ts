import type { Router } from 'next/router';
import { NextApiRequest } from 'next';
import { cookieObj } from '@/lib/session';
import { IncomingMessage } from 'http';
import type { cookieShape } from '../session';

declare module 'next' {
	interface NextApiRequest extends IncomingMessage {
		/**
		 * Object of `query` values from url
		 */
		query: {
			[key: string]: string | string[];
		};
		/**
		 * Object of `cookies` from header
		 */
		cookies: {
			[key: string]: string;
			[cookieObj: string]: string | undefined;
		};
		body: any;
		env: Env;
		preview?: boolean;
		/**
		 * Preview data set on the request, if any
		 * */
		previewData?: PreviewData;
	}
	// type AppProps<P = Record<string, unknown>> = {
	// 	Component: NextComponentType<NextPageContext, any, P>;
	// 	router: Router;
	// 	__N_SSG?: boolean;
	// 	__N_SSP?: boolean;
	// 	pageProps: P & {
	// 		/** Initial session passed in from `getServerSideProps` or `getInitialProps` */

	// 	};
	// };
}
