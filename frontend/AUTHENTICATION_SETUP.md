# Phone Number Authentication with RainbowKit

## 🔐 **Authentication System Created!**

I've built a comprehensive phone number authentication system integrated with RainbowKit for your EcoPay application.

### 🚀 **Features Implemented:**

#### **1. Phone Number Authentication**
- ✅ **Phone number validation** using libphonenumber-js
- ✅ **International format support** (E.164 format)
- ✅ **Phone number hashing** for security
- ✅ **Registration and login** flows

#### **2. RainbowKit Integration**
- ✅ **Wallet connection** with Celo/Alfajores support
- ✅ **Automatic wallet detection**
- ✅ **Connect button** with custom styling
- ✅ **Wallet state management**

#### **3. Smart Contract Integration**
- ✅ **Phone registration** on blockchain
- ✅ **Phone lookup** for authentication
- ✅ **Transaction tracking** in database
- ✅ **User session management**

### 📁 **Files Created:**

```
frontend/
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── components/auth/
│   ├── LoginPage.tsx            # Login/Register page
│   └── ProtectedRoute.tsx       # Route protection
├── app/
│   ├── login/page.tsx          # Login route
│   └── dashboard/page.tsx       # Protected dashboard
└── AUTHENTICATION_SETUP.md     # This guide
```

### 🎯 **How It Works:**

#### **1. User Flow:**
1. **Connect Wallet** - User connects Celo wallet via RainbowKit
2. **Enter Phone** - User enters phone number in international format
3. **Register/Login** - System registers phone on blockchain or authenticates
4. **Access Dashboard** - User gains access to protected features

#### **2. Security Features:**
- **Phone number hashing** - Phone numbers are hashed before blockchain storage
- **Wallet verification** - Only connected wallet can register/access account
- **Session management** - Secure user sessions with localStorage
- **Input validation** - Comprehensive phone number validation

#### **3. Smart Contract Integration:**
- **Phone Registration** - Registers phone hash on PhoneMapping contract
- **Phone Lookup** - Verifies phone registration for login
- **Transaction Storage** - All activities stored in database

### 🛠️ **Usage:**

#### **Login Page (`/login`):**
```tsx
// Users can:
// 1. Connect wallet
// 2. Enter phone number
// 3. Register new phone or login with existing
```

#### **Protected Dashboard (`/dashboard`):**
```tsx
// Only accessible after authentication
// Shows user info and smart contract management
```

#### **Authentication Context:**
```tsx
const { 
  user, 
  isAuthenticated, 
  login, 
  logout, 
  registerPhone 
} = useAuth();
```

### 🔧 **Environment Variables Needed:**

```env
# Contract addresses
NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS=0xYourAddress
NEXT_PUBLIC_PHONE_MAPPING_CONTRACT_ADDRESS=0xYourAddress

# RPC URLs
NEXT_PUBLIC_RPC_URL=https://alfajores-forno.celo-testnet.org

# Backend wallet
DEPLOYER_PRIVATE_KEY=your_private_key
DEPLOYER_ADDRESS=your_wallet_address

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/eco_pay_db"
```

### 🎨 **UI Features:**

- **Modern design** with Tailwind CSS
- **Responsive layout** for all devices
- **Loading states** and error handling
- **Success/error messages** with icons
- **Wallet connection status** display
- **User information** display
- **Navigation** between pages

### 🚀 **Ready to Use:**

1. **Set up environment variables**
2. **Deploy your smart contracts**
3. **Run the application**
4. **Users can now authenticate with phone numbers!**

The authentication system is fully integrated with your smart contracts and ready for production use!
