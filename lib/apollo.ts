import { useMemo } from 'react';
import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	NormalizedCacheObject,
	HttpLink
} from '@apollo/client';
import result from '@/graphql/fragment-matcher';
import fetch from 'isomorphic-unfetch';
import { onError } from '@apollo/client/link/error';
import {
	GetViewerDocument,
	GetViewerQuery
} from '../graphql/graphql';
import { IncomingHttpHeaders } from 'http';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const token = process.env.GITHUB_OAUTH_TOKEN ?? '';
const authorization = `Bearer ${token}`;

let apolloClient:
	| ApolloClient<NormalizedCacheObject>
	| undefined;

function createApolloClient() {
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
		link: httpLink ?? errorLink,
		cache: new InMemoryCache({
			possibleTypes: result.possibleTypes
		})
	});
}
type InitialState = NormalizedCacheObject | any;

type IInitializeApollo = {
	headers?: null | IncomingHttpHeaders;
	initialState?: InitialState | null;
};
export function initializeApollo(initialState: any = null) {
	const _apolloClient = apolloClient ?? createApolloClient();
	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();
		// Merge the existing cache into data passed from getStaticProps/getServerSideProps
		const data = { ...existingCache, ...initialState };

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
