# ne-website

A full-stack web application for displaying and managing city information.

## Project Structure

```
city-info-website/
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
├── database/          # Database models, migrations, and seeders
└── README.md          # Project documentation
```

## Getting Started

### Database Setup (MySQL)

1.  **Start MySQL:**
    ```bash
    # Using Docker (recommended)
    docker run --name city-info-mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=city_info -p 3306:3306 -d mysql/mysql-server:8.0
    # Wait a few seconds for MySQL to start
    ```
    *   `DB_HOST=localhost`, `DB_USER=root`, `DB_PASSWORD=password`, `DB_NAME=city_info` (these are default in `.env`)

2.  **Create database, run migrations and seed data:**
    ```bash
    cd backend
    npm install # if not already done
    npm run db:create
    npm run db:migrate
    npm run db:seed
    cd ..
    ```

### One command (recommended)

From the project root, install once then run both backend and frontend together. A browser will open to the frontend.

```bash
npm install          # install root deps (concurrently)
cd backend && npm install # if not already done
cd ../frontend && npm install # if not already done
cd ..
npm run dev          # runs backend + frontend; opens browser to http://localhost:5173
```

### Run separately

-   **Backend:** `cd backend && npm run dev` → http://localhost:3000
-   **Frontend:** `cd frontend && npm run dev` → http://localhost:5173 (opens browser)

## Features

-   **Cities:** Browse city information (Tokyo, Paris, New York, London, Sydney)
-   **Blog:** Read blog posts; admins can create new posts
-   **Authentication:** User registration, login (user/admin roles)
-   **Admin:** Default admin account (admin@example.com / admin123) can create blog posts
-   **Info:** About page with site information

## Technologies

-   **Frontend:** React 18, TypeScript, Vite, React Router, Context API
-   **Backend:** Node.js, Express, TypeScript, MySQL
-   **Database:** MySQL
