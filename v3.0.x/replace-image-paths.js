#!/usr/bin/env node

/**
 * Script to replace local asset paths with S3/CDN URLs in markdown files
 * 
 * Usage:
 *   node replace-image-paths.js --dry-run  (preview changes without modifying files)
 *   node replace-image-paths.js            (execute the replacement)
 */

const fs = require('fs');
const path = require('path');

// ============ Configuration ============
const CONFIG = {
  // URL Configuration
  baseUrl: process.env.S3_BASE_URL || 'https://milvus-docs.s3.us-west-2.amazonaws.com/',
  prefix: 'assets',
  
  // Local paths
  paths: {
    siteDir: path.join(__dirname, 'site', 'en'),
    assetsDir: path.join(__dirname, 'assets'),
  },
  
  // Processing options
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose') || process.argv.includes('-v'),
};

// ============ Helper Functions ============

/**
 * Recursively find all .md files in a directory
 */
const findMarkdownFiles = (dir) => {
  const files = [];
  
  const walk = (currentDir) => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  };
  
  walk(dir);
  return files;
};

/**
 * Extract all local asset references from markdown content
 * Returns array of { type, original, assetPath, line }
 */
const extractAssetReferences = (content, filePath) => {
  const references = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Pattern 1: Markdown image syntax ![alt](path)
    const mdImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = mdImageRegex.exec(line)) !== null) {
      const imagePath = match[2].trim();
      // Only process local asset references (not external URLs)
      if (imagePath.includes('assets/') && 
          !imagePath.startsWith('http://') && 
          !imagePath.startsWith('https://')) {
        references.push({
          type: 'markdown',
          original: match[0],
          alt: match[1],
          assetPath: imagePath,
          line: index + 1,
        });
      }
    }
    
    // Pattern 2: HTML img tag <img src="path" /> or <img ... src="path" ... />
    const htmlImageRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*\/?>/gi;
    
    while ((match = htmlImageRegex.exec(line)) !== null) {
      const imagePath = match[1].trim();
      // Only process local asset references (not external URLs)
      if (imagePath.includes('assets/') && 
          !imagePath.startsWith('http://') && 
          !imagePath.startsWith('https://')) {
        references.push({
          type: 'html',
          original: match[0],
          assetPath: imagePath,
          line: index + 1,
        });
      }
    }
  });
  
  return references;
};

/**
 * Resolve relative asset path to absolute file system path
 */
const resolveAssetPath = (markdownFilePath, relativeAssetPath) => {
  const markdownDir = path.dirname(markdownFilePath);
  const absolutePath = path.resolve(markdownDir, relativeAssetPath);
  return absolutePath;
};

/**
 * Generate URL from local file path
 */
const generateUrl = (localFilePath) => {
  const relativePath = path.relative(CONFIG.paths.assetsDir, localFilePath);
  // Normalize path separators to forward slashes for URLs
  const normalizedPath = relativePath.replace(/\\/g, '/');
  return `${CONFIG.baseUrl}${CONFIG.prefix}/${normalizedPath}`;
};

/**
 * Replace asset references in markdown content
 */
const replaceAssetReferences = (content, replacements) => {
  let newContent = content;
  
  // Create a map to avoid duplicate replacements
  const replacementMap = new Map();
  replacements.forEach(r => {
    replacementMap.set(r.original, r.new);
  });
  
  // Apply replacements
  replacementMap.forEach((newText, oldText) => {
    // Escape special regex characters in the original text
    const escapedOld = oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedOld, 'g');
    newContent = newContent.replace(regex, newText);
  });
  
  return newContent;
};

// ============ Main Processing Logic ============

const processMarkdownFile = (filePath, stats) => {
  const relativePath = path.relative(CONFIG.paths.siteDir, filePath);
  
  if (CONFIG.verbose) {
    console.log(`\nProcessing: ${relativePath}`);
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const references = extractAssetReferences(content, filePath);
  
  if (references.length === 0) {
    return;
  }
  
  console.log(`\n📄 ${relativePath}`);
  console.log(`   Found ${references.length} asset reference(s)`);
  
  const replacements = [];
  
  for (const ref of references) {
    // asset path may contain alt text
    const assetPath = ref.assetPath.split(' ')[0];
    const absoluteAssetPath = resolveAssetPath(filePath, assetPath);
    
    // Check if the file exists
    if (!fs.existsSync(absoluteAssetPath)) {
      console.log(`   ⚠️  Line ${ref.line}: File not found - ${assetPath}`);
      stats.errors.push({
        file: relativePath,
        line: ref.line,
        error: `File not found: ${assetPath}`,
      });
      continue;
    }
    
    const newUrl = generateUrl(absoluteAssetPath);
    
    // Track unique images
    if (!stats.images.has(absoluteAssetPath)) {
      stats.images.set(absoluteAssetPath, {
        localPath: absoluteAssetPath,
        url: newUrl,
        size: fs.statSync(absoluteAssetPath).size,
      });
    }
    
    // Create replacement
    let newReference;
    if (ref.type === 'markdown') {
      newReference = `![${ref.alt}](${newUrl})`;
    } else { // html
      newReference = ref.original.replace(ref.assetPath, newUrl);
    }
    
    replacements.push({
      original: ref.original,
      new: newReference,
    });
    
    console.log(`   ✓ Line ${ref.line}: ${ref.assetPath}`);
    console.log(`     → ${newUrl}`);
  }
  
  // Apply replacements
  if (replacements.length > 0) {
    stats.filesModified++;
    
    if (!CONFIG.dryRun) {
      const newContent = replaceAssetReferences(content, replacements);
      fs.writeFileSync(filePath, newContent, 'utf-8');
    }
  }
};

const printSummary = (stats) => {
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary');
  console.log('='.repeat(60));
  
  console.log(`\n📄 Files processed: ${stats.filesProcessed}`);
  console.log(`✏️  Files modified: ${stats.filesModified}`);
  console.log(`🖼️  Unique images: ${stats.images.size}`);
  
  const totalSize = Array.from(stats.images.values())
    .reduce((sum, img) => sum + img.size, 0);
  const sizeMB = (totalSize / 1024 / 1024).toFixed(2);
  console.log(`📦 Total size: ${sizeMB} MB`);
  
  // Image format breakdown
  const formatCounts = new Map();
  Array.from(stats.images.values()).forEach(img => {
    const ext = path.extname(img.localPath).toLowerCase();
    formatCounts.set(ext, (formatCounts.get(ext) || 0) + 1);
  });
  
  if (formatCounts.size > 0) {
    console.log('\n📸 Image formats:');
    Array.from(formatCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .forEach(([ext, count]) => {
        console.log(`   ${ext || '(no ext)'}: ${count}`);
      });
  }
  
  if (stats.errors.length > 0) {
    console.log(`\n⚠️  Errors: ${stats.errors.length}`);
    stats.errors.forEach((err, idx) => {
      if (idx < 10) { // Limit display to first 10 errors
        console.log(`   - ${err.file}${err.line ? `:${err.line}` : ''}`);
        console.log(`     ${err.error}`);
      }
    });
    if (stats.errors.length > 10) {
      console.log(`   ... and ${stats.errors.length - 10} more errors`);
    }
  }
  
  if (CONFIG.dryRun) {
    console.log('\n🔍 DRY RUN MODE - No changes were made');
    console.log('   Run without --dry-run to execute the replacement');
  } else {
    console.log('\n✅ Replacement completed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Review changes: git diff site/en');
    console.log('   2. Test a few image URLs in your browser');
    console.log('   3. Commit changes: git add . && git commit -m "Replace image paths with CDN URLs"');
  }
  
  console.log('='.repeat(60) + '\n');
};

// ============ Main Function ============

const main = () => {
  console.log('🚀 Milvus Docs - Replace Image Paths');
  console.log('='.repeat(60));

  
  if (CONFIG.dryRun) {
    console.log('🔍 Running in DRY RUN mode\n');
  }
  
  // Verify directories exist
  if (!fs.existsSync(CONFIG.paths.siteDir)) {
    console.error(`❌ Error: Site directory not found: ${CONFIG.paths.siteDir}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(CONFIG.paths.assetsDir)) {
    console.error(`❌ Error: Assets directory not found: ${CONFIG.paths.assetsDir}`);
    process.exit(1);
  }
  
  // Check URL configuration
  if (CONFIG.baseUrl === 'https://your-cdn-url.com') {
    console.error('❌ Error: Please configure S3_BASE_URL environment variable');
    console.error('   Example: export S3_BASE_URL=https://your-bucket.s3.amazonaws.com');
    process.exit(1);
  }
  
  console.log('📂 Configuration:');
  console.log(`   Site directory: ${CONFIG.paths.siteDir}`);
  console.log(`   Assets directory: ${CONFIG.paths.assetsDir}`);
  console.log(`   Base URL: ${CONFIG.baseUrl}`);
  
  // Initialize stats
  const stats = {
    filesProcessed: 0,
    filesModified: 0,
    images: new Map(),
    errors: [],
  };
  
  // Find all markdown files
  console.log('\n📝 Finding markdown files...');
  const markdownFiles = findMarkdownFiles(CONFIG.paths.siteDir);
  console.log(`   Found ${markdownFiles.length} markdown files`);
  
  // Process each markdown file
  console.log('\n🔍 Analyzing and replacing...');
  
  for (const file of markdownFiles) {
    stats.filesProcessed++;
    processMarkdownFile(file, stats);
  }
  
  // Print summary
  printSummary(stats);
};

// Run the script
main();

