import pkg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pkg;

async function initDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Read SQL file
    const sqlPath = path.join(__dirname, 'database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Execute SQL
    await pool.query(sql);
    console.log('✅ Database initialized successfully!');
    console.log('✅ Students table created');
    console.log('✅ Sample data inserted');
    
    // Verify
    const result = await pool.query('SELECT COUNT(*) FROM students');
    console.log(`✅ Total students in database: ${result.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    if (error.code === '42P07') {
      console.log('ℹ️  Table already exists. Skipping...');
    } else {
      console.log('\n📋 Make sure:');
      console.log('   1. PostgreSQL is running');
      console.log('   2. DATABASE_URL in .env is correct');
      console.log('   3. Database "studentdb" exists');
      process.exit(1);
    }
  } finally {
    await pool.end();
  }
}

initDatabase();

