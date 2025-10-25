# Smart Contract Backend Setup

## Environment Variables Required

Create a `.env.local` file in the frontend directory with the following variables:

```env
# Smart Contract Addresses (Replace with your deployed contract addresses)
NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS=0xYourDeployedPaymentContractAddress
NEXT_PUBLIC_PHONE_MAPPING_CONTRACT_ADDRESS=0xYourDeployedPhoneMappingAddress

# RPC URLs
NEXT_PUBLIC_RPC_URL=https://alfajores-forno.celo-testnet.org
ALFAJORES_RPC_URL=https://alfajores-forno.celo-testnet.org

# Backend wallet (for contract interactions)
DEPLOYER_PRIVATE_KEY=your_private_key_here
DEPLOYER_ADDRESS=your_wallet_address_here

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/eco_pay_db"

# Wallet Connect (Optional - for frontend wallet connections)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

## API Endpoints Created

### Payment Contract
- `POST /api/payment` - Send payments with 1% eco donation
- `GET /api/contract/balance` - Get contract balance
- `GET /api/contract/ecofund` - Get eco fund address

### Phone Mapping Contract
- `POST /api/phone/register` - Register phone number to wallet
- `POST /api/phone/lookup` - Lookup wallet by phone number

### Transaction Verification
- `POST /api/transaction/verify` - Verify transaction status

## React Hooks Available

- `usePayment()` - Send payments
- `usePhoneRegistration()` - Register phone numbers
- `usePhoneLookup()` - Lookup phone numbers
- `useContractInfo()` - Get contract information
- `useTransactionVerification()` - Verify transactions

## Components Available

- `PaymentForm` - Payment interface
- `PhoneRegistrationForm` - Phone registration interface
- `ContractInfo` - Contract information display
- `ContractDashboard` - Complete dashboard

## Usage Example

```tsx
import { ContractDashboard } from '@/components/contracts/ContractDashboard';

export default function Dashboard() {
  return <ContractDashboard />;
}
```

## Prisma Schema Required

Make sure your Prisma schema includes the Transaction model:

```prisma
model Transaction {
  id          Int      @id @default(autoincrement())
  txHash      String   @unique
  fromAddress  String
  toAddress    String
  amount       String
  donation     String
  userId       Int
  createdAt    DateTime @default(now())
}
```
