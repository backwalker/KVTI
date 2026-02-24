import fs from 'fs';

const path = './src/data/e7_requirements.js';

let content = fs.readFileSync(path, 'utf8');

const newEducation = "해당 전공 분야 석사 이상, 또는 학사 + 1년 이상 관련 경력. (단, 국내 전문학사 이상 및 전공 무관 국내 학사 이상 졸업 유학생은 1년 경력 완전 면제 압도적 특례 적용)";
const newSalary = "전년도 한국은행 발표 1인당 GNI(국민총소득)의 80% 이상 요건 의무. (단, 지정 벤처/비수도권 중견기업 특례 70% 적용 가능)";
const newEmployer = "국민고용보호 심사 엄격 적용: 고용보험에 3개월 이상 등재된 피보험자 5명 이상 기업에 한해, 내국인 직원의 20% 이내 범위에서만 초청 허용";

content = content.replace(/education:\s*".*?",/g, `education: "${newEducation}",`);
content = content.replace(/salary:\s*".*?",/g, `salary: "${newSalary}",`);
content = content.replace(/employer:\s*".*?",/g, `employer: "${newEmployer}",`);

content = content.replace(/("441":\s*\{[\s\S]*?education:\s*").*?(",)/, `$1사업장 면적 및 부가세 한도 등 세부 별도 적용. (단, 관련 분야 국내 전문학사 졸업 유학생의 경우 경력 전면 면제 특례 적용)$2`);
content = content.replace(/("441":\s*\{[\s\S]*?salary:\s*").*?(",)/, `$1당해연도 최저임금 적용 (GNI 요건 미적용)$2`);
content = content.replace(/("261":\s*\{[\s\S]*?employer:\s*").*?(",)/, `$1로펌 및 법률 사무소 등. (국민고용보호 심사제도 비적용 대상)$2`);

fs.writeFileSync(path, content, 'utf8');
console.log('e7_requirements.js rebuilt successfully with official manual criteria.');
