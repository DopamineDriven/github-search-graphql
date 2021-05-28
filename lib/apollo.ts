import { useMemo } from 'react';
import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
	HttpLink
} from '@apollo/client';
import result from '@/graphql/fragment-matcher';
import fetch from 'isomorphic-unfetch';
import { GetViewerDocument } from '../graphql/graphql';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
const token =
	process.env.NEXT_PUBLIC_GITHUB_OAUTH_TOKEN ?? '';
const authorization = `Bearer ${token}`;

let apolloClient:
	| ApolloClient<NormalizedCacheObject>
	| undefined;

function createApolloClient() {
	const httpLink = new HttpLink({
		uri: `https://api.github.com/graphql`,
		headers: {
			authorization
		},
		credentials: 'include',
		...(typeof window !== undefined && { fetch })
	});
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: httpLink,
		cache: new InMemoryCache({
			possibleTypes: result.possibleTypes
		})
	});
}

export function initializeApollo(initialState: any = null) {
	const _apolloClient = apolloClient ?? createApolloClient();
	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	_apolloClient
		.query({ query: GetViewerDocument })
		.then(x => console.log(x.data ?? 'no data'));
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();
		// Merge the existing cache into data passed from getStaticProps/getServerSideProps
		const data = { ...existingCache, ...initialState };
		// const data = deepmerge(initialState, existingCache, { clone: false });
		// Restore the cache with the merged data
		_apolloClient.cache.restore(data);
	}
	// for SSG and SSR ALWAYS create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient;
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;
	return _apolloClient;
}

export function addApolloState(
	client: any,
	pageProps: any
) {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] =
			client.cache.extract();
	}

	return pageProps;
}

export function useApollo(pageProps: any) {
	const state = pageProps[APOLLO_STATE_PROP_NAME];
	const store = useMemo(
		() => initializeApollo(state),
		[state]
	);
	return store;
}
