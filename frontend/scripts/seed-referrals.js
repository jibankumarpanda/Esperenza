const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedReferrals() {
  try {
    console.log('🌱 Seeding sample referrals...');

    // First, get a user to create referrals for
    const user = await prisma.user.findFirst();
    
    if (!user) {
      console.log('❌ No users found. Please create a user first.');
      return;
    }

    console.log('👤 Using user:', user.id);

    // Sample referrals data
    const sampleReferrals = [
      {
        name: 'Perplexity',
        code: 'PERPLEXITY50',
        reward: '50 Points + Premium Access',
        description: 'Get 50 points and 1 month of Perplexity Pro',
        category: 'ai',
        maxUsage: 100,
        userId: user.id
      },
      {
        name: 'Comet',
        code: 'COMET25',
        reward: '25 Points + Free Credits',
        description: 'Earn 25 points and get $10 in Comet credits',
        category: 'ai',
        maxUsage: 50,
        userId: user.id
      },
      {
        name: 'Claude',
        code: 'CLAUDE100',
        reward: '100 Points + API Access',
        description: 'Get 100 points and Claude API access for 1 month',
        category: 'ai',
        maxUsage: 200,
        userId: user.id
      },
      {
        name: 'Gemini',
        code: 'GEMINI75',
        reward: '75 Points + Advanced Features',
        description: 'Earn 75 points and unlock Gemini Advanced features',
        category: 'ai',
        maxUsage: 150,
        userId: user.id
      },
      {
        name: 'ChatGPT',
        code: 'CHATGPT30',
        reward: '30 Points + Plus Subscription',
        description: 'Get 30 points and 1 month of ChatGPT Plus',
        category: 'ai',
        maxUsage: 80,
        userId: user.id
      },
      {
        name: 'Binance',
        code: 'BINANCE20',
        reward: '20 Points + Trading Fee Discount',
        description: 'Earn 20 points and get 10% trading fee discount',
        category: 'crypto',
        maxUsage: 1000,
        userId: user.id
      },
      {
        name: 'Coinbase',
        code: 'COINBASE15',
        reward: '15 Points + $5 Bonus',
        description: 'Get 15 points and $5 in Bitcoin',
        category: 'crypto',
        maxUsage: 500,
        userId: user.id
      },
      {
        name: 'Kraken',
        code: 'KRAKEN25',
        reward: '25 Points + VIP Support',
        description: 'Earn 25 points and get VIP customer support',
        category: 'crypto',
        maxUsage: 300,
        userId: user.id
      }
    ];

    // Create referrals
    for (const referralData of sampleReferrals) {
      try {
        const referral = await prisma.referral.create({
          data: referralData
        });
        console.log(`✅ Created referral: ${referral.name} - ${referral.code}`);
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`⚠️ Referral ${referralData.code} already exists, skipping...`);
        } else {
          console.error(`❌ Error creating referral ${referralData.code}:`, error.message);
        }
      }
    }

    console.log('🎉 Sample referrals seeded successfully!');
    
    // Show summary
    const totalReferrals = await prisma.referral.count();
    console.log(`📊 Total referrals in database: ${totalReferrals}`);

  } catch (error) {
    console.error('❌ Error seeding referrals:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedReferrals();
