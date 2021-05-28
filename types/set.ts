export class SetUtil {
	/**
	 * Create a set that contains those elements of arrayOne that are also in arrayTwo.
	 * @param arrayOne
	 * @param arrayTwo
	 */
	public static intersection<T>(
		arrayOne: T[],
		arrayTwo: T[]
	): Set<T> {
		return new Set(
			[...arrayOne].filter(value => arrayTwo.includes(value))
		);
	}

	/**
	 * Create a set that contains those elements of arrayOne that are not in set arrayTwo
	 * @param arrayOne
	 * @param arrayTwo
	 */
	public static difference<T>(
		arrayOne: T[],
		arrayTwo: T[]
	): Set<T> {
		const difference = new Set(arrayOne);

		for (const value of arrayTwo) {
			difference.delete(value);
		}

		return difference;
	}
}
