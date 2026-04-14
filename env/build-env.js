// Generates env/env.js at build time using Netlify environment variables.
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.SUPABASE_DATABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing SUPABASE_URL/SUPABASE_DATABASE_URL and/or SUPABASE_KEY/SUPABASE_ANON_KEY environment variables.');
}

const envConfig = {
  SUPABASE_URL,
  SUPABASE_KEY,
};

const banner = '// File auto-generated during build. Do not edit or commit.\n';
const fileBody = `${banner}window.__ENV = ${JSON.stringify(envConfig, null, 2)};\n`;

const outDir = path.join(__dirname, '..', 'env');
const outFile = path.join(outDir, 'env.js');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, fileBody, 'utf8');
console.log('env/env.js generated successfully.');

// Auto-update version.json with build timestamp
const versionFile = path.join(__dirname, '..', 'version.json');
try {
  const current = JSON.parse(fs.readFileSync(versionFile, 'utf8'));
  current.build = new Date().toISOString().substring(0, 19).replace('T', ' ');
  const parts = (current.version || '1.0.0').split('.');
  parts[2] = String(Number(parts[2] || 0) + 1);
  current.version = parts.join('.');
  fs.writeFileSync(versionFile, JSON.stringify(current), 'utf8');
  console.log('version.json updated:', current.version, current.build);
} catch (e) {
  console.warn('Could not update version.json:', e.message);
}
