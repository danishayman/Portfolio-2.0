import { dirname } from "path";
import { fileURLToPath } from "url";
import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // Next.js core rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      "@next/next/no-css-tags": "error",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-head-element": "error",
      "@next/next/no-head-import-in-document": "error",
      "@next/next/no-unwanted-polyfillio": "error",
      "@next/next/no-before-interactive-script-outside-document": "error",
      "@next/next/no-typos": "error",
      "@next/next/no-duplicate-head": "error",
      
      // Core Web Vitals
      "@next/next/no-page-custom-font": "warn",
      
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": "warn",
    }
  }
];
