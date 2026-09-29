# Workshop Reference: `package.json` & `.lintstagedrc.json`

This guide explains the architecture, purpose, and key configuration options in `package.json` and `.lintstagedrc.json` for lecture discussions and beginner reference.

---

## 1. `package.json` Deep-Dive

### What is `package.json`?

`package.json` is the manifest for any Node.js/JavaScript/TypeScript project. It defines:

- **Project metadata** (name, version, module system).
- **Automation scripts** (build, test, lint, format).
- **Dependencies** (external libraries required at runtime or build time).

---

### Key Properties

#### `"type": "module"`

Enables **ECMAScript Modules (ESM)** natively. This allows using standard modern syntax such as `import ... from "..."` and `export` instead of legacy CommonJS (`require()` / `module.exports`).

#### `"private": true`

Prevents accidental publishing of this workspace or starter repository to the public npm registry.

---

### Scripts Breakdown (`"scripts"`)

| Script         | Command              | Purpose & Lecture Talking Points                                                                                                                                                                 |
| :------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev`          | `vite`               | Launches a local hot-reloading development server to open and interact with the UI in `index.html`.                                                                                              |
| `build`        | `tsc`                | Compiles TypeScript source files into JavaScript according to rules defined in `tsconfig.json`.                                                                                                  |
| `typecheck`    | `tsc --noEmit`       | Runs the TypeScript compiler in **check-only mode**. It verifies that types and interfaces match across the whole project without writing `.js` files to disk. Ideal for rapid CI quality gates. |
| `lint`         | `eslint .`           | Runs ESLint across all files to detect logical bugs, syntax errors, and anti-patterns.                                                                                                           |
| `lint:fix`     | `eslint . --fix`     | Automatically fixes auto-fixable ESLint rules across the project.                                                                                                                                |
| `format`       | `prettier --write .` | Formats all supported files in-place according to `.prettierrc` rules (indentation, line wrapping, quotes).                                                                                      |
| `format:check` | `prettier --check .` | Verifies whether all files match formatting standards without modifying them. Fails with exit code 1 if any unformatted files exist (used in CI).                                                |
| `test`         | `vitest run`         | Runs unit tests once and exits (non-interactive, perfect for CI/CD).                                                                                                                             |
| `prepare`      | `husky`              | A special npm lifecycle hook that executes automatically when anyone runs `npm install`. It initializes Husky Git hooks in the `.husky/` directory.                                              |

---

### Development Dependencies (`"devDependencies"`)

Why `devDependencies` instead of `dependencies`?  
Tools used strictly for compiling, testing, linting, and formatting are only needed on developer machines and in CI pipelines—not at production runtime.

- **`vite`**: Zero-config lightning-fast dev server with native ESM & TypeScript support for interactive browser UI testing.
- **`typescript` & `typescript-eslint`**: Provide the TypeScript compiler and type-aware lint rules for ESLint.
- **`eslint` & `@eslint/js`**: Core static analysis engine.
- **`eslint-config-prettier`**: Turns off conflicting ESLint formatting rules so Prettier handles code formatting exclusively.
- **`prettier`**: Opinionated code formatter.
- **`vitest`**: High-performance unit testing framework.
- **`husky`**: Local Git hook manager (runs tasks before `git commit` or `git push`).
- **`lint-staged`**: Runs linters/formatters only on staged files.

---

## 2. `.lintstagedrc.json` Deep-Dive

### What is `lint-staged`?

When developers make commits, running full linting and formatting across thousands of repository files can be slow.  
`lint-staged` intercepts the `git commit` command via Husky and runs tasks **only on files currently in Git's staging area** (`git add`).

```
[Developer edits files] -> [git add .] -> [git commit]
                                               │
                                               ▼
                                      [Husky pre-commit]
                                               │
                                               ▼
                                         [lint-staged]
                              (runs Prettier & ESLint only on staged files)
                                               │
                                               ▼
                                         [Commit Created!]
```

---

### Configuration Breakdown

```json
{
  "*.{ts,tsx}": ["prettier --write", "eslint --fix"],
  "*.{json,md,yaml,yml}": ["prettier --write"]
}
```

1. **`"*.{ts,tsx}"`**:
   - For all staged TypeScript files:
     1. Runs `prettier --write` to normalize whitespace, quotes, and commas.
     2. Runs `eslint --fix` to enforce type safety, remove unused code, and fix lint rules.
     3. Automatically re-stages the cleaned file before completing the commit.

2. **`"*.{json,md,yaml,yml}"`**:
   - For non-code configuration and documentation files, runs `prettier --write` to ensure clean formatting.

---

### Summary of Benefits for Teams

- **Zero Broken Commits**: Bad syntax or formatting cannot be committed locally.
- **Faster Workflows**: Only staged files are processed, keeping commit speed sub-second.
- **Clean Git History**: Formatting fixes are bundled directly into the author's commit rather than creating noisy "fix formatting" followup commits.

---

## 3. VS Code Virtual Environments (.devcontainer)

To ensure every student has an identical, pre-configured development environment with zero local machine setup hurdles, this repository includes official **VS Code Dev Container** and **GitHub Codespaces** support.

### What is `.devcontainer/devcontainer.json`?

The `.devcontainer` specification allows VS Code to spin up a fully isolated Linux container/VM that automatically configures:

1. **Linux Runtime & Tools**: Ubuntu Linux image with **Node.js 20 LTS** and Git.
2. **Automated Provisioning**: Runs `npm install` automatically on container creation.
3. **Automatic UI Server & Port Forwarding**: Maps port `5173` and automatically opens the browser to the Vite calculator UI upon startup.
4. **Pre-Installed VS Code Extensions**: Automatically installs ESLint, Prettier, and Vitest extensions inside the container with proper workspace settings (format-on-save enabled).

---

### How Students Can Use the VS Code VM

#### Method 1: Local VS Code Dev Containers (Docker / Desktop)

1. Install Docker Desktop and the **Dev Containers** extension in VS Code.
2. Open this folder in VS Code.
3. When prompted, click **"Reopen in Container"** (or press `F1` and select `Dev Containers: Reopen in Container`).
4. VS Code connects inside the isolated VM, installs dependencies, and launches the UI.

#### Method 2: GitHub Codespaces (1-Click Cloud VS Code VM in Browser)

1. On the GitHub repository page, click the green **Code** button.
2. Select the **Codespaces** tab and click **"Create codespace on main"**.
3. A full VS Code browser instance boots up in seconds with all dependencies, extensions, and the interactive UI running on port 5173.

---

### Alternative: Direct Linux / WSL2 Script (`scripts/setup-vm.sh`)

For students using a standalone Linux terminal or WSL2:

```bash
chmod +x scripts/setup-vm.sh
./scripts/setup-vm.sh
```

### Option C: Canonical Multipass (`scripts/launch-multipass.ps1`)

For Windows/Mac students using Multipass:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\launch-multipass.ps1
```

This launches a lightweight Ubuntu VM named `wsu-workshop-vm`, mounts the workshop project folder, executes `setup-vm.sh`, and prints the IP address to open in your browser.
