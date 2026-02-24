import { execSync } from 'child_process';
import fs from 'fs';

try {
    // Correct Git path: Use relative path from the current directory.
    const oldData = execSync('git show HEAD:src/data/e7_requirements.js', { encoding: 'utf-8' });
    const currentData = fs.readFileSync('./src/data/e7_requirements.js', 'utf8');

    const regex = /"(\w{3,4})"\s*:\s*\{[\s\S]*?employer:\s*"(.*?)"/g;
    let match;
    const oldEmployers = {};

    while ((match = regex.exec(oldData)) !== null) {
        oldEmployers[match[1]] = match[2];
    }

    console.log(`Found ${Object.keys(oldEmployers).length} old employers.`);

    let newData = currentData;
    let injectedCount = 0;

    for (const [code, oldEmployerStr] of Object.entries(oldEmployers)) {
        const checkRegex = new RegExp(`("${code}":\\s*\\{[\\s\\S]*?exampleJobs:)`);
        if (checkRegex.test(newData)) {
            continue;
        }

        const safeOldStr = oldEmployerStr.replace(/\$/g, '$$$$');
        const blockRegex = new RegExp(`("${code}":\\s*\\{[\\s\\S]*?employer:\\s*".*?",)`);

        newData = newData.replace(blockRegex, `$1\n                exampleJobs: "${safeOldStr}",`);
        injectedCount++;
    }

    fs.writeFileSync('./src/data/e7_requirements.js', newData, 'utf8');
    console.log(`Restoration complete! Injected ${injectedCount} exampleJobs fields.`);

} catch (e) {
    console.error("Error during extraction:", e.message);
}
