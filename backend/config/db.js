import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is not set in .env file');
  console.log('📝 Please create a .env file in the backend directory with:');
  console.log('   DATABASE_URL=postgresql://username:password@localhost:5432/studentdb');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
    console.log('\n📋 Troubleshooting steps:');
    console.log('   1. Make sure PostgreSQL is installed and running');
    console.log('   2. Check your DATABASE_URL in .env file');
    console.log('   3. Create the database: CREATE DATABASE studentdb;');
    console.log('   4. Run the SQL script: psql -U your_username -d studentdb -f database.sql\n');
  } else {
    console.log('✅ Connected to PostgreSQL database');
  }
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err.message);
});

export { pool };

