# Bundō Pizza — MERN Pizza Delivery App

A full-stack pizza ordering application built with the MERN stack. Customers browse a menu, manage a cart, pay with Stripe, and track orders. Admins manage users, menu items, and delivery status.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white)

## Live Demo

> Deploy to Vercel and add your live URL here after deployment.

## Features

- Browse a dynamic pizza menu with size and quantity options
- Persistent shopping cart (localStorage + Redux)
- User registration and JWT authentication
- Stripe checkout with NGN currency support
- Order history for logged-in users
- Admin dashboard for users, pizzas, and orders
- Delivery status management
- Production-ready security: bcrypt passwords, protected API routes, environment-based secrets

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Redux, React Router, Bootstrap |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Payments | Stripe |
| Hosting | Vercel (frontend + serverless API) |

## Project Structure

```
├── api/                 # Vercel serverless entry point
├── client/              # React frontend
│   └── src/
│       ├── actions/     # Redux async actions
│       ├── components/  # Reusable UI components
│       ├── reducers/    # Redux reducers
│       └── screens/     # Page views
├── server/              # Express API
│   ├── middleware/      # Auth & error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   └── scripts/         # Database seed script
└── vercel.json          # Vercel deployment config
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [Stripe](https://stripe.com) account (test keys for development)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Pizza-Mern-Application.git
cd Pizza-Mern-Application
```

### 2. Install dependencies

```bash
npm run install:all
```

### 3. Configure environment variables

**Server** — copy `server/.env.example` to `server/.env`:

```bash
cp server/.env.example server/.env
```

**Client** — copy `client/.env.example` to `client/.env`:

```bash
cp client/.env.example client/.env
```

Fill in your MongoDB URI, JWT secret, and Stripe keys.

### 4. Seed the database

```bash
cd server && npm run seed
```

This creates sample pizzas and an admin account:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@bundopizza.com` | `Admin123!` |

### 5. Run locally

**Terminal 1 — API server:**

```bash
npm run start:server
```

**Terminal 2 — React app:**

```bash
npm run dev:client
```

- Frontend: http://localhost:3000
- API: http://localhost:8000

## API Routes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/pizzas/getallpizzas` | Public | List all pizzas |
| POST | `/api/users/register` | Public | Register account |
| POST | `/api/users/login` | Public | Login & receive JWT |
| POST | `/api/orders/placeorder` | Auth | Place order + Stripe payment |
| GET | `/api/orders/getuserorders` | Auth | User order history |
| GET | `/api/users/getallusers` | Admin | List users |
| POST | `/api/pizzas/addpizza` | Admin | Add pizza |
| GET | `/api/orders/getallorders` | Admin | List all orders |

## Deploy to Vercel

### 1. Push to GitHub

Ensure your repo is on GitHub and connected to Vercel.

### 2. Import project in Vercel

- Framework Preset: **Other** (configured via `vercel.json`)
- Root Directory: `.` (project root)

### 3. Set environment variables in Vercel

Add these in **Project Settings → Environment Variables**:

| Variable | Description |
|----------|-------------|
| `MONGO_URL` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random secret string |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `REACT_APP_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `CLIENT_URL` | Your Vercel production URL (e.g. `https://your-app.vercel.app`) |

### 4. Deploy

```bash
vercel --prod
```

### 5. Seed production database

Run the seed script locally pointed at your Atlas cluster:

```bash
cd server
MONGO_URL="your-atlas-uri" npm run seed
```

## Environment Variables

### Server (`server/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URL` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret for signing JWT tokens |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret API key |
| `CLIENT_URL` | No | Allowed frontend origin for CORS |
| `PORT` | No | Server port (default: 8000) |

### Client (`client/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key |
| `REACT_APP_API_URL` | No | API base URL (empty for same-origin on Vercel) |

## Security Notes

- Passwords are hashed with bcrypt before storage
- JWT tokens protect authenticated and admin routes
- Stripe keys and database credentials must never be committed — use `.env` files
- Rotate any keys that were previously committed to version control

## Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install root, server, and client dependencies |
| `npm run build` | Build React app for production |
| `npm run start:server` | Start Express API locally |
| `npm run dev:client` | Start React dev server |
| `cd server && npm run seed` | Seed pizzas and admin user |

## License

ISC

## Author

David Chiedu —  [GitHub](https://github.com/dedestunting)
