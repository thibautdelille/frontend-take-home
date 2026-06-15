# Frontend Take-Home — Submission

React frontend for the WorkOS take-home assignment: a two-tab interface to list, search, update, and delete users and roles.

## How to run

### 1. Start the backend API

From the repo root:

```bash
cd server
npm install
npm run api
```

The API runs on `http://localhost:3002`. It includes intentional latency and random errors to simulate real-world conditions. You can adjust speed with the `SERVER_SPEED` environment variable (`slow` | `instant`).

### 2. Start the client

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:5173`. API requests to `/users` and `/roles` are proxied to the backend.

### 3. (Optional) Start Storybook

```bash
cd client
npm run storybook
```

Storybook runs at `http://localhost:6006` and documents the design system and UI components in isolation.

## Approach

### Data fetching with React Query

I started by adding [TanStack React Query](https://tanstack.com/query/latest) to wrap API calls. This gives graceful loading and error handling out of the box, keeps server state in sync after mutations, and avoids hand-rolling fetch/cache logic.

Custom hooks (`useUsers`, `useRoles`) encapsulate queries and mutations, with shared query keys in `api/query-keys.ts`.

### Design system & Storybook

I installed [Storybook](https://storybook.js.org/) and built a small design system as the foundation for the UI:

- **Typography** — text styles and hierarchy
- **Colors** — CSS custom properties for the palette
- **Button** — primary actions
- **Container** — layout wrapper with consistent spacing

Each primitive has a Storybook story so components can be developed and reviewed in isolation before being composed into screens.

### Generic table component

The main table work focused on a reusable `DataTable` that renders both Users and Roles by transforming domain data into a generic column/row format (`buildTableModel`, column definitions in `tables/`).

The table supports:

- **Typed cell renderers** — strings, dates, labels, user avatars
- **Row actions** — a dropdown menu to update or delete rows
- **Loading & error states** — driven by React Query status

This keeps `TabUser` and `TabRole` thin: they wire data, handlers, and tab-specific UI (search, pagination) around the shared table.

### Toast notifications

A `useToast` hook (via `ToastProvider`) handles success and error messaging for mutations — delete, rename, update — so feedback is consistent across both tabs.

### Tab implementation

Once the shared components were in place, I implemented the content for both tabs:

- **Users** — search/filter, pagination, update name, delete
- **Roles** — list all roles, rename

Both are hooked up to the API through the React Query hooks in `TabUser` and `TabRole`.

Pagination is implemented on the Users tab. Adding it to Roles would follow the same pattern since the table and `Pagination` component are already generic.

## Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [TanStack React Query](https://tanstack.com/query/latest) — server state
- [Radix Themes](https://www.radix-ui.com/themes) — accessible UI primitives (tabs, dialogs)
- [Tailwind CSS](https://tailwindcss.com/) — utility styling
- [Storybook](https://storybook.js.org/) — component development & documentation

## If I had more time

- **Routing** — add [TanStack Router](https://tanstack.com/router/latest) to persist the active tab and search params (page, search) in the URL
- **Testing** — unit tests, interaction tests (Storybook/Vitest), and end-to-end tests (Playwright)
- **Lint rules** — stricter ESLint rules to enforce consistent usage of Radix, React Query, Storybook patterns, etc.
- **Agent docs** — contribution guidelines aimed at AI agents (conventions, folder structure, how to extend the table)
- **CI** — GitHub Actions to run tests, lint, Prettier, and `tsc` on every PR
- **Table features** — filtering and sorting beyond the current search
- **Theming & i18n** — dark mode and internationalization support

## Original assignment

The sections below are from the original take-home brief for reference.

### Design reference

Consult the Figma design file provided with the assignment. The Roles tab was not fully designed — its layout is inferred from the Users tab.

### Backend API

The API provides full CRUD for users and roles. **Do not alter the backend.**

Run backend tests:

```bash
cd server
npm run test
```

### Tasks completed

1. Users and Roles tab structure
2. Users table
3. Search/filter on users
4. Delete user via row actions
5. Roles list in Roles tab
6. Rename role in Roles tab
7. [Bonus] Pagination on users table
