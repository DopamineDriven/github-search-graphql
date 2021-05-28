module.exports = {
	roots: ['<rootDir>'],
	moduleNameMapper: {
		'^@/components(.*)$': '<rootDir>/components$1',
		'^@/config(.*)$': '<rootDir>/config$1',
		'^@/graphql(.*)$': '<rootDir>/graphql$1',
		'^@/lib(.*)$': '<rootDir>/lib$1',
		'^@/pages(.*)$': '<rootDir>/pages$1',
		'^@/scripts(.*)$': '<rootDir>/scripts$1',
		'^@/styles(.*)$': '<rootDir>/styles$1',
		'^@/test(.*)$': '<rootDir>/test$1',
		'^@/types(.*)$': '<rootDir>/types$1',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/test/__mocks__/fileMock.js',
		'\\.(scss|css|less|sass)$': 'identity-obj-proxy'
	},
	// coverageDirectory: '.coverage',
	moduleFileExtensions: [
		'ts',
		'tsx',
		'js',
		'json',
		'jsx',
		'graphql'
	],
	testPathIgnorePatterns: [
		'<rootDir>[/\\\\](node_modules|.next)[/\\\\]'
	],
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'babel-jest'
	},
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname'
	]
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
	// globals: {
	// 	'ts-jest': {
	// 		tsConfig: 'tsconfig.jest.json'
	// 	}
	// },
	// setupFilesAfterEnv: ['./jest.setup.ts']
};
