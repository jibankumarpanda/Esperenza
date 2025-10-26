// Smart Contract Connection Verification Script
require('dotenv').config();

console.log('🔗 Smart Contract Connection Verification\n');

// Test configuration
const tests = [
  {
    name: 'Environment Variables',
    test: () => {
      const required = [
        'NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS',
        'NEXT_PUBLIC_PHONE_MAPPING_CONTRACT_ADDRESS',
        'NEXT_PUBLIC_RPC_URL',
        'DEPLOYER_PRIVATE_KEY'
      ];
      
      const missing = required.filter(key => !process.env[key]);
      
      if (missing.length > 0) {
        return {
          success: false,
          message: `Missing environment variables: ${missing.join(', ')}`
        };
      }
      
      return {
        success: true,
        message: 'All required environment variables are set'
      };
    }
  },
  {
    name: 'Contract Addresses',
    test: () => {
      const paymentAddress = process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS;
      const phoneAddress = process.env.NEXT_PUBLIC_PHONE_MAPPING_CONTRACT_ADDRESS;
      
      if (!paymentAddress || !phoneAddress) {
        return {
          success: false,
          message: 'Contract addresses not configured'
        };
      }
      
      return {
        success: true,
        message: `Payment: ${paymentAddress.slice(0, 10)}..., Phone: ${phoneAddress.slice(0, 10)}...`
      };
    }
  },
  {
    name: 'RPC Connection',
    test: async () => {
      try {
        const { ethers } = require('ethers');
        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
        const network = await provider.getNetwork();
        
        return {
          success: true,
          message: `Connected to ${network.name} (Chain ID: ${network.chainId})`
        };
      } catch (error) {
        return {
          success: false,
          message: `RPC connection failed: ${error.message}`
        };
      }
    }
  },
  {
    name: 'Payment Contract',
    test: async () => {
      try {
        const { ethers } = require('ethers');
        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
        
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS,
          [
            {
              "inputs": [],
              "name": "ecoFund",
              "outputs": [{"internalType": "address", "name": "", "type": "address"}],
              "stateMutability": "view",
              "type": "function"
            }
          ],
          provider
        );
        
        const ecoFund = await contract.ecoFund();
        const balance = await provider.getBalance(process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS);
        
        return {
          success: true,
          message: `Eco Fund: ${ecoFund.slice(0, 10)}..., Balance: ${ethers.formatEther(balance)} CELO`
        };
      } catch (error) {
        return {
          success: false,
          message: `Payment contract error: ${error.message}`
        };
      }
    }
  },
  {
    name: 'Phone Mapping Contract',
    test: async () => {
      try {
        const { ethers } = require('ethers');
        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
        
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_PHONE_MAPPING_CONTRACT_ADDRESS,
          [
            {
              "inputs": [{"internalType": "bytes32", "name": "phoneHash", "type": "bytes32"}],
              "name": "getWallet",
              "outputs": [{"internalType": "address", "name": "", "type": "address"}],
              "stateMutability": "view",
              "type": "function"
            }
          ],
          provider
        );
        
        // Test with a dummy phone hash
        const testPhoneHash = ethers.keccak256(ethers.toUtf8Bytes('+1234567890'));
        const wallet = await contract.getWallet(testPhoneHash);
        
        return {
          success: true,
          message: `Contract accessible, test query returned: ${wallet}`
        };
      } catch (error) {
        return {
          success: false,
          message: `Phone mapping contract error: ${error.message}`
        };
      }
    }
  },
  {
    name: 'API Endpoints',
    test: async () => {
      try {
        const endpoints = [
          '/api/contract/ecofund',
          '/api/contract/balance',
          '/api/transaction/verify'
        ];
        
        const results = [];
        
        for (const endpoint of endpoints) {
          try {
            const response = await fetch(`http://localhost:3000${endpoint}`);
            if (response.ok) {
              results.push(`✅ ${endpoint}`);
            } else {
              results.push(`❌ ${endpoint} (${response.status})`);
            }
          } catch (error) {
            results.push(`❌ ${endpoint} (Connection failed)`);
          }
        }
        
        return {
          success: results.every(r => r.includes('✅')),
          message: results.join('\n')
        };
      } catch (error) {
        return {
          success: false,
          message: `API test failed: ${error.message}`
        };
      }
    }
  }
];

// Run all tests
async function runVerification() {
  console.log('🚀 Starting Smart Contract Verification...\n');
  
  let allPassed = true;
  
  for (const test of tests) {
    try {
      console.log(`🧪 Testing: ${test.name}`);
      const result = await test.test();
      
      if (result.success) {
        console.log(`✅ ${result.message}\n`);
      } else {
        console.log(`❌ ${result.message}\n`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ Test failed: ${error.message}\n`);
      allPassed = false;
    }
  }
  
  console.log('📊 Verification Summary:');
  console.log(allPassed ? '🎉 All tests passed! Smart contracts are properly connected.' : '⚠️ Some tests failed. Check the issues above.');
  
  if (!allPassed) {
    console.log('\n🔧 Troubleshooting Tips:');
    console.log('1. Make sure your .env file has all required variables');
    console.log('2. Verify contract addresses are correct');
    console.log('3. Check that the development server is running');
    console.log('4. Ensure you have CELO testnet access');
  }
}

// Check if server is running first
fetch('http://localhost:3000/api/contract/ecofund')
  .then(() => {
    console.log('🌐 Development server detected, running verification...\n');
    runVerification();
  })
  .catch(() => {
    console.log('❌ Development server not running. Please start it first:');
    console.log('   cd frontend && npm run dev');
    console.log('\nThen run this script again.');
  });
