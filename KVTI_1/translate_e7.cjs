const fs = require('fs');
const path = require('path');

// 1. Load the original JS file
const codePath = path.join(__dirname, 'src', 'data', 'e7_requirements.js');
const code = fs.readFileSync(codePath, 'utf8');

// A bit of hacking to extract the object
const jsonLike = code.replace(/export const E7_REQUIREMENTS =/g, '').replace(/;/g, '');
const E7 = eval('(' + jsonLike + ')');

// 2. Load the dictionaries
const dict1 = require('./dict1.json');
const dict2 = require('./dict2.json');
const dict3 = require('./dict3.json');
const dict4 = require('./dict4.json');

const translationDict = { ...dict1, ...dict2, ...dict3, ...dict4 };

// 3. Recursive translation function
function translateObject(obj) {
    if (typeof obj === 'string') {
        const translated = translationDict[obj];
        return translated ? translated : obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(translateObject);
    }
    if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (const [key, value] of Object.entries(obj)) {
            newObj[key] = translateObject(value);
        }
        return newObj;
    }
    return obj;
}

// 4. Translate!
const translatedE7 = translateObject(E7);

// 5. Output to JS file
const outPath = path.join(__dirname, 'src', 'data', 'e7_requirements_en.js');
const outString = `export const E7_REQUIREMENTS = ${JSON.stringify(translatedE7, null, 4)};\n`;

fs.writeFileSync(outPath, outString, 'utf8');
console.log('Successfully generated src/data/e7_requirements_en.js');
