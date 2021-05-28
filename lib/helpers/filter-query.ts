// removes empty query params from query obj
export const filterQuery = (query: any) =>
	Object.keys(query).reduce<any>((obj, key) => {
		if (query[key]?.length) {
			obj[key] = query[key];
		}
		return obj;
	}, {});

/**
 *   
// removes empty query params from query obj
export const filterQuery = <T extends Record<string, any>>(
	query: T
) => {
	Object.keys(query).reduce<Record<string, any>>(
		(obj, key) => {
			if (query[key]?.length) {
				obj[key] = query[key];
			}
			return obj;
		},
		{}
	);
};
 */
