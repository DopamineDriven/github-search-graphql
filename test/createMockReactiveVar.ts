import { ReactiveVar } from '@apollo/client';

// This is how to create a mock reactive variable.
// It's a good idea to do this because then we can test our
// interaction logic.
// const ReactiveVar = jest.spyOn(
// 	require('@apollo/client'),
// 	'ReactiveVar'
// );
export function createMockReactiveVar<T>(
	defaultValue?: T
): any {
	let currentValue: T | undefined = defaultValue;

	return function ReactiveVar(newValue?: T): T {
		if (newValue) {
			currentValue = newValue;
		}
		return currentValue as T;
	};
}
