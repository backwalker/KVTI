const fs = require('fs');
const content = fs.readFileSync('src/components/BaseProfileForm.jsx', 'utf-8');

let ko = {};
let en = {};

// 1. Process regular string options
const optRegex = /<option value=\"([^\"]+)\">([^<]+)<\/option>/g;
let match;
while ((match = optRegex.exec(content)) !== null) {
    const val = match[1];
    const label = match[2];

    // Ignore topiks, kiips and grades as they are already translated manually
    if (val.length < 100 && !['0', '1', '2', '3', '4', '5', '6', 'none', 'basic', 'business', 'native', '1학년', '2학년', '3학년', '4학년', '석박사', '졸업'].includes(val)) {
        let k = label;
        let e = label;
        if (label.includes(' (')) {
            k = label.split(' (')[0];
            e = label.split(' (')[1].replace(')', '');
        }
        ko[val] = k.trim();
        en[val] = e.trim();
    }
}

// 2. Process optgroups
const optgroups = [...content.matchAll(/<optgroup label=\"([^\"]+)\">/g)].map(m => m[1]);
optgroups.forEach(label => {
    let k = label;
    let e = label;
    if (label.includes(' (')) {
        k = label.split(' (')[0];
        e = label.split(' (')[1].replace(')', '');
    }
    ko[label] = k.trim();
    en[label] = e.trim();
});

ko['4년제 대학교'] = '4년제 대학교';
en['4년제 대학교'] = '4-Year University';
ko['2~3년제 전문대학'] = '2~3년제 전문대학';
en['2~3년제 전문대학'] = '2~3-Year College';
ko['기타 대학교'] = '기타 대학교';
en['기타 대학교'] = 'Other University';

// 3. Process Universities explicitly from the block
const startIdx = content.indexOf('const universitiesByRegion = {');
const endIdx = content.indexOf('const handleSubmit');
const objBlock = content.substring(startIdx, endIdx);

const allStrings = [...objBlock.matchAll(/'([^']+)'/g)].map(m => m[1]);

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

    // Some regions might be matched too, let's add them
    if (out === '서울') return 'Seoul';
    if (out === '경기/인천') return 'Gyeonggi/Incheon';
    if (out === '부산/경남') return 'Busan/Gyeongnam';
    if (out === '대구/경북') return 'Daegu/Gyeongbuk';
    if (out === '광주/전라') return 'Gwangju/Jeolla';
    if (out === '대전/충청') return 'Daejeon/Chungcheong';
    if (out === '강원/제주') return 'Gangwon/Jeju';
    if (out === '4년제 대학교') return '4-Year University';
    if (out === '2~3년제 전문대학') return '2~3-Year College';

    return out.trim();
}

for (let s of allStrings) {
    if (!ko[s]) ko[s] = s;
    if (!en[s]) en[s] = translateUniv(s);
}

// Add 기타 if needed
ko['기타'] = '기타';
en['기타'] = 'Other';

const existingKo = JSON.parse(fs.readFileSync('src/locales/ko/common.json', 'utf8'));
const existingEn = JSON.parse(fs.readFileSync('src/locales/en/common.json', 'utf8'));

existingKo['profile_data'] = ko;
existingEn['profile_data'] = en;

fs.writeFileSync('src/locales/ko/common.json', JSON.stringify(existingKo, null, 2));
fs.writeFileSync('src/locales/en/common.json', JSON.stringify(existingEn, null, 2));

console.log('Success, generated profile_data into common.json!');
