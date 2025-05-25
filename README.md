# Hello Next.js

This is a full-stack application with a Next.js frontend and Node.js/Express backend, featuring a word list management system.

## Project Structure

```
.
├── src/                # Next.js frontend
│   └── app/           # App Router pages
├── backend/           # Node.js/Express backend
│   └── server.js      # Backend API implementation
├── public/            # Static files
├── package.json       # Frontend dependencies
└── README.md
```

## Backend Setup (Node.js/Express)

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install express cors
   ```

3. Run the Express server:
   ```bash
   node server.js
   ```

The backend server will start on `http://localhost:8080` with the following endpoints:
- `GET /api/words` - Get all words
- `POST /api/words/add` - Add a new word

## Frontend Setup (Next.js)

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Running the Full Stack

1. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```

2. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

3. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## API Endpoints

### GET /api/words
Returns a list of all words.

Response:
```json
[
  { "text": "Hello" },
  { "text": "World" }
]
```

### POST /api/words/add
Adds a new word to the list.

Request:
```json
{
  "text": "New Word"
}
```

Response:
```json
{
  "text": "New Word"
}
```

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

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Docs](https://nextjs.org/docs/app/building-your-application/routing)
- [Express.js Documentation](https://expressjs.com/)
- [CORS Documentation](https://expressjs.com/en/resources/middleware/cors.html)
