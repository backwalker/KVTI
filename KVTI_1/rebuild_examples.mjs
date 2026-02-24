import fs from 'fs';

const oldData = fs.readFileSync('./src/data/e7_requirements_old.js', 'utf8');
const currentData = fs.readFileSync('./src/data/e7_requirements.js', 'utf8');

// The field we want to extract from the old file was named 'employer'
const regex = /"?code"?:\s*"(\w+)"[\s\S]*?employer:\s*"(.*?)"/g;
let match;
const oldEmployers = {};

while ((match = regex.exec(oldData)) !== null) {
    oldEmployers[match[1]] = match[2];
}

let newData = currentData;

for (const [code, oldEmployerStr] of Object.entries(oldEmployers)) {
    // Escape string to avoid regex breaking
    const safeOldStr = oldEmployerStr.replace(/\$/g, '$$$$');

    // Find where the employer property is for this specific code block
    const blockRegex = new RegExp(`("${code}":\\s*\\{[\\s\\S]*?employer:\\s*".*?",)`);
    newData = newData.replace(blockRegex, `$1\n                exampleJobs: "${safeOldStr}",`);
}

fs.writeFileSync('./src/data/e7_requirements.js', newData, 'utf8');
console.log('Restoration of exampleJobs complete.');
