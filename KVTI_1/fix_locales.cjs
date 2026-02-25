const fs = require('fs');

// 1. Fix kvtiLogic.js locale check
const logicFile = 'src/utils/kvtiLogic.js';
let logicContent = fs.readFileSync(logicFile, 'utf8');
logicContent = logicContent.replace(/locale === 'ko'/g, "(locale && locale.startsWith('ko'))");
fs.writeFileSync(logicFile, logicContent);
console.log('Fixed kvtiLogic.js locale checks');

// 2. Fix Korean Translations in ko/common.json
const koFile = 'src/locales/ko/common.json';
let koData = JSON.parse(fs.readFileSync(koFile, 'utf8'));

koData.result.target_spec_title = '목표 스펙 (Target Specification)';
koData.result.basic_req = '기본 요건 (Basic Requirements)';
koData.result.certifications = '자격증 및 시험 (Certifications & Tests)';
koData.result.tool_stack = '핵심 툴 스택 (Core Tool Stack)';
koData.result.portfolio = '포트폴리오 및 대외활동 (Portfolio & Activity)';
koData.result.phase_prefix = 'Phase';
koData.result.route_prefix = 'Route';
koData.result.key_quests = '핵심 퀘스트 (KEY QUESTS)';
koData.result.must_tag = 'MUST';
koData.result.premium_feature = 'PREMIUM ONLY';
koData.result.d10_predict_title = 'D-10 예측 점수';
koData.result.points = '점';

fs.writeFileSync(koFile, JSON.stringify(koData, null, 2));
console.log('Fixed ko/common.json result block');
