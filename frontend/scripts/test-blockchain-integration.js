// Test script for blockchain integration
require('dotenv').config();

console.log('🔗 Testing Blockchain Integration\n');

// Test 1: Check environment variables
function testEnvironmentVariables() {
  console.log('🧪 Testing: Environment Variables');
  
  const required = [
    'NEXT_PUBLIC_REFERRAL_REWARDS_ADDRESS',
    'DEPLOYER_PRIVATE_KEY',
    'NEXT_PUBLIC_RPC_URL'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.log('❌ Missing environment variables:', missing.join(', '));
    return false;
  }
  
  console.log('✅ All required environment variables are set');
  return true;
}

// Test 2: Test blockchain API endpoints
async function testBlockchainAPIs() {
  console.log('\n🧪 Testing: Blockchain API Endpoints');
  
  const endpoints = [
    {
      name: 'Create Referral Code',
      url: '/api/referrals/blockchain/create',
      method: 'POST',
      data: {
        code: 'TEST123',
        customReward: 0,
        maxUses: 10
      }
    },
    {
      name: 'Use Referral Code',
      url: '/api/referrals/blockchain/use',
      method: 'POST',
      data: {
        code: 'TEST123'
      }
    },
    {
      name: 'Claim Rewards',
      url: '/api/referrals/blockchain/claim',
      method: 'POST',
      data: {}
    }
  ];
  
  let allPassed = true;
  
  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Testing ${endpoint.name}...`);
      
      const response = await fetch(`http://localhost:3000${endpoint.url}`, {
        method: endpoint.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(endpoint.data)
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log(`✅ ${endpoint.name}: Success`);
          if (data.txHash) {
            console.log(`   📊 TX Hash: ${data.txHash.slice(0, 10)}...`);
          }
        } else {
          console.log(`❌ ${endpoint.name}: ${data.error}`);
          allPassed = false;
        }
      } else {
        console.log(`❌ ${endpoint.name}: HTTP ${response.status}`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: ${error.message}`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

// Test 3: Test database integration
async function testDatabaseIntegration() {
  console.log('\n🧪 Testing: Database Integration');
  
  try {
    // Test referral creation with blockchain data
    const response = await fetch('http://localhost:3000/api/referrals/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Service',
        code: 'DBTEST123',
        reward: 'Test Reward',
        userId: 1,
        maxUsage: 5,
        category: 'test',
        description: 'Test referral for blockchain integration',
        txHash: '0x1234567890abcdef',
        blockNumber: 12345
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        console.log('✅ Database integration: Success');
        console.log(`   📊 Referral ID: ${data.referral.id}`);
        return true;
      } else {
        console.log('❌ Database integration:', data.error);
        return false;
      }
    } else {
      console.log('❌ Database integration: HTTP', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Database integration:', error.message);
    return false;
  }
}

// Test 4: Test complete flow
async function testCompleteFlow() {
  console.log('\n🧪 Testing: Complete Blockchain Flow');
  
  try {
    console.log('📝 Step 1: Creating referral on blockchain...');
    const createResponse = await fetch('http://localhost:3000/api/referrals/blockchain/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: 'FLOWTEST123',
        customReward: 0,
        maxUses: 5
      })
    });
    
    const createData = await createResponse.json();
    
    if (!createData.success) {
      console.log('❌ Blockchain creation failed:', createData.error);
      return false;
    }
    
    console.log('✅ Blockchain creation successful');
    console.log(`   📊 TX Hash: ${createData.txHash.slice(0, 10)}...`);
    
    console.log('💾 Step 2: Storing in database...');
    const dbResponse = await fetch('http://localhost:3000/api/referrals/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Flow Test Service',
        code: 'FLOWTEST123',
        reward: 'Flow Test Reward',
        userId: 1,
        maxUsage: 5,
        category: 'test',
        description: 'Complete flow test',
        txHash: createData.txHash,
        blockNumber: createData.blockNumber
      })
    });
    
    const dbData = await dbResponse.json();
    
    if (!dbData.success) {
      console.log('❌ Database storage failed:', dbData.error);
      return false;
    }
    
    console.log('✅ Database storage successful');
    console.log(`   📊 Referral ID: ${dbData.referral.id}`);
    
    console.log('🎯 Step 3: Using referral code...');
    const useResponse = await fetch('http://localhost:3000/api/referrals/blockchain/use', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: 'FLOWTEST123'
      })
    });
    
    const useData = await useResponse.json();
    
    if (!useData.success) {
      console.log('❌ Referral usage failed:', useData.error);
      return false;
    }
    
    console.log('✅ Referral usage successful');
    console.log(`   📊 TX Hash: ${useData.txHash.slice(0, 10)}...`);
    
    console.log('🎉 Complete flow test successful!');
    return true;
    
  } catch (error) {
    console.log('❌ Complete flow test failed:', error.message);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting Blockchain Integration Tests...\n');
  
  let allPassed = true;
  
  // Test 1: Environment variables
  if (!testEnvironmentVariables()) {
    allPassed = false;
  }
  
  // Test 2: Blockchain APIs
  if (!(await testBlockchainAPIs())) {
    allPassed = false;
  }
  
  // Test 3: Database integration
  if (!(await testDatabaseIntegration())) {
    allPassed = false;
  }
  
  // Test 4: Complete flow
  if (!(await testCompleteFlow())) {
    allPassed = false;
  }
  
  console.log('\n📊 Test Summary:');
  if (allPassed) {
    console.log('🎉 All tests passed! Blockchain integration is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Check the issues above.');
  }
  
  console.log('\n🔧 Next Steps:');
  console.log('1. Make sure your .env file has the correct contract address');
  console.log('2. Ensure the development server is running');
  console.log('3. Check that your wallet has sufficient CELO for gas fees');
  console.log('4. Verify the smart contract is deployed and accessible');
}

// Check if server is running
fetch('http://localhost:3000/api/referrals/blockchain/create')
  .then(() => {
    console.log('🌐 Development server detected, running tests...\n');
    runTests();
  })
  .catch(() => {
    console.log('❌ Development server not running. Please start it first:');
    console.log('   cd frontend && npm run dev');
    console.log('\nThen run this script again.');
  });
