# Simple Inventory Management System

A full-stack inventory management application for tracking products, monitoring stock levels, and exporting inventory data. The system supports adding, viewing, updating, and deleting items, while also providing a stock summary dashboard and CSV export functionality.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js 18.x or later
- npm or yarn
- An active MSSQL Server instance running locally or remotely
- A database with the required tables for `items` and `users`

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/mariku365/simple_management_system.git
cd simple_management_system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure environment variables

Create a `.env` file in the `backend` directory with the following variables:

```env
DB_USER=your_mssql_username
DB_PASS=your_mssql_password
DB_SERVER=localhost
DB_NAME=InventoryDB
JWT_SECRET=your_super_secret_key
```

Example:

```env
DB_USER=sa
DB_PASS=YourStrong!Passw0rd
DB_SERVER=localhost
DB_NAME=InventoryDB
JWT_SECRET=inventory-management-secret
```

> Note: The backend is running in port `3001`.

### 5. Create the required MSSQL tables

Make sure your database contains tables similar to the following:

```sql
CREATE TABLE users(
	userId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
	username NVARCHAR(50) NOT NULL,
	userPassword VARCHAR(255) NOT NULL
);

CREATE TABLE items(
	itemId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
	itemName VARCHAR(100) NOT NULL,
	quantity INT NOT NULL,
	price DECIMAL(10,2) NOT NULL
);

```

### 6. Seed the default user before login

If the `users` table is empty, create the first user before attempting to sign in:

```bash
cd backend
node addUser.js
```

This script will create a default user with:

- Username: `MGR_Mark`
- Password: `MGR_Mark`

> The backend uses `bcryptjs` for password comparison, so the password is hashed before being saved to the database.

## Running the Project

### Start the backend

From the `backend` folder:

```bash
npm run dev
```

The backend server will run at:

```text
http://localhost:3001
```

Example API endpoint:

```text
http://localhost:3001/api/items
```

### Start the frontend

From the `frontend` folder:

```bash
npm start
```

The frontend application will run at:

```text
http://localhost:3000
```

## Features

- Add product
- View inventory
- Update and delete items
- Stock summary with charts
- Export inventory to CSV

## How to use

### Login requirement
User must log in first before they can access the dashboard

- Navigate to the frontend app at `http://localhost:3000`
- Sign in with a valid username and password
- After successful log in, you will be directed to the dashboard.

### Example workflow

1. Log in to the system
2. Navigate to the Inventory section
3. Add a new product
4. Review the inventory list
5. Update stock or pricing when needed
6. Export the latest inventory report

## Challenges Encountered

Some of the challenges I encountered during the development:
- Displaying live inventory and report data
- Handling different backend errors and API response failures
- Synchronizing frontend and backend data updates during CRUD operations
- Protecting routes so unauthorized users cannot access the dashboard
- Managing database connection

## This project is built using:
- ReactJS & Ant Design
- ExpressJS
- MSSQL
- Axios for RESTful API

## Support

If you run into issues with setup or configuration:

- Verify your MSSQL connection details in `.env`
- Ensure the database tables exist before starting the backend
- Check if both frontend and backend dependencies are installed
- Confirm no port conflicts are occurring on `3000` or `3001`
