# WSU Workshop: Curated Learning Resources & References

A comprehensive collection of official documentation, industry best practices, interactive training tools, and reference starter repositories for students and instructors.

---

## 1. TypeScript Documentation & Guides

- **[Official TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)**  
  The primary reference guide covering basic types, object types, generics, and compiler options from the ground up.
- **[TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)**  
  A quick-start guide focused on transition strategies for developers already familiar with JavaScript.
- **[Official TypeScript Cheat Sheets](https://www.typescriptlang.org/cheatsheets/)**  
  Downloadable visual references covering types, interfaces, classes, generics, and control-flow analysis.
- **[Interactive TypeScript Playground](https://www.typescriptlang.org/play)**  
  A browser-based IDE to experiment with compiler flags, inspect emitted JavaScript, and view type inference in real time.
- **[Total TypeScript Tutorials & Tips](https://www.totaltypescript.com/tutorials)**  
  Comprehensive, hands-on tutorials by Matt Pocock focusing on modern TypeScript patterns, type transformations, and mental models.

---

## 2. TypeScript Best Practices & Architecture

- **[Type Narrowing & Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)**  
  Learn how to model domain state using explicit tagged unions (as demonstrated in [src/calculator.ts](src/calculator.ts)).
- **[TSConfig Compiler Reference](https://www.typescriptlang.org/tsconfig/)**  
  Detailed documentation for every compiler flag configured in [tsconfig.json](tsconfig.json).
- **[Community TSConfig Bases](https://github.com/tsconfig/bases)**  
  Standardized, battle-tested `tsconfig.json` bases for Node 20+, React, Vite, and libraries.
- **[typescript-eslint Rules Documentation](https://typescript-eslint.io/rules/)**  
  Catalog of strict type-aware lint rules used in [eslint.config.mjs](eslint.config.mjs).

---

## 3. Formatting, Linting & CI Tooling

- **[Prettier Official Documentation](https://prettier.io/docs/en/)**  
  Guidelines on code formatting, CLI integration, and editor plugins.
- **[ESLint 9 Flat Config Migration Guide](https://eslint.org/docs/latest/use/configure/configuration-files)**  
  How the modern `eslint.config.mjs` flat configuration format works.
- **[lint-staged Documentation](https://github.com/lint-staged/lint-staged)**  
  Best practices for running linters and formatters on staged git files.
- **[Husky Git Hooks Guide](https://typicode.github.io/husky/)**  
  Configuring local automated quality gates prior to `git commit` and `git push`.
- **[Vitest Testing Framework Guide](https://vitest.dev/guide/)**  
  Next-generation fast unit testing with native ESM and TypeScript support.
- **[GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)**  
  Reference guide for building CI/CD automation pipelines like [.github/workflows/ci.yml](.github/workflows/ci.yml).

---

## 4. Git & GitHub Interactive Training

- **[GitHub Skills Interactive Courses](https://skills.github.com/)**  
  Free, interactive GitHub-hosted courses covering Git fundamentals, Pull Requests, Merge Conflicts, and GitHub Actions.
- **[Learn Git Branching](https://learngitbranching.js.org/)**  
  The most visual and interactive sandbox for mastering Git branches, rebasing, cherry-picking, and merges.
- **[Pro Git Book (Free Online Version)](https://git-scm.com/book/en/v2)**  
  The definitive, open-source book by Scott Chacon and Ben Straub covering all aspects of Git internals and workflows.
- **[GitHub Git Cheat Sheet (PDF)](https://education.github.com/git-cheat-sheet-education.pdf)**  
  Quick lookup card for daily Git commands (`status`, `commit`, `branch`, `rebase`, `diff`, `stash`).
- **[Conventional Commits Specification](https://www.conventionalcommits.org/)**  
  A lightweight convention for structured commit messages (`feat:`, `fix:`, `chore:`, `refactor:`) that powers automated changelogs.

---

## 5. Sample Projects & Starter Repositories

- **[Microsoft TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter)**  
  Official reference architecture from Microsoft for building scalable TypeScript Node.js backend services.
- **[Vite Starter Templates Collection](https://github.com/vitejs/vite/tree/main/packages/create-vite)**  
  Collection of minimal starters for vanilla TS, React, Vue, and Svelte.
- **[Dev Containers Templates](https://github.com/devcontainers/templates)**  
  Official catalog of community-maintained `.devcontainer` templates for VS Code and GitHub Codespaces.
- **[Vercel Turborepo Starter Examples](https://github.com/vercel/turbo/tree/main/examples)**  
  Production-grade full-stack TypeScript monorepo examples featuring shared linting, formatting, and CI pipelines.
- **[Bulletproof React Architecture Pattern](https://github.com/alan2207/bulletproof-react)**  
  A popular, highly regarded architecture guide and sample repository for structuring large-scale TypeScript web applications.
