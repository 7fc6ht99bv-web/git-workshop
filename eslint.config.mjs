/**
 * ============================================================================
 * WSU Workshop: TypeScript & CI/CD Demo - ESLint Flat Config
 * ============================================================================
 *
 * CONCEPT: Static Analysis & Linting (ESLint 9+ Flat Config)
 * ----------------------------------------------------------------------------
 * A linter scans source code without executing it to enforce:
 * 1. Bug Prevention: Flags common logic errors, unreachable code, unhandled edge cases.
 * 2. Type Rigor: Enforces TypeScript safety rules that standard tsc doesn't catch.
 * 3. Team Consistency: Guarantees uniform syntax conventions across entire engineering teams.
 *
 * LECTURE TALKING POINTS:
 * - What is "Flat Config"? ESLint 9+ replaced the legacy `.eslintrc.json` hierarchy
 *   with standard JavaScript/ESM configuration objects (`eslint.config.mjs`).
 * - Why separate Linting from Formatting?
 *   - Linter (ESLint): Focuses on CODE QUALITY & LOGIC (e.g. no unused variables, no `any`).
 *   - Formatter (Prettier): Focuses on CODE AESTHETICS (e.g. line lengths, indentation, quotes).
 *   - `eslint-config-prettier` disables conflicting ESLint formatting rules so both tools work harmoniously.
 * ============================================================================
 */

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  // 1. Base ESLint Recommended Rules
  // Catches standard JavaScript runtime bugs and syntax pitfalls.
  eslint.configs.recommended,

  // 2. TypeScript-Specific Strict Type-Aware Rules
  // Leverages the TypeScript compiler's type information to detect complex bugs
  // (e.g. misuse of Promises, unsafe type assertions, unhandled nullable values).
  ...tseslint.configs.strictTypeChecked,

  // 3. Stylistic TypeScript Rules
  // Enforces clean and modern TypeScript coding patterns across the workspace.
  ...tseslint.configs.stylisticTypeChecked,

  // 4. Prettier Integration Config
  // Turns off all ESLint formatting rules that might conflict with Prettier.
  // Prettier is solely responsible for whitespace, commas, quotes, and line wrapping.
  prettierConfig,

  // 5. Custom Project Configuration & Rule Overrides
  {
    languageOptions: {
      parserOptions: {
        // Enables TypeScript Project Service for high-performance, type-aware linting
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // RULE: No Explicit `any`
      // Forbids using `any`, which disables TypeScript's type checker and eliminates type safety.
      // If a type is truly unknown, developers should use `unknown` and perform runtime narrowing.
      "@typescript-eslint/no-explicit-any": "error",

      // RULE: Consistent Type Definitions
      // Enforces using `type` instead of `interface` for consistent data structure declarations.
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },

  // 6. Global Ignore Patterns
  // Specifies generated build artifacts, vendor files, and config files that ESLint should skip.
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "eslint.config.mjs"],
  },
);
