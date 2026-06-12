# Client

React + Vite frontend for the WorkOS take-home assignment.

## Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [Radix Themes](https://www.radix-ui.com/themes) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility styling

## Getting started

From the repo root, start the backend API first:

```bash
cd server
npm install
npm run api
```

Then, in a separate terminal:

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:5173`. API requests to `/users` and `/roles` are proxied to the backend on port `3002`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint
