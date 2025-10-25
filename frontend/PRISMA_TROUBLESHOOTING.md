# Prisma Permissions Troubleshooting Guide

## The Error
```
EPERM: operation not permitted, rename 'query_engine-windows.dll.node.tmp' -> 'query_engine-windows.dll.node'
```

This is a common Windows issue where Prisma can't replace the query engine file due to file locks or permissions.

## 🔧 **Quick Fixes (Try in Order)**

### 1. **Run the Fix Script**
```bash
npm run fix:prisma
```

### 2. **Manual File Cleanup**
```bash
# Close all terminals and VS Code first
# Then run:
rmdir /s "node_modules\.prisma"
npm run prisma:generate
```

### 3. **Force Regeneration**
```bash
npx prisma generate --force
```

### 4. **Run as Administrator**
1. Close all terminals and VS Code
2. Right-click Command Prompt → "Run as administrator"
3. Navigate to your project: `cd "D:\hackathon projects\Eco_pay\frontend"`
4. Run: `npm run prisma:generate`

### 5. **Complete Clean Reinstall**
```bash
# Delete node_modules and package-lock.json
rmdir /s node_modules
del package-lock.json

# Reinstall everything
npm install

# Generate Prisma client
npm run prisma:generate
```

## 🛠 **Advanced Solutions**

### **Solution A: Antivirus/Windows Defender**
1. Add your project folder to Windows Defender exclusions
2. Temporarily disable real-time protection
3. Run `npm run prisma:generate`
4. Re-enable protection

### **Solution B: File Lock Detection**
```bash
# Check what's using the file
handle.exe "query_engine-windows.dll.node"
```

### **Solution C: Alternative Prisma Installation**
```bash
# Install Prisma globally
npm install -g prisma

# Use global installation
npx prisma generate
```

## 🔍 **Root Causes**

1. **File Locks**: Another process is using the query engine
2. **Permissions**: Windows UAC blocking file operations
3. **Antivirus**: Real-time scanning interfering
4. **IDE**: VS Code or other editors locking files
5. **Background Processes**: Node processes still running

## ✅ **Prevention Tips**

1. **Always close terminals** before running Prisma commands
2. **Close VS Code** when regenerating Prisma client
3. **Use WSL** if available: `wsl npm run prisma:generate`
4. **Add exclusions** to Windows Defender
5. **Run as administrator** for development

## 🚀 **Alternative Development Setup**

### **Option 1: Use WSL (Windows Subsystem for Linux)**
```bash
# Install WSL if not already installed
wsl --install

# In WSL terminal:
cd /mnt/d/hackathon\ projects/Eco_pay/frontend
npm run prisma:generate
```

### **Option 2: Use Docker**
```bash
# Create docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    volumes:
      - .:/app
    working_dir: /app
    command: npm run prisma:generate
```

## 🔧 **Quick Commands Reference**

```bash
# Fix permissions
npm run fix:prisma

# Clean and regenerate
rmdir /s node_modules && npm install && npm run prisma:generate

# Force generation
npx prisma generate --force

# Test database
npm run db:test

# Setup complete database
npm run db:setup
```

## 📞 **If Nothing Works**

1. **Use online database** (Supabase, Railway, Neon)
2. **Switch to WSL** for development
3. **Use Docker** for consistent environment
4. **Contact support** with full error logs

## 🎯 **Success Indicators**

You'll know it's working when you see:
```
✅ Prisma client generated successfully!
✅ Database connection successful!
```

Then you can proceed with:
```bash
npm run prisma:push
npm run db:test
npm run dev
```
