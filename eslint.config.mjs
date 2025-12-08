import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nodePlugin from 'eslint-plugin-node';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Base JS rules
  {
    files: ['**/*.{js,cjs,mjs,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      globals: { ...globals.browser, ...globals.node },
    },
    extends: [js.configs.recommended],
  },

  // TypeScript
  ...tseslint.configs.recommended,

  // React frontend
  {
    files: ['packages/frontend/**/*.{ts,tsx}'],
    plugins: { react: reactPlugin, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    extends: [reactPlugin.configs.flat.recommended, prettier],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
    },
  },

  // Node backend
  {
    files: ['packages/backend/**/*.{ts,js}'],
    plugins: { node: nodePlugin },
    extends: [nodePlugin.configs.recommended, prettier],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'node/no-unsupported-features/es-syntax': 'off',
    },
  },

  prettier,
]);
