import random from 'lodash.random';

export function getRandomPairOfColors() {
	const colors = [
		'#d7be69',
		'#141415',
		'#b3912a',
		'#272729'
	];
	const getRandomIdx = () => random(0, colors.length - 1);
	const idx = getRandomIdx();
	let idx2 = getRandomIdx();

	// Has to be a different color
	while (idx2 === idx) {
		idx2 = getRandomIdx();
	}

	// Returns a pair of colors
	return [colors[idx], colors[idx2]];
}
