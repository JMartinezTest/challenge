import pluginCypress from "eslint-plugin-cypress/flat";
import tseslint from "typescript-eslint";
import pluginPrettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Prettier
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  // Cypress
  {
    plugins: {
      cypress: pluginCypress,
    },
    rules: {},
  },

  // TypeScript rules
  ...tseslint.configs.recommended,
]);
