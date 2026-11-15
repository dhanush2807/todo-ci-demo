import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['coverage/', 'playwright-report/', 'test-results/'] },
  js.configs.recommended,
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
];
