export type PropGetters<TObj extends Record<string, any>> =
	{
		[TKey in string &
			keyof TObj as `get${Capitalize<TKey>}`]: () => TObj[TKey];
	};

// Record<string, any> extended by TObj to resolve a type error on line 16 in its absence
// pertaining to: newObj[getterKey] = () => obj[key]
export function createGetterObject<
	TObj extends Record<string, any>
>(obj: TObj): PropGetters<TObj> {
	const newObj: any = {};
	for (const key of Object.keys(obj)) {
		const capitalizedKey =
			key[0].toUpperCase() + key.substr(1);
		const getterKey = `get${capitalizedKey}`;
		newObj[getterKey] = () => obj[key];
	}
	return newObj;
}
