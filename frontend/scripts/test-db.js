const { PrismaClient } = require('@prisma/client');

async function testDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test if we can query users
    const userCount = await prisma.user.count();
    console.log(`📊 Total users in database: ${userCount}`);
    
    // Test if we can query transactions
    const transactionCount = await prisma.transaction.count();
    console.log(`📊 Total transactions in database: ${transactionCount}`);
    
    console.log('✅ Database test completed successfully');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
