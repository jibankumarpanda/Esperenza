// Contract addresses from your deployment
export const CONTRACT_ADDRESSES = {
    PaymentContract: process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS || "",
    PhoneMapping: process.env.NEXT_PUBLIC_PHONE_MAPPING_CONTRACT_ADDRESS || "",
  };
  
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
  
  // RPC Configuration
  export const RPC_CONFIG = {
    alfajores: process.env.NEXT_PUBLIC_RPC_URL || "https://alfajores-forno.celo-testnet.org",
    celo: "https://forno.celo.org"
  };