module.exports = {
	parser: 'babel-eslint',
	extends: [
		'airbnb',
		'plugin:flowtype/recommended',
		'plugin:css-modules/recommended'
	],
	parserOptions: {
		'sourceType': 'module',
		'allowImportExportEverywhere': true,
		'ecmaFeatures': { 'jsx': true }
	},
	plugins: ['flowtype', 'css-modules'],
	globals: { __DEV__: true },
	env: { browser: true },
	rules: {
		'indent': [2, 'tab'],
		'no-tabs': 0,
		'comma-dangle': ['error', 'never'],
		'quote-props': ['error', 'as-needed', { 'unnecessary': false }],
		'function-paren-newline': ['off', 'multiline'],
		'object-curly-newline': ['off'],
		'css-modules/no-unused-class': [2, { 'camelCase': true }],
		'css-modules/no-undef-class': [2, { 'camelCase': true }],
		'import/no-extraneous-dependencies': ['error', { packageDir: '.' }],
		'import/extension': [2, 'never', { 'packages': 'always' }],
		'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
		'prefer-destructuring': [
			'error',
			{
				VariableDeclarator: { array: false, object: true },
				AssignmentExpression: { array: false, object: false }
			},
			{ enforceForRenamedProperties: false }
		],
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: ['Link'],
				specialLink: ['to'],
				aspects: ['noHref', 'invalidHref', 'preferButton']
			}
		],
		'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
		'react/prefer-stateless-function': 'off',
		'react/prop-types': [0],
		'react/jsx-indent': [1, 'tab'],
		'react/jsx-indent-props': [2, 0],
		'react/no-unused-state': ['off'],
		'react/sort-comp': [0],
		'max-len': ['error', 140, 2, {
			ignoreUrls: true,
			ignoreComments: false,
			ignoreRegExpLiterals: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
		}],
	},
	settings: {
		'import/resolver': {
			node: {
				moduleDirectory: ['node_modules', 'src'],
				extensions: ['.js', '.jsx', '.scss', '.json'],
				'import/extensions': ['.js', '.jsx', '.scss', '.json']
			}
		}
	}
};
