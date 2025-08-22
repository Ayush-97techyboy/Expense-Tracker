# Expense-Tracker

## Project Overview

- **Stack:** React 18 + Vite, modular CSS, ESLint enforced
- **Purpose:** Track expenses, balances, and visualize data with charts
- **Entry Point:** `src/main.jsx` renders `App` (which loads `pages/Home`)

## Architecture & Patterns

- **Component Structure:**
  - All UI and logic are in `src/Components/` (grouped by feature, e.g., `AddExpenses`, `BarChart`, `TransactionList`)
  - Page-level logic in `src/pages/` (currently only `Home.jsx`)
  - Use functional components and React hooks (`useState`, `useEffect`)
- **Styling:**
  - Use CSS Modules for component styles (e.g., `Button.module.css`)
  - Global styles in `src/index.css` and `src/App.css`
- **State & Data:**
  - Transactions are persisted in `localStorage` (see `Home.jsx`)
  - Data flows from `Home` to child components via props
- **Charts:**
  - Chart components (`PieChart`, `BarChart`) are present but implementation details are in their respective folders

## Developer Workflows

- **Start Dev Server:** `npm run dev` (Vite, hot reload)
- **Build:** `npm run build`
- **Preview Build:** `npm run preview`
- **Lint:** `npm run lint` (uses ESLint with React rules)
- **No test scripts or test files are present**

## Conventions & Practices

- **Component Naming:** PascalCase for files and folders
- **CSS Modules:** Always import as `styles` and use as `styles.className`
- **Props:** Prefer destructuring in function parameters
- **No Redux or Context API:** All state is local or via props
- **No backend/API integration:** All data is local

## Integration & Dependencies

- **Vite:** Handles build and dev server
- **@vitejs/plugin-react:** For React Fast Refresh
- **ESLint:** Enforced via `.eslintrc.cjs` (see rules for React best practices)
- **No external charting or UI libraries detected**

## Examples

- **Add a new component:** Place in `src/Components/FeatureName/`, use a CSS module for styles
- **Persist data:** Use `localStorage` (see `Home.jsx`)
- **Update UI:** Pass data via props from `Home` to child components

## Key Files

- `src/pages/Home.jsx`: Main page, data logic
- `src/Components/`: All UI and feature logic
- `package.json`: Scripts, dependencies
- `.eslintrc.cjs`: Linting rules
