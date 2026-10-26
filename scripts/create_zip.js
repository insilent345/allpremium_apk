import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const rootDir = process.cwd();
const zip = new JSZip();

const IGNORED_DIRS = new Set(['node_modules', '.git', 'dist', '.aistudio', '.cache']);
const IGNORED_FILES = new Set(['.DS_Store', 'bun.lock']);

function addDirectoryToZip(dirPath, zipFolder) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    if (IGNORED_DIRS.has(item) || IGNORED_FILES.has(item) || item.endsWith('.zip')) {
      continue;
    }

    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subFolder = zipFolder ? zipFolder.folder(item) : zip.folder(item);
      addDirectoryToZip(fullPath, subFolder);
    } else {
      const content = fs.readFileSync(fullPath);
      if (zipFolder) {
        zipFolder.file(item, content);
      } else {
        zip.file(item, content);
      }
    }
  }
}

async function run() {
  console.log('Generating complete standalone ZIP package...');
  addDirectoryToZip(rootDir, null);

  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'premium_apk_complete_standalone.zip');
  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully created standalone project ZIP at: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);

  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'premium_apk_complete_standalone.zip'), buffer);
    console.log('Copied ZIP to dist/ for direct web download.');
  }
}

run().catch((err) => {
  console.error('Error generating zip:', err);
  process.exit(1);
});
