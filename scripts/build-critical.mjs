// Extracts above-the-fold ("critical") CSS from the source stylesheets and
// injects it inline into each HTML file. Relative url() paths are rewritten to
// absolute so they resolve correctly from the document root.
import { readFileSync, writeFileSync } from 'node:fs';
import { posix } from 'node:path';

function matchClose(css, open) {
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') { depth--; if (depth === 0) return i; }
  }
  return css.length - 1;
}

function parse(css, media, rules) {
  rules = rules || [];
  let i = 0, end = 0;
  while (i < css.length) {
    if (css[i] === '{') {
      const prelude = css.slice(end, i).trim();
      const close = matchClose(css, i);
      if (prelude.startsWith('@media')) parse(css.slice(i + 1, close), prelude, rules);
      else if (!prelude.startsWith('@') && prelude) rules.push({ media, selector: prelude, body: css.slice(i + 1, close) });
      i = close + 1; end = i;
    } else i++;
  }
  return rules;
}

const CRIT = [':root','*','html','body','h1','h2','h3','h4','h5','h6','p','a','ul','li','img','strong','section','#page-wrapper','#header','.header-bg','#logo','#nav','.wrapper','.container','.title','#intro','.actions','.button','.homepage','input'];

const isCritical = selector => selector.split(',').some(part => {
  const s = part.trim();
  return CRIT.some(c => s === c || s.startsWith(c + ' ') || s.startsWith(c + ':') || s.startsWith(c + '>') || s.startsWith(c + '.') || s.startsWith(c + '[') || s.startsWith(c + '+'));
});

// Rewrite relative url() refs (originally relative to /assets/css/) to absolute.
const rewriteUrls = css => css.replace(/url\((['"]?)([^'")]+)\1\)/g, (m, q, u) => {
  if (/^(?:[a-z]+:|\/|#)/i.test(u)) return m;
  return `url(${posix.normalize('/assets/css/' + u)})`;
});

const strip = css => css.replace(/\/\*[\s\S]*?\*\//g, '');

const main = strip(readFileSync('src/css/main.css', 'utf8'));
const custom = strip(readFileSync('src/css/custom.css', 'utf8'));

const rules = parse(main.trim() + '\n' + custom.trim(), '', []);
let critical = '';
for (const r of rules) {
  if (!isCritical(r.selector)) continue;
  const body = r.body.trim();
  if (!body) continue;
  critical += r.media ? `${r.media}{${r.selector}{${body}}}` : `${r.selector}{${body}}`;
}
critical = rewriteUrls(critical);

const fontFace = "@font-face{font-family:'Inter';font-style:normal;font-weight:100 900;font-display:swap;src:url(/assets/webfonts/inter/inter-latin.woff2) format('woff2')}";

for (const f of ['index.html', 'solutions.html', 'approach.html', 'contact.html']) {
  let html = readFileSync(f, 'utf8');
  if (!/<style>[\s\S]*?<\/style>/.test(html)) { console.log(`WARN: no <style> in ${f}`); continue; }
  html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>${fontFace}${critical}</style>`);
  writeFileSync(f, html);
}

console.log(`critical CSS: ${(critical.length / 1024).toFixed(1)} KiB`);
