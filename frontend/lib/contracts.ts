// Contract addresses from your deployment


// ABI for PaymentContract
export const PAYMENT_CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "_ecoFund", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ecoFund",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "receiver", "type": "address"}],
    "name": "sendPayment",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

// ABI for PhoneMapping
export const PHONE_MAPPING_ABI = [
  {
    "inputs": [{"internalType": "bytes32", "name": "phoneHash", "type": "bytes32"}],
    "name": "getWallet",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "phoneHash", "type": "bytes32"}],
    "name": "phoneToWallet",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "phoneHash", "type": "bytes32"}],
    "name": "registerPhone",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
// Add to frontend/lib/contracts.ts
export const REFERRAL_REWARDS_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_rewardToken", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "code", "type": "string"},
      {"internalType": "uint256", "name": "customReward", "type": "uint256"},
      {"internalType": "uint256", "name": "maxUses", "type": "uint256"}
    ],
    "name": "createReferralCode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "code", "type": "string"}
    ],
    "name": "getReferralCodeDetails",
    "outputs": [
      {"internalType": "address", "name": "creator", "type": "address"},
      {"internalType": "uint256", "name": "rewardAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "maxUses", "type": "uint256"},
      {"internalType": "uint256", "name": "currentUses", "type": "uint256"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "getUserStats",
    "outputs": [
      {"internalType": "uint256", "name": "totalReferralsCreated", "type": "uint256"},
      {"internalType": "uint256", "name": "totalReferralsUsed", "type": "uint256"},
      {"internalType": "uint256", "name": "totalRewardsEarned", "type": "uint256"},
      {"internalType": "uint256", "name": "pendingRewardAmount", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "code", "type": "string"}
    ],
    "name": "useReferralCode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Update CONTRACT_ADDRESSES
export const CONTRACT_ADDRESSES = {
  PaymentContract: process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS || "",
  PhoneMapping: process.env.NEXT_PUBLIC_PHONE_MAPPING_CONTRACT_ADDRESS || "",
  ReferralRewards: process.env.NEXT_PUBLIC_REFERRAL_REWARDS_ADDRESS || "", // Add this
};
// RPC Configuration
export const RPC_CONFIG = {
  alfajores: process.env.NEXT_PUBLIC_RPC_URL || "https://alfajores-forno.celo-testnet.org",
  celo: "https://forno.celo.org"
};
