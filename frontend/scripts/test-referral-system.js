const { getPrisma } = require('../app/lib/prisma');

async function testReferralSystem() {
  console.log('🧪 Testing Referral Discovery System...');
  
  try {
    const prisma = getPrisma();
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Test 1: Create a sample referral
    console.log('\n📝 Creating sample referral...');
    const sampleReferral = await prisma.referral.create({
      data: {
        code: 'TEST2024',
        reward: '50 CELO bonus',
        category: 'crypto',
        description: 'Test referral for crypto rewards',
        maxUsage: 10,
        userId: 1, // Assuming user ID 1 exists
        isActive: true
      }
    });
    console.log('✅ Sample referral created:', sampleReferral);

    // Test 2: Fetch available referrals
    console.log('\n🔍 Testing available referrals API...');
    const availableReferrals = await prisma.referral.findMany({
      where: { isActive: true },
      select: {
        id: true,
        code: true,
        reward: true,
        description: true,
        category: true,
        maxUsage: true,
        usageCount: true,
        isActive: true,
        createdAt: true,
      }
    });
    console.log('✅ Available referrals:', availableReferrals.length);

    // Test 3: Test referral selection
    console.log('\n🎯 Testing referral selection...');
    const referralToSelect = availableReferrals[0];
    if (referralToSelect) {
      // Simulate selection
      const updatedReferral = await prisma.referral.update({
        where: { id: referralToSelect.id },
        data: { usageCount: referralToSelect.usageCount + 1 }
      });
      console.log('✅ Referral usage incremented');

      // Create usage record
      const usageRecord = await prisma.referralUsage.create({
        data: {
          referralId: referralToSelect.id,
          userId: 2, // Assuming user ID 2 exists
          usedAt: new Date()
        }
      });
      console.log('✅ Usage record created:', usageRecord.id);

      // Award points to provider
      const pointsAwarded = await prisma.userPoints.create({
        data: {
          userId: referralToSelect.userId,
          points: 10,
          source: 'referral_usage',
          description: `Referral ${referralToSelect.code} used by another user`,
          referralId: referralToSelect.id
        }
      });
      console.log('✅ Points awarded to provider:', pointsAwarded.points);
    }

    // Test 4: Check system status
    console.log('\n📊 System Status:');
    const totalReferrals = await prisma.referral.count();
    const activeReferrals = await prisma.referral.count({ where: { isActive: true } });
    const totalUsages = await prisma.referralUsage.count();
    const totalPoints = await prisma.userPoints.aggregate({
      _sum: { points: true }
    });

    console.log(`📈 Total Referrals: ${totalReferrals}`);
    console.log(`🟢 Active Referrals: ${activeReferrals}`);
    console.log(`👥 Total Usages: ${totalUsages}`);
    console.log(`⭐ Total Points Awarded: ${totalPoints._sum.points || 0}`);

    console.log('\n🎉 Referral Discovery System Test Complete!');
    console.log('\n📋 Next Steps:');
    console.log('1. Update database schema: npx prisma db push');
    console.log('2. Test the search modal in the dashboard');
    console.log('3. Create referrals and test the discovery flow');

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure database is running');
    console.log('2. Run: npx prisma db push');
    console.log('3. Check if users exist in database');
  } finally {
    try {
      await prisma.$disconnect();
      console.log('🔌 Database connection closed');
    } catch (disconnectError) {
      console.log('⚠️ Error closing connection:', disconnectError.message);
    }
  }
}

testReferralSystem();
