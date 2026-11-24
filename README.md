# Vinyl

An online vinyl record shop.

Browse a catalog of albums, filter and sort it by genre, like items, fill a cart and place an order with an optional discount code. The project is made of a React frontend and an Express API backed by MySQL.

## Table of contents

- [Vinyl](#vinyl)
	- [Table of contents](#table-of-contents)
	- [How it works](#how-it-works)
	- [Tech stack](#tech-stack)
	- [Repository structure](#repository-structure)
	- [Prerequisites](#prerequisites)
	- [Installation](#installation)
	- [Configuration](#configuration)
	- [Running locally](#running-locally)
	- [Useful scripts](#useful-scripts)
	- [API](#api)
	- [Tests and quality](#tests-and-quality)
	- [License](#license)

## How it works

1. **Catalog**: the home page loads every album from the backend. The user searches by album or artist, filters by genre and sorts the list.
2. **Item page**: each album has a detail page with its cover, artist, price, sale price and rating. Albums can be created and edited from the application.
3. **Likes and cart**: liked albums and cart content are stored in the browser's `localStorage`, so they are not tied to an account.
4. **Order**: the user fills in the order form and can enter a discount code (`CODE20` for -20%, `CODE50` for -50%).
5. **Confirmation**: the confirm page summarizes the order and the total after discount.
6. **Settings**: the interface is available in English and French, with a theme switch.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 18, Create React App, React Router 5, Tailwind CSS 3, Lucide, `react-parallax-tilt`, `clsx`, `tailwind-merge` |
| Backend | Node.js (ES modules), Express 4, `cors`, `body-parser`, `dotenv` |
| Data | MySQL (`mysql2`) |
| Tooling | npm, ESLint with `@maxencebonamy/eslint-plugin` |

## Repository structure

Monorepo with two independent npm projects, each with its own `package.json` and lockfile.

```
.
├── app-backend/        Express API
│   ├── sql/            Table creation and seed data (script.sql), album list (albums.txt)
│   └── src/            Server, routes and environment loading
├── app-frontend/       React application
│   ├── public/         Static assets and HTML template
│   └── src/            Pages, components, contexts, services and translations
```

The frontend follows an atomic design layout in `app-frontend/src/components` (`atoms`, `molecules`, `organisms`, `templates`). Application state (cart, likes, language, theme) lives in `app-frontend/src/contexts`. API calls are in `app-frontend/src/services`.

## Prerequisites

- [Node.js](https://nodejs.org/) and npm
- A MySQL server

## Installation

```bash
git clone git@github.com:maxencebonamy/vinyl.git
cd vinyl
```

```bash
cd app-backend
npm install
```

```bash
cd app-frontend
npm install
```

Create the database, then load the schema and the sample albums:

```bash
mysql -u <user> -p <database> < app-backend/sql/script.sql
```

## Configuration

Only the backend reads environment variables.

```bash
cp app-backend/.env.example app-backend/.env
```

| Variable | Description | Example |
| --- | --- | --- |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_DATABASE` | Database name | `vinyl` |
| `DB_USER` | MySQL user | `root` |
| `DB_PASSWORD` | MySQL password | |
| `APP_PORT` | API listening port, `3001` when unset | `3001` |

The frontend calls the API at `http://localhost:3001`, hardcoded in `app-frontend/src/services/items.service.js`. Change it there if the backend runs elsewhere.

## Running locally

Start both applications in two terminals.

```bash
cd app-backend
node src/server.js
```

```bash
cd app-frontend
npm start
```

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:3001>

## Useful scripts

| Command | Effect |
| --- | --- |
| `npm start` (frontend) | Start the development server |
| `npm run build` (frontend) | Build the frontend for production |
| `npm test` (frontend) | Run the frontend tests in watch mode |
| `npm run dev` (backend) | Run `nodemon server.js` |
| `npm run lint` (backend) | Lint the backend |
| `npm run lint:fix` (backend) | Lint the backend with auto-fix |

## API

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/items` | List all items |
| `GET` | `/items/:id` | Get one item |
| `POST` | `/items` | Create an item |
| `PUT` | `/items/:id` | Update an item |

## Tests and quality

```bash
cd app-backend
npm run lint
```

The backend declares no tests. The frontend uses the Create React App test runner (`npm test`), and no test files are present.

## License

This project is licensed under the [MIT License](LICENSE).
