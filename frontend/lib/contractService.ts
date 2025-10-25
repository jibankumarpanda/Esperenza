import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, PAYMENT_CONTRACT_ABI, PHONE_MAPPING_ABI, RPC_CONFIG } from './contracts';

export class ContractService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet | null;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(RPC_CONFIG.alfajores);
    
    // Only initialize wallet if private key is available
    if (process.env.DEPLOYER_PRIVATE_KEY) {
      this.wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, this.provider);
    } else {
      this.wallet = null;
    }
  }

  // Payment Contract Methods
  async sendPayment(receiver: string, amount: string) {
    if (!this.wallet) {
      return { success: false, error: 'Wallet not initialized. Missing DEPLOYER_PRIVATE_KEY.' };
    }
    
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.PaymentContract,
        PAYMENT_CONTRACT_ABI,
        this.wallet
      );

      const tx = await contract.sendPayment(receiver, {
        value: ethers.parseEther(amount)
      });

      const receipt = await tx.wait();
      return {
        success: true,
        txHash: tx.hash,
        receipt,
        blockNumber: receipt.blockNumber
      };
    } catch (error: any) {
      console.error('Payment failed:', error);
      return { success: false, error: error.message };
    }
  }

  async getEcoFund() {
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.PaymentContract,
        PAYMENT_CONTRACT_ABI,
        this.provider
      );

      const ecoFund = await contract.ecoFund();
      return { success: true, ecoFund };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Phone Mapping Methods
  async registerPhone(phoneHash: string) {
    if (!this.wallet) {
      return { success: false, error: 'Wallet not initialized. Missing DEPLOYER_PRIVATE_KEY.' };
    }
    
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.PhoneMapping,
        PHONE_MAPPING_ABI,
        this.wallet
      );

      const tx = await contract.registerPhone(phoneHash);
      const receipt = await tx.wait();
      
      return {
        success: true,
        txHash: tx.hash,
        receipt,
        blockNumber: receipt.blockNumber
      };
    } catch (error: any) {
      console.error('Phone registration failed:', error);
      return { success: false, error: error.message };
    }
  }

  async getWalletByPhone(phoneHash: string) {
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.PhoneMapping,
        PHONE_MAPPING_ABI,
        this.provider
      );

      const wallet = await contract.getWallet(phoneHash);
      return { success: true, wallet };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Transaction verification
  async verifyTransaction(txHash: string) {
    try {
      const receipt = await this.provider.getTransactionReceipt(txHash);
      return {
        success: true,
        receipt,
        status: receipt?.status === 1 ? 'success' : 'failed',
        blockNumber: receipt?.blockNumber
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get contract balance
  async getContractBalance() {
    try {
      const balance = await this.provider.getBalance(CONTRACT_ADDRESSES.PaymentContract);
      return {
        success: true,
        balance: ethers.formatEther(balance)
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

export const contractService = new ContractService();