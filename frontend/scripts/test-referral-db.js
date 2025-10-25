const { getPrisma } = require('../app/lib/prisma');

async function testReferralDatabase() {
  console.log('🧪 Testing referral database connection...');
  
  try {
    const prisma = getPrisma();
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test if Referral model exists by trying to query it
    try {
      const referrals = await prisma.referral.findMany({
        take: 1
      });
      console.log('✅ Referral model exists and is accessible');
      console.log(`📊 Found ${referrals.length} referrals in database`);
    } catch (modelError) {
      console.error('❌ Referral model not found or not accessible:');
      console.error('Error:', modelError.message);
      console.log('\n🔧 This means the database schema needs to be updated.');
      console.log('Run: npx prisma db push');
    }
    
    // Test User model
    try {
      const users = await prisma.user.findMany({
        take: 1
      });
      console.log('✅ User model exists and is accessible');
      console.log(`👥 Found ${users.length} users in database`);
    } catch (userError) {
      console.error('❌ User model not accessible:', userError.message);
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    console.log('\n🔧 Make sure PostgreSQL is running and DATABASE_URL is correct');
  } finally {
    try {
      await prisma.$disconnect();
      console.log('🔌 Database connection closed');
    } catch (disconnectError) {
      console.log('⚠️ Error closing connection:', disconnectError.message);
    }
  }
}

testReferralDatabase();
