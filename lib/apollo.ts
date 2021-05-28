import { useMemo } from 'react';
import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
	ApolloLink,
	HttpLink
} from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import { IncomingHttpHeaders } from 'http';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { AppInitialProps, AppProps } from 'next/app';
import { mergeDeep } from '@apollo/client/utilities';

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient:
	| ApolloClient<NormalizedCacheObject>
	| undefined;

const token = process.env.GITHUB_OAUTH_TOKEN ?? '';
const githubEndpoint =
	process.env.NEXT_PUBLIC_GITHUB_GRAPHQL_ENDPOINT ?? '';

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
	// ctx?: NextPageContext
	// isomorphic unfetch -- pass cookies along with each GraphQL request
	const enhancedFetch = async (
		url: RequestInfo,
		init: RequestInit
	): Promise<
		Response extends null | undefined ? never : Response
	> => {
		const res = await fetch(url, {
			...init,
			headers: {
				...init.headers,
				'Access-Control-Allow-Origin': '*',
				Authorization: `Bearer ${token}`
			},
			credentials: 'include'
		});
		return res ?? '';
	};
	const httpLink = new HttpLink({
		uri: `${githubEndpoint}`
		// fetchOptions: {
		// 	mode: 'cors'
		// }
	});
	const authLink: ApolloLink = setContext(
		(req, { ...headers }: Headers) => {
			console.log(req.context);
			return {
				headers: {
					...headers,
					'Accept-Encoding': 'gzip',
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json; charset=utf-8',
					authorization: `Bearer ${token}`
				}

				// ...(typeof window !== undefined && { fetch })
			};
		}
	);
	const errorLink: ApolloLink = onError(
		({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.forEach(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
					)
				);
			if (networkError)
				console.log(
					`[Network error]: ${networkError}. Backend is unreachable. Is it running?`
				);
		}
	);

	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: authLink.concat(httpLink) ?? errorLink,
		connectToDevTools: true,
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						// typeof: definition
						// merge?: boolean | FieldMergeFunction<TExisting, TIncoming> | undefined;
						// mergeObjects: FieldFunctionOptions<Record<string, any>, Record<string, any>>
						Search: {
							merge(existing, incoming, { mergeObjects }) {
								// Invoking nested merge functions
								// console.log('existing WP', existing ?? '');
								// console.log('incoming WP ', incoming ?? '');
								return mergeObjects(existing, incoming);
							}
						},
						google: {
							merge(existing, incoming, { mergeObjects }) {
								// Invoking nested merge functions
								// console.log('existing google ', existing ?? '');
								// console.log('incoming google ', incoming ?? '');
								return mergeObjects(existing, incoming);
							}
						}
					}
				}
			}
		})
	});
}
type InitialState = NormalizedCacheObject | any;

type IInitializeApollo = {
	headers?: null | IncomingHttpHeaders;
	initialState?: InitialState | null;
};
export function initializeApollo(
	{ headers, initialState }: IInitializeApollo = {
		headers: null,
		initialState: null
	}
) {
	const _apolloClient = createApolloClient();
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();
		// Merge the existing cache into data passed from getStaticProps/getServerSideProps
		const data = { ...existingCache, ...initialState };
		// deep merge approach doesn't seem to play well with invoked nested merge functions in MemoryCache
		// const data = mergeDeep(initialState, existingCache, {
		// 	arrayMerge: (destinationArray, sourceArray) => [
		// 		...sourceArray,
		// 		...destinationArray.filter(d =>
		// 			sourceArray.every(s => !isEqual(d, s))
		// 		)
		// 	]
		// });
		// Restore the cache with the merged data

		_apolloClient.cache.restore(data);
	}

	// always create a new Apollo Client
	// server
	if (typeof window === 'undefined') return _apolloClient;

	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;
	return _apolloClient;
}

export function addApolloState(
	client: ApolloClient<NormalizedCacheObject> | any,
	pageProps: any
) {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] =
			client.cache.extract();
	}
	return pageProps;
}

export function useApollo(pageProps: any) {
	const state = pageProps[APOLLO_STATE_PROP_NAME ?? ''];
	const store = useMemo(
		() => initializeApollo(state),
		[state]
	);
	return store;
}

/**
 * @const {enhancedFetch}
 * 	// const enhancedFetch = async (
	// 	url: RequestInfo,
	// 	init?: RequestInit
	// ): Promise<Response> => {
	// 	return await fetch(url, {
	// 		...init,
	// 		headers: {
	// 			...init?.headers,
	// 			'Access-Control-Allow-Origin': '*',
	// 			Cookie: headers?.cookie ?? ''
	// 		}
	// 	}).then(response => response);
	// };
	// const token = session?.jwt?.toString() ?? '';
	// const token =
	// 	getAccessToken(options) ?? getAccessTokenAsCookie(options);
 */

/*
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  // isomorphic fetch for passing the cookies along with each GraphQL request
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        'Access-Control-Allow-Origin': '*',
        // here we pass the cookie along for each request
        Cookie: headers?.cookie ?? '',
      },
    }).then((response) => response)
  }

  return new ApolloClient({
    // SSR only for Node.js
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          )
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink({
        uri: 'http://localhost:3000/api/graphql',
        // Make sure that CORS and cookies work
        fetchOptions: {
          mode: 'cors',
        },
        credentials: 'include',
        fetch: enhancedFetch,
      }),
    ]),
    cache: new InMemoryCache(),
  })
}

*/
// headers: {
// 	'Content-Type': 'application/json; charset=utf-8',
// 	authorization: `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`,
// 	'X-JWT-': token ? `Bearer ${token}` : ''
// },
// https://www.rockyourcode.com/nextjs-with-apollo-ssr-cookies-and-typescript/
// 	{
// 	cookies: getCookiesFromContext(
// 		WORDPRESS_USER_TOKEN_COOKIE ?? context
// 	)
// }
// );
// If your page has Next.js data fetching methods that use Apollo Client, the initial state
// gets hydrated here
