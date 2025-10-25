const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing Prisma permissions issue...\n');

const prismaClientPath = path.join(__dirname, '..', 'node_modules', '.prisma', 'client');
const queryEnginePath = path.join(prismaClientPath, 'query_engine-windows.dll.node');

try {
  // Check if the problematic file exists
  if (fs.existsSync(queryEnginePath)) {
    console.log('🗑️  Removing existing query engine...');
    fs.unlinkSync(queryEnginePath);
    console.log('✅ Query engine removed');
  }

  // Check if temp files exist and remove them
  const tempFiles = fs.readdirSync(prismaClientPath).filter(file => 
    file.includes('.tmp') || file.includes('query_engine-windows.dll.node.tmp')
  );
  
  if (tempFiles.length > 0) {
    console.log('🗑️  Removing temp files...');
    tempFiles.forEach(file => {
      try {
        fs.unlinkSync(path.join(prismaClientPath, file));
        console.log(`✅ Removed ${file}`);
      } catch (err) {
        console.log(`⚠️  Could not remove ${file}: ${err.message}`);
      }
    });
  }

  console.log('🔄 Regenerating Prisma client...');
  
  // Try to generate with different approaches
  try {
    execSync('npx prisma generate --force', { 
      stdio: 'inherit', 
      cwd: path.join(__dirname, '..'),
      timeout: 30000 
    });
    console.log('✅ Prisma client generated successfully!');
  } catch (error) {
    console.log('⚠️  First attempt failed, trying alternative approach...');
    
    // Alternative: Delete the entire .prisma folder and regenerate
    if (fs.existsSync(prismaClientPath)) {
      console.log('🗑️  Removing entire .prisma folder...');
      fs.rmSync(prismaClientPath, { recursive: true, force: true });
    }
    
    execSync('npx prisma generate', { 
      stdio: 'inherit', 
      cwd: path.join(__dirname, '..'),
      timeout: 30000 
    });
    console.log('✅ Prisma client generated successfully!');
  }

  console.log('\n🎉 Prisma permissions issue resolved!');
  console.log('📊 You can now:');
  console.log('   - Run: npm run prisma:push');
  console.log('   - Run: npm run db:test');
  console.log('   - Start your app: npm run dev');

} catch (error) {
  console.error('❌ Failed to fix Prisma permissions:', error.message);
  console.log('\n🔧 Manual solutions:');
  console.log('   1. Close all terminals and VS Code');
  console.log('   2. Run as Administrator: npm run prisma:generate');
  console.log('   3. Or try: npx prisma generate --force');
  console.log('   4. Or delete node_modules and reinstall');
  process.exit(1);
}
