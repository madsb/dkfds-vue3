#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Ensure directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy file
function copyFile(src, dest) {
  console.log(`Copying ${src} to ${dest}`);
  fs.copyFileSync(src, dest);
}

// Copy directory recursively
function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

console.log('Building dkfds-vue3 distribution package...\n');

// Define packages to process
const packages = ['core', 'extra', 'utils'];

packages.forEach(pkg => {
  console.log(`Processing ${pkg}...`);
  
  const srcDistDir = path.join(__dirname, '..', pkg, 'dist');
  const destDir = path.join(__dirname, pkg);
  
  // Ensure destination directory exists
  ensureDir(destDir);
  
  // Copy built JavaScript files
  const mjsFile = `dkfds-vue3-${pkg}.mjs`;
  const umdFile = `dkfds-vue3-${pkg}.umd.js`;
  
  if (fs.existsSync(path.join(srcDistDir, mjsFile))) {
    copyFile(path.join(srcDistDir, mjsFile), path.join(destDir, mjsFile));
  }
  
  if (fs.existsSync(path.join(srcDistDir, umdFile))) {
    copyFile(path.join(srcDistDir, umdFile), path.join(destDir, umdFile));
  }
  
  // Copy TypeScript declarations
  const indexDts = path.join(srcDistDir, 'index.d.ts');
  if (fs.existsSync(indexDts)) {
    copyFile(indexDts, path.join(destDir, 'index.d.ts'));
  }
  
  // Copy component declarations
  const componentsDir = path.join(srcDistDir, 'components');
  if (fs.existsSync(componentsDir)) {
    copyDir(componentsDir, path.join(destDir, 'components'));
  }
  
  // Copy style.css if it exists
  const styleCss = path.join(srcDistDir, 'style.css');
  if (fs.existsSync(styleCss)) {
    copyFile(styleCss, path.join(destDir, 'style.css'));
  }
  
  // For core package, copy assets from src
  if (pkg === 'core') {
    const srcAssetsDir = path.join(__dirname, '..', pkg, 'src', 'assets');
    const destAssetsDir = path.join(destDir, 'assets');
    
    if (fs.existsSync(srcAssetsDir)) {
      console.log(`Copying ${pkg} assets...`);
      copyDir(srcAssetsDir, destAssetsDir);
    }
  }
  
  console.log(`✓ ${pkg} done\n`);
});

console.log('Build complete!');