import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "*.config.js",
      "*.config.ts",
      "*.config.mjs",
      "next-env.d.ts", // Next.js generated file
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // Using TypeScript for props
      "@typescript-eslint/no-explicit-any": "warn", // Allow any but warn
      "@typescript-eslint/no-unused-vars": "warn", // Warn instead of error
      "@typescript-eslint/ban-ts-comment": "warn", // Warn for @ts-ignore
      "@typescript-eslint/no-require-imports": "off", // Allow require in setup files
    },
  },
];
