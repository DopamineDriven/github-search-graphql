import fetch from 'isomorphic-unfetch';
import { GitHubSearchReposQuery } from '@/graphql/generated/graphql';

export async function fetcher<
	T extends GitHubSearchReposQuery
>(path: string): Promise<T> {
	const res: Response = await fetch(path);
	return await res.json();
}
