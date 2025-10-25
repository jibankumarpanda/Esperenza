const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Esperenza Database...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('📝 Please create .env.local with your database configuration:');
  console.log(`
DATABASE_URL="postgresql://username:password@localhost:5432/esperenza_db"
NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS="0x..."
NEXT_PUBLIC_PHONE_MAPPING_CONTRACT_ADDRESS="0x..."
NEXT_PUBLIC_ALFAJORES_RPC_URL="https://alfajores-forno.celo-testnet.org"
NEXT_PUBLIC_RPC_URL="https://alfajores-forno.celo-testnet.org"
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="your-project-id"
DEPLOYER_PRIVATE_KEY="your-private-key"
DEPLOYER_ADDRESS="your-wallet-address"
  `);
  process.exit(1);
}

console.log('✅ .env.local found');

try {
  console.log('🔄 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('✅ Prisma client generated');

  console.log('🔄 Pushing schema to database...');
  execSync('npx prisma db push', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('✅ Schema pushed to database');

  console.log('🔄 Testing database connection...');
  execSync('node scripts/test-db.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('✅ Database connection successful');

  console.log('\n🎉 Database setup completed successfully!');
  console.log('📊 You can now:');
  console.log('   - Run the application: npm run dev');
  console.log('   - Open Prisma Studio: npm run prisma:studio');
  console.log('   - Test database: npm run db:test');

} catch (error) {
  console.error('❌ Database setup failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('   1. Make sure PostgreSQL is running');
  console.log('   2. Check your DATABASE_URL in .env.local');
  console.log('   3. Ensure the database exists');
  console.log('   4. Try running: npm run prisma:generate');
  process.exit(1);
}
