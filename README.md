# Task Management Dashboard

A lightweight task management dashboard built with Vue 3, Pinia, and json-server.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

## Setup

1. **Clone or extract the project** into a folder on your machine.

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the App

Start both the Vue app and the API server with a single command:

```bash
npm run start
```

This runs both servers together:
- Vue dev server → `http://localhost:5173`
- json-server (mock API) → `http://localhost:3001`

> **Important:** You must use `npm run start`, not `npm run dev`.  
> The app will show a connection error if the API server is not running.

Then open your browser and go to:

```
http://localhost:5173
```

### Alternative: two separate terminals

If `npm run start` doesn't work on your machine, run each server in its own terminal:

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run api
```

## Login Credentials

```
Email:    admin@taskapp.com
Password: password123
```

## Features

- Login / logout with session persistence
- View all tasks in a card grid
- Create, edit, and delete tasks
- Task statuses: To Do, In Progress, Done

## Project Structure

```
src/
  api/         # Axios API calls
  components/  # TaskCard, TaskForm
  router/      # Vue Router with auth guard
  stores/      # Pinia stores (auth, tasks)
  views/       # LoginView, DashboardView
db.json        # Mock database (json-server)
```
