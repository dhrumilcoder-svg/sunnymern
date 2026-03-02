import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

// Check if .env already exists
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file...');
  
  // Default configuration for local development
  const envContent = `PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/studentdb
NODE_ENV=development
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('\n⚠️  IMPORTANT: Please update DATABASE_URL in backend/.env with your PostgreSQL credentials');
  console.log('   Format: postgresql://username:password@localhost:5432/database_name\n');
} else {
  console.log('✅ .env file already exists');
}

