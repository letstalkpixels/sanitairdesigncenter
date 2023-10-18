module.exports = {
    parser: '@typescript-eslint/parser', // Set parser to typescript-eslint
    extends: [
        'plugin:@typescript-eslint/recommended', // Add typescript rullset
        'prettier/@typescript-eslint', // Disable ESLint rules that conflict with prettier
        'plugin:prettier/recommended', // Enable eslint-plugin-prettier
    ],
    parserOptions: {
        ecmaVersion: 2018, // Enable ECMA script support
        sourceType: 'module', // Enable imports support
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    },
};
