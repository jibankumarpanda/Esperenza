# Referral System Troubleshooting Guide

## 🚨 **500 Error: "Failed to create referral"**

This error occurs when the database schema hasn't been updated with the new `Referral` model.

### **Quick Fix:**

1. **Update Database Schema:**
   ```bash
   cd frontend
   npx prisma generate
   npx prisma db push
   ```

2. **Test Database Connection:**
   ```bash
   npm run db:test-referral
   ```

3. **If Prisma Permissions Error:**
   ```bash
   npm run fix:prisma
   ```

### **Step-by-Step Solution:**

#### **Step 1: Check Database Status**
```bash
# Test if Referral model exists
npm run db:test-referral
```

**Expected Output:**
```
✅ Database connection successful
✅ Referral model exists and is accessible
✅ User model exists and is accessible
```

#### **Step 2: Update Schema (if needed)**
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Test again
npm run db:test-referral
```

#### **Step 3: Fix Permissions (Windows)**
If you get permission errors:
```bash
# Close all terminals and VS Code
# Run as Administrator
npm run fix:prisma
```

### **Error Messages & Solutions:**

#### **"Unknown field 'referral' does not exist"**
- **Cause**: Database schema not updated
- **Solution**: Run `npx prisma db push`

#### **"EPERM: operation not permitted"**
- **Cause**: Windows file permission issue
- **Solution**: Run `npm run fix:prisma` or restart as Administrator

#### **"Can't reach database server"**
- **Cause**: PostgreSQL not running
- **Solution**: Start PostgreSQL service

### **Fallback System:**

If database is not ready, the system will:
1. ✅ Show user-friendly error message
2. ✅ Store referral temporarily in localStorage
3. ✅ Display referral in UI (marked as temporary)
4. ✅ Allow user to continue working

### **Testing the Fix:**

1. **Create a referral** through the dashboard
2. **Check browser console** for success logs
3. **Verify in database** using Prisma Studio:
   ```bash
   npx prisma studio
   ```

### **Database Schema Verification:**

The `Referral` model should have:
```prisma
model Referral {
  id          Int      @id @default(autoincrement())
  platform    String
  code        String
  description String?
  reward      String
  uses        Int      @default(0)
  userId      Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User     @relation(fields: [userId], references: [id])
}
```

### **API Endpoints Status:**

- ✅ `/api/referrals/create` - Creates referral with user details
- ✅ `/api/referrals/user` - Fetches user referrals
- ✅ Error handling for schema issues
- ✅ Fallback to localStorage

### **Success Indicators:**

When working correctly, you should see:
```
🔗 Referral creation API called
📊 Referral data: { platform: "Gemini", code: "GEM50", ... }
✅ Creating new referral in database...
🎉 Referral created successfully: { id: 1, ... }
```

### **Still Having Issues?**

1. **Check server logs** in terminal for detailed error messages
2. **Verify DATABASE_URL** in `.env` file
3. **Ensure PostgreSQL is running**
4. **Try restarting the development server**

The system is designed to be resilient and will work even if the database isn't ready yet!
