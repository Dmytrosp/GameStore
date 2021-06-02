module.exports = {
  extends: ['airbnb', 'prettier', 'plugin:node/recommended'],
  plugins: ['prettier', 'jest'],
  env: {
    'jest/globals': true,
  },

  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'spaced-comment': 'off',
    'no-console': 'warn',
    'consistent-return': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-process-exit': 'off',
    'no-param-reassign': 'off',
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
    'class-methods-use-this': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: 'req|res|next|val' },
    ],
  },
};
