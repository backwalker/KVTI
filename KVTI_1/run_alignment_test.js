import fs from 'fs';
import { calculateKvtiResult } from './src/utils/kvtiLogic.js';
import questionsFile from './src/data/kvti_questions.json' with { type: "json" };

const questions = [
    ...(questionsFile.part1_riasec || []),
    ...(questionsFile.part2_competency || []),
    ...(questionsFile.part3_job_pref || []),
    ...(questionsFile.part4_industry_pref || []),
    ...(questionsFile.part5_org_culture || []),
    ...(questionsFile.part6_residency || [])
];

// ==========================================
// 1. Define Targeted Persona Profiles
// We want to test if the engine correctly identifies
// these specific combinations based on weighted answers.
// ==========================================
const targetPersonas = [
    { targetCode: "IAF", description: "IT 개발자 (분석적, IT, 수평적)" },
    { targetCode: "BCH", description: "대기업 마케터 (창의적, 비즈니스, 수직적)" },
    { targetCode: "MPF", description: "벤처 엔지니어 (실용적, 제조, 수평적)" },
    { targetCode: "DEF", description: "미디어 디렉터 (리더형, 디자인, 수평적)" },
];

// Helper to generate answers matching a specific target code
function generateAnswersForTarget(targetCode) {
    const answers = {};
    const targetIndLetter = targetCode.charAt(0); // I, B, M, D (Industry)
    const targetStyleLetter = targetCode.charAt(1); // A, C, P, E (Style)
    const targetCultureLetter = targetCode.charAt(2); // H, F (Culture)

    // Map Style to RIASEC
    let targetRiasecs = [];
    if (targetStyleLetter === 'A') targetRiasecs = ['I', 'C'];
    else if (targetStyleLetter === 'C') targetRiasecs = ['A'];
    else if (targetStyleLetter === 'P') targetRiasecs = ['R'];
    else if (targetStyleLetter === 'E') targetRiasecs = ['E', 'S'];

    questions.forEach(q => {
        const id = q.identifier || q.id || '';
        let trait = q.Target_Trait || q.type || '';

        let score = 3;

        // 1. RIASEC (Style)
        // Only trigger this logic if it's a part 1 question (type matches RIASEC)
        if (['R', 'I', 'A', 'S', 'E', 'C'].includes(trait)) {
            if (targetRiasecs.includes(trait)) {
                score = 5;
            } else {
                score = 1;
            }
        }

        // 2. Industry Preference (IND_I, IND_B, IND_T, IND_D, IND_M)
        // Use ID for matching since Industry JSON doesn't specify Target_Trait
        if (id.startsWith("IND_")) {
            const letter = id.replace("IND_", "").charAt(0);
            const isMatch =
                (targetIndLetter === 'I' && letter === 'I') ||
                (targetIndLetter === 'B' && (letter === 'B' || letter === 'T')) ||
                (targetIndLetter === 'M' && letter === 'M') ||
                (targetIndLetter === 'D' && letter === 'C'); // IND_C maps to DES in data

            score = isMatch ? 5 : 1;
        }

        // 3. Culture
        // We know part 5 IDs or specific culture IDs
        if (trait === 'Culture' || q.part === 5 || id.startsWith('PER_') || id.startsWith('WLB_') || id.startsWith('LIF_VIS')) {
            // If H (hierarchy/stability) -> boost
            score = (targetCultureLetter === 'H') ? 5 : 1;
        }

        // Add very slight 1-point noise occasionally to prove robustness without breaking limits
        const noise = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        answers[id] = Math.max(1, Math.min(5, score + noise));
    });

    return answers;
}

// ==========================================
// 2. Run the Alignment Test
// ==========================================
// ==========================================
// 2. Run the Alignment Test
// ==========================================
let outputLog = "";
const log = (msg) => { outputLog += msg + "\n"; console.log(msg); };

log("==================================================");
log("🎯 KVTI ENGINE PERSONA ALIGNMENT TEST");
log("==================================================");

let successCount = 0;

targetPersonas.forEach(persona => {
    // ... logic remains same ...
    const mockAnswers = generateAnswersForTarget(persona.targetCode);

    // Set up base profile (Neutral, mapping directly to target industry)
    const mockProfile = {
        name: `${persona.targetCode}_Bot`,
        age: 25,
        nationality: 'Global',
        topik: '4',
        major: persona.targetCode.charAt(0) === 'I' ? '컴퓨터공학' :
            persona.targetCode.charAt(0) === 'B' ? '경영학' :
                persona.targetCode.charAt(0) === 'M' ? '기계공학' : '시각디자인'
    };

    const result = calculateKvtiResult(mockAnswers, 'senior', mockProfile);
    const engineCode = result.dashboard.kvti_code.substring(0, 3);

    const isMatch = engineCode === persona.targetCode;
    if (isMatch) successCount++;

    log(`\n🤖 [Bot: ${persona.description}]`);
    log(`- 🎯 Target Persona : ${persona.targetCode}`);
    log(`- ⚙️ Engine Output  : ${engineCode} ${isMatch ? '✅ (MATCH)' : '❌ (MISMATCH)'}`);

    // Debugging info
    log(`  -> Industry Scores: ${JSON.stringify(result.dashboard.scoreBreakdown?.industry || {})}`);
    log(`  -> Culture Risk: ${result.diagnosis.culture_fit?.risk_factors?.length > 0 ? 'F' : 'H'}`);

    const topJobs = result.dashboard.recommended_jobs.map(j => j.code).slice(0, 3);
    log(`- 💼 Recommended E-7: ${topJobs.join(', ')}`);
});

log("\n==================================================");
log(`🏆 ALIGNMENT SCORE: ${successCount} / ${targetPersonas.length} Match`);
log("==================================================");

fs.writeFileSync('alignment_results.txt', outputLog);
