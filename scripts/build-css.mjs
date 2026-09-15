// Concatenates main.css + custom.css into a single styles.css.
// A single async stylesheet overrides the inline critical CSS atomically,
// avoiding a transient layout shift between the two files.
import { readFileSync, writeFileSync } from 'node:fs';

const strip = css => css.replace(/\/\*[\s\S]*?\*\//g, '').trim();

const main = strip(readFileSync('src/css/main.css', 'utf8'));
const custom = strip(readFileSync('src/css/custom.css', 'utf8'));

const combined = main + '\n' + custom + '\n';
writeFileSync('public/assets/css/styles.css', combined);

console.log(`styles.css: ${(combined.length / 1024).toFixed(1)} KiB`);
