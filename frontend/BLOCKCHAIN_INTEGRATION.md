# 🔗 Blockchain Integration Guide

## Overview

Your EcoPay referral system is now fully integrated with blockchain technology! This guide explains how the blockchain integration works and how to use it.

## 🚀 Features

### ✅ What's Integrated

1. **Blockchain Referral Creation**: All referral codes are stored on the Celo blockchain
2. **Automatic Reward Distribution**: Rewards are distributed automatically via smart contract
3. **Transparent Transactions**: All operations are visible on blockchain
4. **Decentralized System**: No central authority controls rewards
5. **Gas Optimization**: Efficient smart contract for Celo network

### 🔧 Technical Stack

- **Smart Contract**: ReferralRewards.sol (deployed on Celo Alfajores)
- **Frontend**: Next.js with RainbowKit wallet integration
- **Database**: PostgreSQL with Prisma ORM
- **Blockchain**: Celo network with Ethers.js

## 📋 Setup Instructions

### 1. Environment Variables

Add these to your `.env` file:

```bash
# Blockchain Configuration
NEXT_PUBLIC_REFERRAL_REWARDS_ADDRESS=0x... # Your deployed contract address
DEPLOYER_PRIVATE_KEY=0x... # Private key for contract interactions
NEXT_PUBLIC_RPC_URL=https://alfajores-forno.celo-testnet.org

# Database (existing)
DATABASE_URL=postgresql://...
```

### 2. Database Migration

Update your database schema:

```bash
cd frontend
npx prisma db push
```

### 3. Deploy Smart Contract

If you haven't deployed the contract yet:

```bash
# Deploy the ReferralRewards contract
npx hardhat run scripts/deploy.js --network alfajores
```

## 🔄 How It Works

### Referral Creation Flow

1. **User Creates Referral** → Frontend form submission
2. **Blockchain Creation** → Smart contract creates referral code
3. **Database Storage** → Transaction hash stored in database
4. **Success Notification** → User sees blockchain transaction

### Referral Usage Flow

1. **User Selects Referral** → From available referrals list
2. **Blockchain Usage** → Smart contract processes referral usage
3. **Database Update** → Usage recorded with transaction hash
4. **Reward Distribution** → Points awarded to provider automatically

### Reward Claiming Flow

1. **User Clicks Claim** → In user data modal
2. **Blockchain Claim** → Smart contract distributes rewards
3. **Database Update** → Points updated in database
4. **Success Notification** → User sees transaction hash

## 🎯 API Endpoints

### Blockchain Endpoints

- `POST /api/referrals/blockchain/create` - Create referral code on blockchain
- `POST /api/referrals/blockchain/use` - Use referral code on blockchain
- `POST /api/referrals/blockchain/claim` - Claim rewards on blockchain

### Database Endpoints

- `POST /api/referrals/create` - Store referral in database
- `POST /api/referrals/select` - Record referral usage
- `GET /api/user/points` - Fetch user points

## 🧪 Testing

### Run Integration Tests

```bash
cd frontend
node scripts/test-blockchain-integration.js
```

### Manual Testing

1. **Create Referral**: Use the "Add Referral" form
2. **Select Referral**: Choose from available referrals
3. **Claim Rewards**: Use the claim button in user modal

## 🔍 Monitoring

### Transaction Tracking

All blockchain operations include:
- **Transaction Hash**: Unique identifier for each transaction
- **Block Number**: Block where transaction was mined
- **Gas Used**: Cost of the transaction
- **Status**: Success/failure status

### Database Fields

New blockchain fields added:
- `txHash`: Transaction hash from blockchain
- `blockNumber`: Block number when created/used
- `createdAt`: Timestamp of database record

## 🛠️ Troubleshooting

### Common Issues

1. **"Wallet not initialized"**
   - Check `DEPLOYER_PRIVATE_KEY` in `.env`
   - Ensure private key is valid

2. **"Contract not found"**
   - Verify `NEXT_PUBLIC_REFERRAL_REWARDS_ADDRESS`
   - Check contract is deployed

3. **"Insufficient funds"**
   - Ensure wallet has CELO for gas fees
   - Check network connection

4. **"Database schema error"**
   - Run `npx prisma db push`
   - Check database connection

### Debug Mode

Enable detailed logging:

```bash
# In your .env file
DEBUG=true
```

## 🎨 UI Components

### Updated Components

1. **ReferralForm**: Now includes blockchain creation
2. **ReferralSelection**: Now includes blockchain usage
3. **UserDataModal**: Now includes claim rewards button

### New Features

- **Transaction Hashes**: Displayed in success messages
- **Blockchain Status**: Real-time transaction status
- **Reward Claims**: One-click reward claiming

## 🔐 Security

### Smart Contract Security

- **Ownership**: Only contract owner can modify settings
- **Access Control**: Users can only claim their own rewards
- **Validation**: All inputs are validated before processing

### Database Security

- **Transaction Integrity**: Blockchain hashes prevent tampering
- **User Validation**: All operations require valid user authentication
- **Data Consistency**: Database and blockchain stay in sync

## 🚀 Deployment

### Production Checklist

- [ ] Contract deployed to Celo mainnet
- [ ] Environment variables configured
- [ ] Database schema updated
- [ ] Frontend built and deployed
- [ ] Integration tests passing

### Monitoring

- Monitor transaction success rates
- Track gas usage and costs
- Monitor database performance
- Check for failed transactions

## 📞 Support

### Getting Help

1. **Check Logs**: Look for error messages in console
2. **Test Network**: Use Celo Alfajores testnet first
3. **Verify Setup**: Ensure all environment variables are set
4. **Run Tests**: Use the integration test script

### Common Solutions

- **Reset Database**: `npx prisma db push --force-reset`
- **Redeploy Contract**: Use Hardhat deployment script
- **Check Network**: Ensure you're on the correct Celo network
- **Verify Wallet**: Check wallet has sufficient CELO

## 🎉 Success!

Your referral system is now fully decentralized and automated! Users can:

- ✅ Create referral codes on blockchain
- ✅ Use referral codes with automatic rewards
- ✅ Claim rewards directly from smart contract
- ✅ Track all transactions transparently

The system is now truly decentralized and trustless! 🚀
