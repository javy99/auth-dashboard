# Authentication Example

[O'zbekcha versiya](README.uz.md)

This is an example/template codebase for JWT authentication in a React.js application. It uses a simple server to handle the authentication logic. The main focus of this project is to demonstrate how to implement:

- User registration
- User login
- User logout
- Protected routes
- Persisting the user's authentication state
- Token rotations

## Getting Started

### Backend

Install [Deno](https://deno.land/).

Run backend server first. It will start on port 8000.

```bash
cd backend
deno run --allow-net --allow-read main.ts
```

The database is a **simple memory store**. It will be reset every time the server is restarted. There a one user pre-registered with the following credentials:

- Email: `admin@x.com`
- Password: `12345`

Backend is configured to work with frontend on `http://localhost:5173`. If you want to change the frontend URL, you can do so by changing the `Access-Control-Allow-Origin` header in `backend/middleware/cors.ts`.

### Frontend

Run frontend server. It will start on port 5173.

```bash
cd frontend
yarn install
yarn dev
```


## Technologies

### Frontend

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [React Query](https://react-query.tanstack.com/)
- [Ky.js](https://github.com/sindresorhus/ky)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend

- [Deno](https://deno.land/)
- [Oak](https://oakserver.github.io/oak/)
