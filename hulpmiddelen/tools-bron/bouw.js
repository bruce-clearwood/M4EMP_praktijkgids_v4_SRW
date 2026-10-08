// Bouwt alle tools opnieuw naar de map downloads van de gids.
// Gebruik (vanuit deze map): npm install, daarna node bouw.js
// Is LibreOffice geïnstalleerd (soffice), dan maakt dit script ook de PDF's.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const DOWNLOADS = path.join(__dirname, '..', '..', 'downloads');
const tools = fs.readdirSync(__dirname).filter(f => f.endsWith('.js') && !['lib.js', 'bouw.js'].includes(f));

let pdf = true;
try { execFileSync('soffice', ['--version'], { stdio: 'ignore' }); } catch (e) { pdf = false; }

for (const tool of tools) {
  const uit = path.join(DOWNLOADS, tool.replace(/\.js$/, '.docx'));
  execFileSync(process.execPath, [path.join(__dirname, tool), uit], { stdio: 'inherit' });
  if (pdf) execFileSync('soffice', ['--headless', '--convert-to', 'pdf', '--outdir', DOWNLOADS, uit], { stdio: 'ignore' });
}
if (!pdf) console.log('LibreOffice niet gevonden: maak de PDF\'s in Word (Bestand, Opslaan als, PDF).');
