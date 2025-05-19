# Hello Next.js

This is a simple Next.js project with a Hello World page, using TypeScript, Tailwind CSS, and the App Router.

## Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Run the development server

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Creating New Routes (Pages)

This project uses the [App Router](https://nextjs.org/docs/app/building-your-application/routing) (the `src/app` directory).

To add a new route:

1. **Create a new folder** inside `src/app` with the name of your route. For example, to create `/about`, make a folder `src/app/about`.
2. **Add a `page.tsx` file** inside that folder. Example:

```tsx
// src/app/about/page.tsx
export default function AboutPage() {
  return <h1>About Page</h1>;
}
```

Now, visiting [http://localhost:3000/about](http://localhost:3000/about) will show your new page.

## Project Structure

- `src/app/` — Main app directory (routes/pages)
- `src/app/page.tsx` — Home page (`/`)
- `src/app/[route]/page.tsx` — New route (e.g., `/about`)
- `src/app/layout.tsx` — Root layout (shared across all pages)
- `src/app/globals.css` — Global styles (includes Tailwind CSS)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Docs](https://nextjs.org/docs/app/building-your-application/routing)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
