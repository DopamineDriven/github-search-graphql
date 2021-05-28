import { ParsedUrlInfo } from '@/types/url-parser';
/**
 * Returns whether or not the app execution context is currently Server-Side or Client-Side
 *
 * @export isServerSide
 * @returns {boolean}
 */
export function isServerSide(): boolean {
	return typeof window === 'undefined';
}

/**
 * Returns whether or not a string is a base64 encoded string to detect preview mode
 *
 * @export isBase64
 * @param {string} str
 * @returns
 */
export function isBase64(str: string): boolean {
	if (!str) {
		return false;
	}

	return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?\n?$/.test(
		str.replace(/\n/g, '')
	);
}

export const previewRegex = /\/preview(\/\w|\?)/;

export function isPreviewPath(uri: string): boolean {
	if (typeof uri === 'string') {
		return previewRegex.test(uri);
	}

	return false;
}

/**
 * Decodes a base64 string, compatible server-side and client-side
 *
 * @export
 * @param {string} decode
 * @returns
 */
export function base64Decode(decode: string): string {
	if (!isBase64(decode)) {
		return decode;
	}
	// is serverside
	if (typeof window === 'undefined') {
		return Buffer.from(decode, 'base64').toString('utf8');
	}

	return atob(decode);
}

/**
 * Encodes a string to base64, compatible server-side and client-side
 *
 * @export
 * @param {string} encode
 * @returns
 */
export function base64Encode(encode: string): string {
	if (typeof window === 'undefined') {
		return Buffer.from(encode, 'utf8').toString('base64');
	}

	return btoa(encode);
}
/**
 * All possible URL forms as depcited in Regex
 *
 * @export URL_REGEX
 * @param {(RegExp)} URL_REGEX
 * @returns
 */
export const URL_REGEX =
	/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;

/**
 * Parses a url into various parts
 *
 * @export parseUrl
 * @param {(string)} url
 * @returns {ParsedUrlInfo}
 */
export function parseUrl(
	url?: string
): ParsedUrlInfo | undefined {
	if (!url) {
		return;
	}

	const parsed = URL_REGEX.exec(url);

	if (!parsed || parsed.length < 1) {
		return;
	}

	return {
		href: parsed[0],
		protocol: parsed[1],
		baseUrl: `${parsed[1]}${parsed[3]}`,
		host: parsed[4],
		pathname: parsed[5],
		search: parsed[6],
		hash: parsed[8]
	};
}
/**
 * Gets query parameters from a url or search string
 *
 * @export
 * @param {string} url
 * @param {string} param
 * @returns {string}
 */
export function getQueryParam(url: string, param: string) {
	if (!url || url.length === 0) {
		return '';
	}

	const parsedUrl = parseUrl(url);

	if (!parsedUrl) {
		return '';
	}

	let query = parsedUrl.search;

	if (query[0] === '?') {
		query = query.substring(1);
	}

	const params = query.split('&');

	for (let i = 0; i < params.length; i += 1) {
		const pair = params[i].split('=');
		if (decodeURIComponent(pair[0]) === param) {
			return decodeURIComponent(pair[1]);
		}
	}

	return '';
}

/**
 * Gets the path without the protocol/host/port from a full URL string
 *
 * @export
 * @param {string} [url]
 * @returns
 */
export function getUrlPath(url?: string): string {
	const parsedUrl = parseUrl(url);

	if (!parsedUrl) {
		return '/';
	}

	return `${parsedUrl?.pathname || '/'}${
		parsedUrl?.search || ''
	}`;
}

export function stripPreviewFromUrlPath(
	urlPath: string
): string {
	if (!urlPath) {
		return urlPath;
	}

	return urlPath.replace(previewRegex, '$1');
}

/**
 * Ensures that a url does not have the specified prefix in it.
 *
 * @export
 * @param {string} url
 * @param {string} [prefix]
 * @returns
 */
export function resolvePrefixedUrlPath(
	url: string,
	prefix?: string
): string {
	let resolvedUrl = url;

	if (prefix) {
		resolvedUrl = url.replace(prefix, '');
	}

	if (resolvedUrl === '') {
		resolvedUrl = '/';
	}

	return resolvedUrl;
}

/**
 * Removes a leading slash from a string if they exist
 *
 * @export
 * @param {(string | undefined)} str
 * @returns
 */
export function trimLeadingSlash(
	str: string | undefined
): string | undefined {
	if (!str) {
		return str;
	}

	if (str[0] === '/') {
		return str.slice(1);
	}

	return str;
}

export function getCookiesFromContext(
	context?: any
): string | undefined {
	if (!context) {
		return;
	}

	if (context.previewData?.serverInfo) {
		return context.previewData.serverInfo.cookie as
			| string
			| undefined;
	}

	if (context.req?.headers?.cookie) {
		return context.req.headers.cookie as string | undefined;
	}

	if (context.headers?.cookie) {
		return context.headers.cookie as string | undefined;
	}

	if (context.cookie != undefined) {
		return context.cookie as string;
	} else {
		return;
	}
}

/**
 * Trims the origin (protocol, host, port) from URL so only the path and query params remain
 */
export function trimOriginFromUrl(url: string): string {
	try {
		const parsedUrl = new URL(url);

		return url.replace(parsedUrl.origin, '');
	} catch (e) {
		return url;
	}
}
