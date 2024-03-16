// @ts-check

const noUnusedVarRule = [
  'error',
  {
    args: 'after-used',
    argsIgnorePattern: '^_|#error$|#log$|#info|databaseService$',
    ignoreRestSiblings: true,
    vars: 'all',
    varsIgnorePattern: '^_|#error$|#log$|#info|databaseService$',
  },
];

/** @type {import('eslint').Linter} */
module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vitest/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: './**/*.{spec,test}.{js,jsx,ts,tsx}',
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'vitest'],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': noUnusedVarRule,
    'max-len': [
      'error',
      {
        code: 100,
        ignoreComments: true,
        ignorePattern: '^\\s*:?(class|text)=.*"$',
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
      },
    ],
    'no-unused-vars': 'off',
    // Vitest rules
    'vitest/consistent-test-it': [
      'warn',
      {
        fn: 'it',
        withinDescribe: 'it',
      },
    ],
    'vitest/max-nested-describe': [
      'error',
      {
        max: 5,
      },
    ],
    'vitest/no-commented-out-tests': 'error',
    'vitest/prefer-to-have-length': 'error',
    'vitest/prefer-to-be': 'off',
  },
};
