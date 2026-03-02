# Backend Setup Guide

## Quick Start

### Step 1: Install PostgreSQL
If you don't have PostgreSQL installed:
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **Mac**: `brew install postgresql` or download from postgresql.org
- **Linux**: `sudo apt-get install postgresql` (Ubuntu/Debian)

### Step 2: Create Database
Open PostgreSQL command line (psql) and run:
```sql
CREATE DATABASE studentdb;
```

### Step 3: Create .env File
Create a file named `.env` in the `backend` folder with:
```
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/studentdb
NODE_ENV=development
```

**Important**: Replace `postgres:postgres` with your PostgreSQL username and password!

### Step 4: Initialize Database
```bash
npm run init-db
```

This will create the students table and insert sample data.

### Step 5: Start Server
```bash
npm run dev
```

The server will run on http://localhost:5000

## Troubleshooting

### "DATABASE_URL is not set"
- Make sure you created the `.env` file in the `backend` folder
- Check that the file is named exactly `.env` (not `.env.txt`)

### "Connection refused" or "Database does not exist"
- Make sure PostgreSQL is running
- Check your DATABASE_URL format: `postgresql://username:password@localhost:5432/database_name`
- Verify the database exists: `psql -l` to list all databases

### "Table already exists"
- This is fine! The table is already created. You can continue.

## Testing the API

Once the server is running, test it:
```bash
# Health check
curl http://localhost:5000/api/health

# Get all students
curl http://localhost:5000/api/students
```

