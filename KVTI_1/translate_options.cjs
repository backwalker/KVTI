try {
    const fs = require('fs');
    const content = fs.readFileSync('src/components/BaseProfileForm.jsx', 'utf-8');

    const regionRegex = /<option value=\"([^\"]+)\">([^<]+)<\/option>/g;
    const optgroupRegex = /<optgroup label=\"([^\"]+)\">/g;

    let ko = {};
    let en = {};

    let match;
    while ((match = regionRegex.exec(content)) !== null) {
        const val = match[1];
        const label = match[2];
        if (val.length < 100) {

            // e.g. "서울 (Seoul)"
            let k = label;
            let e = label;

            if (label.includes(' (')) {
                k = label.split(' (')[0];
                e = label.split(' (')[1].replace(')', '');
            }

            // We already translated topik, kiip, grade, etc, so skip if needed or just add it
            ko[val] = k;
            en[val] = e;
        }
    }

    // optgroups
    const optgroups = [...content.matchAll(/<optgroup label=\"([^\"]+)\">/g)].map(m => m[1]);
    // We also have '4년제 대학교' -> '4-Year University' and '2~3년제 전문대학' -> '2~3-Year College'

    optgroups.forEach(label => {
        let k = label;
        let e = label;
        if (label.includes(' (')) {
            k = label.split(' (')[0];
            e = label.split(' (')[1].replace(')', '');
        }
        ko[label] = k;
        en[label] = e;
    });

    ko['4년제 대학교'] = '4년제 대학교';
    en['4년제 대학교'] = '4-Year University';
    ko['2~3년제 전문대학'] = '2~3년제 전문대학';
    en['2~3년제 전문대학'] = '2~3-Year College';
    ko['기타 대학교'] = '기타 대학교';
    en['기타 대학교'] = 'Other University';

    // Now parse universities!
    const univRegex = /'([가-힣\/\(\)a-zA-Z\s,]+)'/g;
    // Actually just extract the whole dict from BaseProfileForm.jsx
    // It's a static object.
    // Extract the string manually
    const startIdx = content.indexOf('const universitiesByRegion = {');
    const endIdx = content.indexOf('    };\n\n    const handleSubmit');
    const objStr = content.substring(startIdx + 29, endIdx + 5);

    // we need to evaluate it?
    // Let's just create a list of all universities
    const fn = new Function('return (' + objStr + ')');
    const univDict = fn();

    let univSet = new Set();
    for (let r in univDict) {
        for (let g in univDict[r]) {
            for (let u of univDict[r][g]) {
                univSet.add(u);
            }
        }
    }

    function translateUniv(kor) {
        let out = kor
            .replace('대학교', ' University')
            .replace('전문대학', ' College')
            .replace('보건대학교', ' Health College')
            .replace('과학대학교', ' Science College')
            .replace('여자대학교', " Women's University")
            .replace('교육대학교', ' National University of Education');

        if (out.includes('국립')) out = out.replace('국립', '') + ' National';
        if (out === '기타 4년제 대학교') return 'Other 4-Year University';
        if (out === '기타 2~3년제 전문대학') return 'Other 2~3-Year College';
        return out.trim();
    }

    for (let u of univSet) {
        ko[u] = u;
        en[u] = translateUniv(u);
    }

    // Wait, the user has "Other (기타)" in nationalities
    ko['기타'] = '기타';
    en['기타'] = 'Other';

    fs.writeFileSync('src/locales/ko/profile_data.json', JSON.stringify(ko, null, 2));
    fs.writeFileSync('src/locales/en/profile_data.json', JSON.stringify(en, null, 2));

    console.log('Done!');
} catch (e) { console.error('BIG ERROR: ' + e.message + e.stack); process.exit(1); }
