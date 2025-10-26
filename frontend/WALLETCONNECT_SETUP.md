# WalletConnect Setup Instructions

## To fix the "Failed to fetch remote project configuration" warning:

### 1. Get a WalletConnect Project ID
- Go to https://cloud.walletconnect.com/
- Sign up or log in
- Create a new project
- Copy your Project ID

### 2. Update your .env.local file
Replace the placeholder in `frontend/.env.local`:
```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-actual-project-id-here
```

### 3. Restart your development server
```bash
npm run dev
```

## Alternative: Use without WalletConnect
If you want to disable WalletConnect temporarily, you can modify the wagmi config to use only injected wallets, but this will limit wallet connection options.

The current fallback ID will work for development but may have rate limits.