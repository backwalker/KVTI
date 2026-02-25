const fs = require('fs');

let code = fs.readFileSync('src/utils/kvtiLogic.js', 'utf8');

// 1. Update Imports
const newImports = `import { E7_DB as E7_DB_KO, KVTI_32_PERSONAS as KVTI_32_PERSONAS_KO, detectIndustry } from '../data/persona_data.js';
import { E7_DB as E7_DB_EN, KVTI_32_PERSONAS as KVTI_32_PERSONAS_EN } from '../data/persona_data_en.js';
import { KVTI_DICTIONARY as KVTI_DICTIONARY_KO } from '../data/kvti_dictionary.js';
import { KVTI_DICTIONARY as KVTI_DICTIONARY_EN } from '../data/kvti_dictionary_en.js';
import { E7_REQUIREMENTS as E7_REQUIREMENTS_KO } from '../data/e7_requirements.js';
import { E7_REQUIREMENTS as E7_REQUIREMENTS_EN } from '../data/e7_requirements_en.js';`;

code = code.replace(/import \{ E7_DB, detectIndustry \} from '\.\.\/data\/persona_data\.js';[\s\S]*?import \{ E7_REQUIREMENTS \} from '\.\.\/data\/e7_requirements\.js';/, newImports);

// 2. Update Function Definition
code = code.replace(
    /export const calculateKvtiResult = \(answers, diagnosticGrade = 'senior', phase0Data = null\) => \{/,
    `export const calculateKvtiResult = (answers, diagnosticGrade = 'senior', phase0Data = null, locale = 'ko') => {
    const E7_DB = locale === 'en' ? E7_DB_EN : E7_DB_KO;
    const KVTI_32_PERSONAS = locale === 'en' ? KVTI_32_PERSONAS_EN : KVTI_32_PERSONAS_KO;
    const KVTI_DICTIONARY = locale === 'en' ? KVTI_DICTIONARY_EN : KVTI_DICTIONARY_KO;
    const E7_REQUIREMENTS = locale === 'en' ? E7_REQUIREMENTS_EN : E7_REQUIREMENTS_KO;
`
);

// 3. Fix Title splits
code = code.replace(/title: jData \? jData\.name_ko\.split\(\'\\\(\'\)\[0\]\.trim\(\) : \"추천 직무\"/g,
    "title: jData ? (locale === 'en' ? jData.name_ko : jData.name_ko.split('(')[0].trim()) : (locale === 'en' ? 'Recommended Job' : '추천 직무')");

code = code.replace(/title: E7_DB\[\"D84_STARTUP\"\]\?\.name_ko\.split\(\'\\\(\'\)\[0\]\.trim\(\) \|\| \"기술 창업\\(D-8-4\\)\"/g,
    "title: E7_DB[\"D84_STARTUP\"]?.name_ko || (locale === 'en' ? 'Tech Startup (D-8-4)' : '기술 창업(D-8-4)')");

code = code.replace(/title: fbData \? fbData\.name_ko\.split\(\'\\\(\'\)\[0\]\.trim\(\) : \"추천 직무\"/g,
    "title: fbData ? (locale === 'en' ? fbData.name_ko : fbData.name_ko.split('(')[0].trim()) : (locale === 'en' ? 'Recommended Job' : '추천 직무')");

// 4. Translate Roadmap
// Since doing regex on all roadmap text is error prone, we will just write a function to replace the whole roadmap block. 
// However, the roadmap block is quite large. Alternatively, we can use a simpler translation object inside the file.
const translateRoadmapRegexs = [
    // Titles
    [/let visaGradeLabel = 'Preparation \\(장기적 준비 필요\\)'/g, "let visaGradeLabel = locale === 'en' ? 'Preparation (Long-term prep needed)' : 'Preparation (장기적 준비 필요)'"],
    [/visaGradeLabel = 'Stable \\(안정권\\)'/g, "visaGradeLabel = locale === 'en' ? 'Stable' : 'Stable (안정권)'"],
    [/visaGradeLabel = 'Potential \\(성장 잠재력\\)'/g, "visaGradeLabel = locale === 'en' ? 'Potential' : 'Potential (성장 잠재력)'"],
    [/\{ label: \"연령 \\(20대\\)\"/g, "{ label: locale === 'en' ? 'Age (20s)' : '연령 (20대)'"],
    [/\{ label: \"학력 \\(대졸\\)\"/g, "{ label: locale === 'en' ? 'Education (Bachelor)' : '학력 (대졸)'"],
    [/\{ label: \"예상 소득 \\(잠재력\\)\"/g, "{ label: locale === 'en' ? 'Expected Income (Potential)' : '예상 소득 (잠재력)'"],
    [/\{ label: \"K-Point \\(어학\\)\"/g, "{ label: locale === 'en' ? 'K-Point (Language)' : 'K-Point (어학)'"],
    [/\{ label: \"가산점 \\(KIIP\/외국어\\)\"/g, "{ label: locale === 'en' ? 'Bonus (KIIP/Foreign Lang)' : '가산점 (KIIP/외국어)'"],
    [/label: isHigh \? '핵심\/필수' : '권장\/우대'/g, "label: isHigh ? (locale === 'en' ? 'Core/Required' : '핵심/필수') : (locale === 'en' ? 'Recommended/Preferred' : '권장/우대')"],
    [/label: isActivity \? '경험\/대외활동' : '실무\/포트폴리오'/g, "label: isActivity ? (locale === 'en' ? 'Experience/Extracurricular' : '경험/대외활동') : (locale === 'en' ? 'Practical/Portfolio' : '실무/포트폴리오')"],
    [/const koTitle = personaInfo\.nickname;/g, "const koTitle = personaInfo.nickname;"], // Already translated dict
    [/\"Phase 1. 아이디어 발굴 \\(1~2학년\\)\"/g, "locale === 'en' ? 'Phase 1. Idea Discovery (Year 1~2)' : 'Phase 1. 아이디어 발굴 (1~2학년)'"],
    [/\"Phase 2. 시드 및 지적재산권 \\(3학년\\)\"/g, "locale === 'en' ? 'Phase 2. Seed & IP (Year 3)' : 'Phase 2. 시드 및 지적재산권 (3학년)'"],
    [/\"Phase 3. 정부 지원금 확보 \\(4학년\\)\"/g, "locale === 'en' ? 'Phase 3. Gov Funding (Year 4)' : 'Phase 3. 정부 지원금 확보 (4학년)'"],
    [/\"Phase 4. 법인 설립 \\(D-8-4 준비\\)\"/g, "locale === 'en' ? 'Phase 4. Corporate Setup (D-8-4 Prep)' : 'Phase 4. 법인 설립 (D-8-4 준비)'"],
    [/\"Phase 5. 매출 발생 & 고용 \\(D-8-4 취득\\)\"/g, "locale === 'en' ? 'Phase 5. Revenue & Hiring (D-8-4)' : 'Phase 5. 매출 발생 & 고용 (D-8-4 취득)'"],
    [/\"Phase 6. 벤처 인증 & 영주권 \\(F-5-11\\)\"/g, "locale === 'en' ? 'Phase 6. Venture Cert. & PR (F-5-11)' : 'Phase 6. 벤처 인증 & 영주권 (F-5-11)'"],
    [/\"Phase 1. 기술 자격 및 로컬라이징 \\(1~2학년\\)\"/g, "locale === 'en' ? 'Phase 1. Tech Cert & Localizing (Year 1~2)' : 'Phase 1. 기술 자격 및 로컬라이징 (1~2학년)'"],
    [/\"Phase 2. 현장 맞춤형 자격증 \\(3학년\\)\"/g, "locale === 'en' ? 'Phase 2. Field-Custom Cert (Year 3)' : 'Phase 2. 현장 맞춤형 자격증 (3학년)'"],
    [/\"Phase 3. 산학 연계 실습 \\(4학년\\)\"/g, "locale === 'en' ? 'Phase 3. Industry-Academy Practice (Year 4)' : 'Phase 3. 산학 연계 실습 (4학년)'"],
    [/\"Phase 4. K-Point E-74 전환 \\(구직\\)\"/g, "locale === 'en' ? 'Phase 4. K-Point E-74 (Job Search)' : 'Phase 4. K-Point E-74 전환 (구직)'"],
    [/\"Phase 5. 비자 직행 \\(E-7 취득\\)\"/g, "locale === 'en' ? 'Phase 5. Direct Visa (E-7)' : 'Phase 5. 비자 직행 (E-7 취득)'"],
    [/\"Phase 6. 현장 마이스터 \\(F-2-9\\)\"/g, "locale === 'en' ? 'Phase 6. Field Meister (F-2-9)' : 'Phase 6. 현장 마이스터 (F-2-9)'"],
    [/\"Phase 1. 기초 역량 및 탐색 \\(1~2학년 정규학기\\)\"/g, "locale === 'en' ? 'Phase 1. Basic Skills & Explore (Year 1~2 Reg)' : 'Phase 1. 기초 역량 및 탐색 (1~2학년 정규학기)'"],
    [/\"Phase 2. 어학 및 자격 몰입 \\(1~2학년 방학\\)\"/g, "locale === 'en' ? 'Phase 2. Language & Cert Focus (Year 1~2 Vac)' : 'Phase 2. 어학 및 자격 몰입 (1~2학년 방학)'"],
    [/\"Phase 3. 핵심 스펙 구축 \\(3~4학년 정규학기\\)\"/g, "locale === 'en' ? 'Phase 3. Core Specs Build (Year 3~4 Reg)' : 'Phase 3. 핵심 스펙 구축 (3~4학년 정규학기)'"],
    [/\"Phase 4. 실전 경험 및 인턴십 \\(3~4학년 방학\\)\"/g, "locale === 'en' ? 'Phase 4. Practice & Internship (Year 3~4 Vac)' : 'Phase 4. 실전 경험 및 인턴십 (3~4학년 방학)'"],
    [/\"Phase 5. D-10 구직 및 E-7 직행 \\(졸업전후\\)\"/g, "locale === 'en' ? 'Phase 5. D-10 Search & E-7 (Graduation)' : 'Phase 5. D-10 구직 및 E-7 직행 (졸업전후)'"],
    [/\"Phase 6. K-STAR 우수대학 업그레이드 \\(F-2-7S\\)\"/g, "locale === 'en' ? 'Phase 6. K-STAR Upgrade (F-2-7S)' : 'Phase 6. K-STAR 우수대학 업그레이드 (F-2-7S)'"],
    [/\"Phase 6. 정주 비자\\(F-2-7\\) 업그레이드 \\(석박사\\)\"/g, "locale === 'en' ? 'Phase 6. Residency Visa (F-2-7) Upgrade (Master/PhD)' : 'Phase 6. 정주 비자(F-2-7) 업그레이드 (석박사)'"],
    [/\"Phase 0. 긴급 어학 점수 획득 \\[MUST\\]\"/g, "locale === 'en' ? 'Phase 0. Urgent Language Score [MUST]' : 'Phase 0. 긴급 어학 점수 획득 [MUST]'"],
    [/growthHeading = \"한국어 역량 강화 필요 \\(Premium Strategy\\)\";/g, "growthHeading = locale === 'en' ? 'Korean Proficiency Enhancement (Premium Strategy)' : '한국어 역량 강화 필요 (Premium Strategy)';"],
    [/growthHeading = \"초봉 협상력 및 직무 전문성 확보\";/g, "growthHeading = locale === 'en' ? 'Starting Salary Negotiation & Job Expertise' : '초봉 협상력 및 직무 전문성 확보';"],
    [/growthHeading = \"F-2-7 점수 관리 플랜 \\(Long-term Strategy\\)\";/g, "growthHeading = locale === 'en' ? 'F-2-7 Point Management Plan (Long-term Strategy)' : 'F-2-7 점수 관리 플랜 (Long-term Strategy)';"],
    [/target_visa: \"E-7-1 전문인력\"/g, "target_visa: locale === 'en' ? 'E-7-1 Professional' : 'E-7-1 전문인력'"]
];

for (const [re, rep] of translateRoadmapRegexs) {
    code = code.replace(re, rep);
}

fs.writeFileSync('src/utils/kvtiLogic.js', code);
console.log('kvtiLogic.js updated successfully!');
