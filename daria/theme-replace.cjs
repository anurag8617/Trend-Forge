const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replacements for exact classes
    content = content.replace(/bg-\[\#0A0F1C\](\/\d+)?/g, (match, p1) => p1 ? `bg-background${p1}` : 'bg-background');
    content = content.replace(/bg-\[\#1A1B41\](\/\d+)?/g, (match, p1) => p1 ? `bg-surface${p1}` : 'bg-surface');
    content = content.replace(/border-\[\#1A1B41\](\/\d+)?/g, (match, p1) => p1 ? `border-border${p1}` : 'border-border');
    content = content.replace(/text-\[\#0A0F1C\]/g, 'text-background');
    content = content.replace(/text-\[\#1A1B41\]/g, 'text-surface');
    content = content.replace(/bg-gradient-to-br from-\[\#0A0F1C\] to-\[\#11162b\]/g, 'bg-background');

    // We can also fix AppShell manually if it doesn't match perfectly
    // For anything remaining like stroke="#1A1B41" or #1A1B41 plain occurrences (if in style) we leave or change
    content = content.replace(/stroke="\#1A1B41"/g, 'stroke="var(--color-border)"');

    fs.writeFileSync(file, content, 'utf8');
});
console.log('Replaced all hardcoded colors in src/');
