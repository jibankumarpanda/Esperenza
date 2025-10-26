# 🎯 Referral Discovery System Guide

## **Overview**
The new referral discovery system allows users to browse available referrals, select them, and only then reveal provider details while awarding points to the provider.

## **🔄 How It Works**

### **1. Discovery Phase**
- Users click "Search Referrals" on dashboard
- System shows available referrals **without provider details**
- Users can search and filter by category
- Each referral shows: code, reward, description, usage stats

### **2. Selection Phase**
- User clicks "Select" on a referral they want
- System reveals provider details (phone, wallet)
- Awards points to the provider (10 points base)
- Increments usage count for the referral
- Creates usage tracking record

### **3. Points System**
- **Provider gets points** when someone uses their referral
- **Base reward**: 10 points per usage
- **Tracking**: All points and usages are logged
- **Transparency**: Provider can see who used their referral

## **📊 Database Schema**

### **New Models Added:**
```prisma
model ReferralUsage {
  id         Int      @id @default(autoincrement())
  referralId Int
  userId     Int
  usedAt     DateTime @default(now())
}

model UserPoints {
  id          Int      @id @default(autoincrement())
  userId      Int
  points      Int
  source      String   // 'referral_usage', 'referral_created'
  description String?
  referralId  Int?
  createdAt   DateTime @default(now())
}
```

### **Updated Referral Model:**
```prisma
model Referral {
  // ... existing fields
  category    String   @default("general")
  description String?
  usages       ReferralUsage[]
  points      UserPoints[]
}
```

## **🔧 API Endpoints**

### **GET /api/referrals/available**
- **Purpose**: Fetch available referrals (no provider details)
- **Query Params**: `search`, `category`
- **Response**: List of referrals with availability status

### **POST /api/referrals/select**
- **Purpose**: Select a referral and reveal provider details
- **Body**: `{ referralId, userId }`
- **Response**: Provider details + points awarded

### **POST /api/referrals/create**
- **Purpose**: Create new referral (updated with new fields)
- **Body**: `{ code, reward, maxUsage, category, description, userId }`

## **🎨 UI Features**

### **Search Modal**
- **Search bar**: Filter by code, reward, description
- **Category filter**: Crypto, AI, Finance, Education, General
- **Real-time search**: Updates as you type
- **Availability indicators**: Shows if referral is still available

### **Referral Cards**
- **Code**: The referral code
- **Reward**: What user gets
- **Category**: Type of referral
- **Usage stats**: How many times used
- **Availability**: Green badge if available
- **Select button**: Only enabled if available

### **Selection Flow**
1. User browses available referrals
2. Clicks "Select" on desired referral
3. System shows loading state
4. Provider details revealed
5. Points awarded notification
6. Success confirmation

## **🚀 Setup Instructions**

### **1. Update Database Schema**
```bash
cd frontend
npx prisma generate
npx prisma db push
```

### **2. Test the System**
```bash
npm run test:referral-system
```

### **3. Create Sample Data**
- Create referrals with different categories
- Test the discovery flow
- Verify points are awarded correctly

## **📈 Usage Flow Example**

### **Step 1: User Creates Referral**
```javascript
// User creates referral
POST /api/referrals/create
{
  "code": "WELCOME50",
  "reward": "50 CELO bonus",
  "category": "crypto",
  "description": "Welcome bonus for new users",
  "maxUsage": 100,
  "userId": 1
}
```

### **Step 2: Another User Discovers It**
```javascript
// User searches for referrals
GET /api/referrals/available?category=crypto&search=WELCOME

// Response shows referral without provider details
{
  "success": true,
  "referrals": [{
    "id": 1,
    "code": "WELCOME50",
    "reward": "50 CELO bonus",
    "category": "crypto",
    "isAvailable": true,
    "usageCount": 0,
    "maxUsage": 100
    // No provider details shown
  }]
}
```

### **Step 3: User Selects Referral**
```javascript
// User selects the referral
POST /api/referrals/select
{
  "referralId": 1,
  "userId": 2
}

// Response reveals provider and awards points
{
  "success": true,
  "referral": { /* referral details */ },
  "provider": {
    "id": 1,
    "phoneE164": "+1234567890",
    "walletAddress": "0x..."
  },
  "pointsAwarded": 10
}
```

## **🎯 Key Benefits**

### **For Users (Discoverers)**
- ✅ **Browse without commitment**: See available referrals first
- ✅ **Filter by interest**: Search by category or keywords
- ✅ **Transparent selection**: Know what you're getting
- ✅ **Fair system**: Points go to the provider

### **For Providers**
- ✅ **Points for sharing**: Get rewarded when referrals are used
- ✅ **Usage tracking**: See how many times your referral was used
- ✅ **Privacy protection**: Details only revealed when selected
- ✅ **Fair compensation**: 10 points per usage

### **For Platform**
- ✅ **Engagement**: Users actively browse and select
- ✅ **Quality control**: Only active referrals shown
- ✅ **Analytics**: Track usage patterns and popular categories
- ✅ **Gamification**: Points system encourages participation

## **🔍 Testing Checklist**

- [ ] Database schema updated
- [ ] API endpoints working
- [ ] Search modal displays referrals
- [ ] Filtering by category works
- [ ] Selection reveals provider details
- [ ] Points are awarded correctly
- [ ] Usage count increments
- [ ] Error handling works
- [ ] UI is responsive and intuitive

## **🚨 Troubleshooting**

### **Common Issues**
1. **"Database schema not updated"**: Run `npx prisma db push`
2. **"No referrals found"**: Create some test referrals first
3. **"Referral not available"**: Check if referral is active and not at usage limit
4. **"Points not awarded"**: Check if UserPoints model exists in database

### **Debug Commands**
```bash
# Test database connection
npm run db:test-referral

# Test full system
npm run test:referral-system

# Check database in Prisma Studio
npx prisma studio
```

The referral discovery system is now ready! Users can discover, select, and use referrals while providers get rewarded with points. 🎉
