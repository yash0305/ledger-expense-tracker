# Ledger — Personal Expense Tracker

A full-stack MERN (MongoDB, Express, React, Node) application for logging and
reviewing personal expenses. Add an expense, see it appear instantly in the
list, and watch the running total update — delete anything you no longer
need to track.

## Features

- Add an expense (amount, description, category, date)
- View all expenses in a clean, ledger-style list
- Automatically calculated total spent, always in sync with the list
- Delete any expense
- Responsive, polished UI for desktop and mobile

## Tech Stack

| Layer    | Technology             |
| -------- | ---------------------- |
| Frontend | React 18 + Vite, Axios |
| Backend  | Node.js + Express      |
| Database | MongoDB + Mongoose     |

## Prerequisites

- Node.js 18+
- A MongoDB instance — either:
  - a local MongoDB server (`mongod`), or
  - a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## Setup & Run

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env if your MongoDB URI or port differ from the defaults
npm run dev        # starts on http://localhost:5000 (nodemon)
# or: npm start
```

### 2. Frontend

In a separate terminal:

```bash
cd frontend
npm install
cp .env.example .env
# edit .env if your backend isn't on http://localhost:5000/api
npm run dev         # starts on http://localhost:5173
```

Open `http://localhost:5173` in your browser. The app talks to the API at
the URL set in `frontend/.env` (`VITE_API_URL`).

## API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint        | Description               | Body                                                                                   |
| ------ | --------------- | ------------------------- | -------------------------------------------------------------------------------------- |
| GET    | `/expenses`     | List all expenses + total | —                                                                                      |
| POST   | `/expenses`     | Create an expense         | `{ "amount": 42.5, "description": "Lunch", "category": "Food", "date": "2026-07-29" }` |
| DELETE | `/expenses/:id` | Delete an expense by id   | —                                                                                      |

Valid `category` values: `Food`, `Transport`, `Housing`, `Utilities`,
`Entertainment`, `Health`, `Shopping`, `Education`, `Other`.

### Example responses

`GET /api/expenses`

```json
{
  "success": true,
  "count": 2,
  "total": 68.25,
  "data": [
    {
      "_id": "...",
      "amount": 42.5,
      "description": "Lunch",
      "category": "Food",
      "date": "2026-07-29T00:00:00.000Z"
    },
    {
      "_id": "...",
      "amount": 25.75,
      "description": "Bus pass",
      "category": "Transport",
      "date": "2026-07-28T00:00:00.000Z"
    }
  ]
}
```

`POST /api/expenses` (success) → `201 Created` with the new expense in `data`.

`DELETE /api/expenses/:id` (success) → `200 OK` with the deleted expense in `data`.
# ledger-expense-tracker
