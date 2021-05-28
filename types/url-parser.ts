/**
 * Fractionate a URL into its constitutent parts
 *
 * @interface ParsedUrlInfo
 */
export interface ParsedUrlInfo {
	href: string;
	protocol: string;
	baseUrl: string;
	host: string;
	pathname: string;
	search: string;
	hash: string;
}
