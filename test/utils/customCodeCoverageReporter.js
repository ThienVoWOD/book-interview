#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', '..', 'coverage', 'coverage-summary.json');
if ( fs.existsSync( filePath ) ) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const results = Object.entries(data.total)
    for (let i = 0; i < results.length; i++) {
        const [name,{pct}] = results[i];
        console.log(`${name} : ${pct}%`);
    }
    const avgCoverage = results.reduce( (acc, [, { pct } ]) => acc + pct, 0 ) / results.length
    console.log(`Code coverage: ${avgCoverage.toFixed(2)}`)
}
