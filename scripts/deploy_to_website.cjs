/**
 * RETROSPEED -> KSM x Tech Web Site Deployment Sync Script
 * 
 * Automatically synchronizes the Vite production build into the official
 * static website repository at /retrospeed/play/
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const websiteTargetDir = path.resolve(projectRoot, '..', 'KSM x Tech Web Site', 'retrospeed', 'play');

console.log('🚀 Synchronizing RETROSPEED web build to official website...');
console.log(`   Source: ${distDir}`);
console.log(`   Target: ${websiteTargetDir}`);

if (!fs.existsSync(distDir)) {
  console.error('❌ Error: dist/ directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Ensure target directory exists and is clean
if (fs.existsSync(websiteTargetDir)) {
  console.log('🧹 Cleaning old build in website target directory...');
  fs.rmSync(websiteTargetDir, { recursive: true, force: true });
}
fs.mkdirSync(websiteTargetDir, { recursive: true });

// Copy all dist assets recursively
fs.cpSync(distDir, websiteTargetDir, { recursive: true });

// Verify critical files
const criticalFiles = ['index.html', 'favicon.svg', 'assets'];
const missingFiles = criticalFiles.filter(f => !fs.existsSync(path.join(websiteTargetDir, f)));

if (missingFiles.length > 0) {
  console.error(`❌ Verification failed: Missing files: ${missingFiles.join(', ')}`);
  process.exit(1);
}

// Count copied files
function countFiles(dir) {
  let count = 0;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      count += countFiles(path.join(dir, item.name));
    } else {
      count++;
    }
  }
  return count;
}

const totalFiles = countFiles(websiteTargetDir);
console.log(`✅ Success! Successfully copied ${totalFiles} files to ${websiteTargetDir}`);
console.log('   App is now live at: /retrospeed/play/');
