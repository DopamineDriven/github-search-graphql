export class Serializer<T> {
	serialize(inp: T): string {
		return JSON.stringify(inp);
	}
	deserialize(inp: string): JSONified<T> {
		return JSON.parse(inp);
	}
}

export type Widget = {
	toJSON(): {
		kind: 'Widget';
		date: Date;
	};
};

export type Item = {
	text: string;
	count: number;
	// preserve options
	choice: 'yes' | 'no' | null;
	// drop functions
	func: () => void;
	nested: {
		isSaved: boolean;
		data: [1, undefined, 2];
	};
	// pointer to another type
	widget: Widget;
	// Same obj referenced again
	children?: Item[];
};

export type JSONified<T> = JSONifiedValue<
	T extends { toJSON(): infer U } ? U : T
>;

export type JSONifiedValue<T> = T extends
	| string
	| number
	| boolean
	| null
	? T
	: T extends Function
	? never
	: T extends object
	? JSONifiedObject<T>
	: T extends Array<infer U>
	? JSONifiedArray<U>
	: never;

export type JSONifiedObject<T> = {
	[P in keyof T]: JSONifiedObject<T[P]>;
};

export type UndefinedAsNull<T> = T extends undefined
	? null
	: T;

export type JSONifiedArray<T> = Array<
	UndefinedAsNull<JSONified<T>>
>;
