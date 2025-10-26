# Smart Contract Connection Verification Guide

## 🔗 How to Verify Smart Contract Connections

### 1. **Environment Variables Check**

First, ensure your `.env` file has all required variables:

```bash
# Required Environment Variables
NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_PHONE_MAPPING_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_RPC_URL=https://alfajores-forno.celo-testnet.org
DEPLOYER_PRIVATE_KEY=0x...
DEPLOYER_ADDRESS=0x...
```

### 2. **Frontend Dashboard Test**

1. Go to your dashboard: `http://localhost:3000/dashboard`
2. Scroll down to the "Smart Contract Connection Status" section
3. Click "Test Smart Contract Connections"
4. Check the results for each component

### 3. **API Endpoints Test**

Test these endpoints directly:

```bash
# Test Eco Fund Address
curl http://localhost:3000/api/contract/ecofund

# Test Contract Balance
curl http://localhost:3000/api/contract/balance

# Test Transaction Verification (with a real tx hash)
curl http://localhost:3000/api/transaction/verify?txHash=0x...
```

### 4. **Smart Contract Methods Test**

#### Payment Contract Methods:
- ✅ `sendPayment(receiver, amount)` - Sends CELO payments
- ✅ `ecoFund()` - Gets the eco fund address
- ✅ Contract balance checking

#### Phone Mapping Contract Methods:
- ✅ `registerPhone(phoneHash)` - Registers phone numbers
- ✅ `getWallet(phoneHash)` - Looks up wallet by phone
- ✅ `phoneToWallet(phoneHash)` - Alternative lookup method

### 5. **Database Integration Test**

The system stores:
- ✅ Transaction records in `Transaction` table
- ✅ User phone hashes in `User` table
- ✅ Referral usage tracking
- ✅ Points awarding system

### 6. **Complete Flow Test**

1. **User Registration:**
   - Phone number → Hash → Blockchain registration
   - User data stored in database

2. **Payment Processing:**
   - Payment sent via smart contract
   - Transaction recorded in database
   - 1% donation to eco fund

3. **Referral System:**
   - Referrals created and stored in database
   - Selection reveals provider details
   - Points awarded to providers

## 🧪 Manual Testing Script

Run this script to test everything:

```bash
cd frontend
node scripts/verify-smart-contracts.js
```

## 🔍 Troubleshooting

### Common Issues:

1. **"Wallet not initialized"**
   - Check `DEPLOYER_PRIVATE_KEY` in `.env`
   - Ensure private key is valid

2. **"Contract not found"**
   - Verify contract addresses are correct
   - Check if contracts are deployed on the right network

3. **"RPC connection failed"**
   - Verify `NEXT_PUBLIC_RPC_URL` is correct
   - Try alternative RPC endpoints

4. **"Transaction failed"**
   - Check if wallet has sufficient CELO
   - Verify gas settings
   - Check network congestion

### Network Configuration:

- **Alfajores Testnet:** `https://alfajores-forno.celo-testnet.org`
- **Mainnet:** `https://forno.celo.org`
- **Chain ID:** 44787 (Alfajores), 42220 (Mainnet)

## 📊 Expected Results

When everything is working:

✅ **Environment Variables:** All required variables set  
✅ **Contract Addresses:** Valid addresses configured  
✅ **RPC Connection:** Connected to Celo network  
✅ **Payment Contract:** Eco fund address retrievable  
✅ **Phone Mapping:** Contract methods accessible  
✅ **API Endpoints:** All endpoints responding  
✅ **Database:** User and transaction data stored  
✅ **Referral System:** Selection and points working  

## 🚀 Production Checklist

Before deploying:

- [ ] Contract addresses are correct
- [ ] RPC URL points to production network
- [ ] Private key is secure (use environment variables)
- [ ] Database is properly configured
- [ ] All API endpoints are tested
- [ ] Smart contract methods are verified
- [ ] Error handling is in place
- [ ] Logging is configured

## 🔧 Quick Fixes

### Reset Environment:
```bash
# Clear and restart
rm -rf .next
npm run dev
```

### Test Contract Connection:
```javascript
// In browser console
fetch('/api/contract/ecofund')
  .then(r => r.json())
  .then(console.log)
```

### Check Network:
```javascript
// In browser console
window.ethereum.request({ method: 'eth_chainId' })
  .then(console.log) // Should be 0xaef3 (44787 for Alfajores)
```

---

**Note:** This verification system ensures your smart contracts are properly connected and all functionality is working as expected! 🎉
