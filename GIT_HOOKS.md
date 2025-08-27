# Git Hooks with Husky

This project uses Husky to manage Git hooks for code quality and consistency.

## Setup

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Initialize Husky:**
   ```bash
   yarn postinstall
   ```

## Available Hooks

### Pre-commit Hook

- **Trigger:** Before each commit
- **Actions:**
  - Runs ESLint with auto-fix
  - Formats code with Prettier
  - Only processes staged files

### Pre-push Hook

- **Trigger:** Before pushing to remote
- **Actions:**
  - Runs TypeScript type checking
  - Runs ESLint validation
  - Ensures code quality before deployment

### Commit Message Hook

- **Trigger:** When creating commit message
- **Actions:**
  - Validates commit message format
  - Enforces conventional commit standards

## Conventional Commit Format

Use this format for commit messages:

```
type(scope): description
```

### Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples:

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login button issue"
git commit -m "docs: update README"
git commit -m "style: format code with prettier"
```

## Manual Commands

You can run these commands manually:

```bash
# Lint and fix code
yarn lint:fix

# Check types
yarn type-check

# Format code
yarn format

# Check formatting
yarn format:check
```

## Troubleshooting

If hooks aren't working:

1. **Check permissions:**

   ```bash
   chmod +x .husky/pre-commit .husky/pre-push .husky/commit-msg
   ```

2. **Reinstall Husky:**

   ```bash
   yarn postinstall
   ```

3. **Verify Git hooks are installed:**

   ```bash
   ls -la .git/hooks/
   ```

4. **Check if Husky is enabled:**
   ```bash
   git config core.hooksPath
   ```
   Should return: `.husky`
