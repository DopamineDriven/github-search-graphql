import {
	render,
	RenderResult
} from '@testing-library/react';
import { ComponentType } from 'react';
// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"
// The below can be used in a Jest global setup file or similar for your testing set-up
import { loadEnvConfig } from '@next/env';
import React from 'react';

export default async () => {
	const projectDir = process.cwd();
	loadEnvConfig(projectDir);
};
const Providers = ({
	children
}: ComponentType<{}> | undefined | any) => {
	return children;
	// return (
	//   <ThemeProvider theme="light">
	//     <TranslationProvider messages={defaultStrings}>
	//       {children}
	//     </TranslationProvider>
	//   </ThemeProvider>
	// )
};

// Mocks useRouter
type PrefetchOptions = {
	priority?: boolean;
	locale?: string | false;
};

const useRouter = jest.spyOn(
	require('next/router'),
	'useRouter'
);
/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */
export function mockNextUseRouter(props: {
	route: string;
	prefetch(
		url: string,
		asPath?: string,
		options?: PrefetchOptions
	): Promise<void>;
	pathname: string;
	query: string;
	asPath: string;
}) {
	useRouter.mockImplementationOnce(() => ({
		route: props.route,
		prefetch: props.prefetch,
		pathname: props.pathname,
		query: props.query,
		asPath: props.asPath
	}));
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender: (
	ui: React.ReactElement,
	options?: {}
) => RenderResult<
	typeof import('@testing-library/dom/types/queries'),
	HTMLElement
> = (ui, options = {}) =>
	render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

/*
const customRender = (
	ui: React.ReactElement,
	options: RenderOptions<any, HTMLElement> = {}
) =>
	render(ui, {
		wrapper: Providers as React.ComponentType,
		...options
	});
*/
