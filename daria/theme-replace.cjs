const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
}

const files = walkSync(path.join(__dirname, 'src'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  // Easy tailwind utilities
  content = content.replace(/text-\[\#3DD6F5\]/g, 'text-accent');
  content = content.replace(/bg-\[\#3DD6F5\]/g, 'bg-accent');
  content = content.replace(/border-\[\#3DD6F5\]/g, 'border-accent');
  content = content.replace(/fill-\[\#3DD6F5\]/g, 'fill-accent');
  content = content.replace(/stroke-\[\#3DD6F5\]/g, 'stroke-accent');

  // Replace #3DD6F5 in shadows with var(--theme-accent)
  content = content.replace(/shadow-\[([^\]]+)\#3DD6F5([^\]]*)\]/g, 'shadow-[$1var(--theme-accent)$2]');
  
  // Replace arbitrary rgba with rgb(var(--theme-accent-rgb) / alpha)
  // e.g. rgba(61,214,245,0.4) -> rgb(var(--theme-accent-rgb) / 0.4)
  // shadow-[0_0_15px_rgba(61,214,245,0.2)]
  content = content.replace(/rgba\(61,\s*214,\s*245,\s*([0-9.]+)\)/g, 'rgb(var(--theme-accent-rgb) / $1)');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log('Updated', file);
  }
}
