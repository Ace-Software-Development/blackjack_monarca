module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'eslint-config-prettier',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-indent': [2, 4],
        'linebreak-style': 0,
        indent: ['error', 4, { ignoredNodes: ['JSXElement *'] }],
    // example: 'no-undef': 'warn',
    },
};
