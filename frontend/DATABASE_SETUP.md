# Database Setup Guide

This guide will help you set up the PostgreSQL database and Prisma integration for Esperenza.

## Prerequisites

1. PostgreSQL database running locally or remotely
2. Node.js and npm installed
3. Environment variables configured

## Step 1: Environment Variables

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/esperenza_db"

# Smart Contract Addresses (replace with your deployed addresses)
NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS="0x..."
NEXT_PUBLIC_PHONE_MAPPING_CONTRACT_ADDRESS="0x..."

# RPC URLs
NEXT_PUBLIC_ALFAJORES_RPC_URL="https://alfajores-forno.celo-testnet.org"
NEXT_PUBLIC_RPC_URL="https://alfajores-forno.celo-testnet.org"

# Wallet Connect (get from https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="your-project-id"

# Backend Private Key (for contract interactions)
DEPLOYER_PRIVATE_KEY="your-private-key"
DEPLOYER_ADDRESS="your-wallet-address"
```

## Step 2: Database Setup

### Option A: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database:
```sql
CREATE DATABASE esperenza_db;
```

### Option B: Remote Database (Recommended for production)

Use services like:
- Supabase (free tier available)
- Railway
- Neon
- AWS RDS

## Step 3: Prisma Setup

1. Generate Prisma client:
```bash
cd frontend
npm run prisma:generate
```

2. Push schema to database:
```bash
npm run prisma:push
```

3. Test database connection:
```bash
npm run db:test
```

## Step 4: Database Schema

The application uses the following schema:

### User Model
- `id`: Auto-incrementing primary key
- `phoneE164`: International phone number (unique)
- `phoneHash`: Keccak256 hash of phone number (unique)
- `walletAddress`: User's wallet address
- `encryptedPrivKey`: Encrypted private key (for future use)
- `pepper`: Additional security field
- `dekPublicKey`: Data encryption key public key
- `dekEncrypted`: Encrypted data encryption key
- `createdAt`: Registration timestamp
- `updatedAt`: Last update timestamp

### Transaction Model
- `id`: Auto-incrementing primary key
- `txHash`: Blockchain transaction hash (unique)
- `fromAddress`: Sender wallet address
- `toAddress`: Recipient wallet address
- `amount`: Transaction amount (stored as string)
- `donation`: 1% donation amount
- `userId`: Foreign key to User
- `blockNumber`: Blockchain block number
- `status`: Transaction status (pending/success/failed)
- `createdAt`: Transaction timestamp
- `updatedAt`: Last update timestamp

## Step 5: API Endpoints

The application provides the following API endpoints:

### User Registration
- **POST** `/api/user/register`
- Body: `{ phoneNumber: string, walletAddress: string }`
- Creates a new user in the database

### User Profile
- **GET** `/api/user/profile?walletAddress=0x...`
- **GET** `/api/user/profile?phoneNumber=+1234567890`
- Retrieves user data with recent transactions

### Phone Registration (Blockchain)
- **POST** `/api/phone/register`
- Registers phone number on the smart contract

### Payment Processing
- **POST** `/api/payment`
- Processes payments and stores transaction data

## Step 6: Testing the Integration

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `/login`
3. Enter your phone number
4. Connect your wallet
5. Check the database to see if the user was created

## Step 7: Database Management

### View Data with Prisma Studio
```bash
npm run prisma:studio
```

### Run Migrations (if needed)
```bash
npm run prisma:migrate
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check if PostgreSQL is running
   - Verify DATABASE_URL is correct
   - Ensure database exists

2. **Prisma Client Error**
   - Run `npm run prisma:generate`
   - Check if schema is pushed: `npm run prisma:push`

3. **Environment Variables**
   - Ensure all required variables are set
   - Check `.env.local` file exists in frontend directory

### Useful Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Create migration
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio

# Test database connection
npm run db:test
```

## Security Notes

- Never commit `.env.local` to version control
- Use strong passwords for database
- Consider using connection pooling for production
- Implement proper error handling for database operations
- Use HTTPS in production

## Production Considerations

1. Use a managed database service
2. Set up connection pooling
3. Implement database backups
4. Monitor database performance
5. Use environment-specific configurations
