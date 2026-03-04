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
