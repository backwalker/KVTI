import kvtiQuestions from '../data/kvti_questions.json' with { type: 'json' };
import { E7_DB as E7_DB_KO, KVTI_32_PERSONAS as KVTI_32_PERSONAS_KO, detectIndustry } from '../data/persona_data.js';
import { E7_DB as E7_DB_EN, KVTI_32_PERSONAS as KVTI_32_PERSONAS_EN } from '../data/persona_data_en.js';
import { KVTI_DICTIONARY as KVTI_DICTIONARY_KO } from '../data/kvti_dictionary.js';
import { KVTI_DICTIONARY as KVTI_DICTIONARY_EN } from '../data/kvti_dictionary_en.js';
import { E7_REQUIREMENTS as E7_REQUIREMENTS_KO } from '../data/e7_requirements.js';
import { E7_REQUIREMENTS as E7_REQUIREMENTS_EN } from '../data/e7_requirements_en.js';

// --- Helper Functions ---
// (Unused calculatePartScore removed)

const getRiasecScore = (answers) => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const questions = kvtiQuestions.part1_riasec;

    questions.forEach(q => {
        const val = parseInt(answers[q.id], 10) || 0;
        let typeCode = '';
        const t = q.type.toUpperCase();
        if (t.startsWith('R')) typeCode = 'R';
        else if (t.startsWith('I')) typeCode = 'I';
        else if (t.startsWith('A')) typeCode = 'A';
        else if (t.startsWith('S')) typeCode = 'S';
        else if (t.startsWith('E')) typeCode = 'E';
        else if (t.startsWith('C')) typeCode = 'C';

        if (typeCode) scores[typeCode] += val;
    });

    return scores;
};

const getTopTraits = (scores) => {
    return Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([code]) => code)
        .join('');
};

// --- Target Industry Mapping ---
const MAJOR_TO_INDUSTRY_MAP = {
    // IT (I)
    "소프트웨어": "IT", "게임공학": "IT", "데이터사이언스": "IT", "수학통계": "IT",

    // Business (B)
    "국내문학": "BIZ", "외국어학": "BIZ", "문헌정보학": "BIZ", "교육학": "BIZ", "국제학부": "BIZ", "심리학": "BIZ", "사회과학": "BIZ", "신문방송": "BIZ", "경영경제": "BIZ", "법학행정": "BIZ", "호텔관광": "BIZ", "항공서비스": "BIZ", "유아보육": "BIZ", "기타 인문사회": "BIZ", "동물반려동물": "BIZ", "조리가정": "BIZ", "체육학": "BIZ", "경호무도학": "BIZ", "보건행정학": "BIZ", "간호학": "BIZ", "물리치료학": "BIZ", "재활작업치료": "BIZ", "치위생학": "BIZ", "의약학": "BIZ", "기타 예체능보건": "BIZ",

    // Design/Arts (D)
    "디자인": "DES", "사진만화애니": "DES", "순수예술": "DES", "실용음악": "DES", "무용연극영화": "DES", "방송엔터테인먼트": "DES", "미용뷰티": "DES", "헤어메이크업": "DES",

    // Manufacturing/Hardware/Science (M)
    "전기전자": "MFG", "기계공학": "MFG", "건축토목": "MFG", "산업공학": "MFG", "화학공학": "MFG", "신소재공학": "MFG", "해양조선공학": "MFG", "스마트팜": "MFG", "기타 공학": "MFG", "물리화학": "MFG", "생명과학": "MFG", "지구과학": "MFG", "농림수산": "MFG", "향장화장품": "MFG", "기타 자연과학": "MFG"
};

// --- Main Logic ---

export const calculateKvtiResult = (answers, diagnosticGrade = 'senior', phase0Data = null, locale = 'ko') => {
    const E7_DB = locale === 'en' ? E7_DB_EN : E7_DB_KO;
    const KVTI_32_PERSONAS = locale === 'en' ? KVTI_32_PERSONAS_EN : KVTI_32_PERSONAS_KO;
    const KVTI_DICTIONARY = locale === 'en' ? KVTI_DICTIONARY_EN : KVTI_DICTIONARY_KO;
    const E7_REQUIREMENTS = locale === 'en' ? E7_REQUIREMENTS_EN : E7_REQUIREMENTS_KO;

    // -- Phase 0: User Base Profile --
    const baseProfile = phase0Data || {
        name: 'Guest',
        age: 25,
        nationality: 'Unknown',
        region: '서울',
        university: 'Unknown',
        major: 'Unknown',
        grade: '3학년',
        topik: '0',
        kiip: '0',
        secondaryLanguages: []
    };

    // -- Phase 4: Establish 9 Global Base Variables --
    // const uName = baseProfile.name || 'Guest';
    const uAge = parseInt(baseProfile.age) || 25;
    // const uNationality = baseProfile.nationality || 'Unknown';
    // const uRegion = baseProfile.region || '서울';
    const uSchool = baseProfile.university || 'Unknown';
    const uMajor = baseProfile.major || 'Unknown';
    const uGrade = baseProfile.grade || '3학년';
    const uTopik = parseInt(baseProfile.topik) || 0;
    const uKiip = parseInt(baseProfile.kiip) || 0;
    const uSecLangs = baseProfile.secondaryLanguages || [];

    // -- Phase 2: Dynamic API & Split Module Readiness --
    // 1. Module Grade Flag (1-2nd year vs 3-4th year)
    const isJunior = diagnosticGrade === 'junior';

    // 2. Dynamic Wage Threshold (Simulated API Response for GNI 80%)
    // Later, this can be fetched from an external config or state provider
    const CURRENT_GNI_80 = 3400; // Unit: 10,000 KRW (34M KRW)

    // 1. RIASEC Analysis
    const riasecScores = getRiasecScore(answers);
    const topCode = getTopTraits(riasecScores); // e.g., "ES"
    // (Removed primaryType as it is unused)

    // Radar Data - Normalize scores accurately by exact question count per trait
    // Each question is worth 5 points max. Let's count them dynamically to perfectly scale [0, 100].
    const riasecCounts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    kvtiQuestions.part1_riasec.forEach(q => {
        const t = q.type.charAt(0).toUpperCase();
        if (riasecCounts[t] !== undefined) riasecCounts[t]++;
    });

    const normalize = (val, trait) => {
        const maxExpectedScore = riasecCounts[trait] * 5;
        return Math.min(Math.round((val / maxExpectedScore) * 100), 100);
    };

    const radarData = [
        { subject: 'Realistic', A: normalize(riasecScores.R, 'R'), fullMark: 100 },
        { subject: 'Investigative', A: normalize(riasecScores.I, 'I'), fullMark: 100 },
        { subject: 'Artistic', A: normalize(riasecScores.A, 'A'), fullMark: 100 },
        { subject: 'Social', A: normalize(riasecScores.S, 'S'), fullMark: 100 },
        { subject: 'Enterprising', A: normalize(riasecScores.E, 'E'), fullMark: 100 },
        { subject: 'Conventional', A: normalize(riasecScores.C, 'C'), fullMark: 100 },
    ];

    // 2. Job & Industry Fit (Part 3 & 4)
    const getTopPreference = (partKey) => {
        const questions = kvtiQuestions[partKey];
        if (!questions) return { id: '', text: '-' };
        let maxScore = -1;
        let bestItem = { id: '', text: '-' };
        questions.forEach(q => {
            const val = parseInt(answers[q.id], 10) || 0;
            if (val > maxScore) {
                maxScore = val;
                bestItem = {
                    id: q.id,
                    text: q.question.replace(/^\[.*?\]\s*/, '')
                };
            }
        });
        return bestItem.text !== '-' ? bestItem : { id: '', text: 'General Business' }; // Default
    };

    const targetJobPref = getTopPreference('part3_job_pref');
    const targetIndustryPref = getTopPreference('part4_industry_pref');

    // ** Industry Detection Logic (for 4 Categories) **
    const industryType = detectIndustry(targetIndustryPref.id, targetJobPref.id, targetIndustryPref.text, targetJobPref.text); // IT, BIZ, DES, MFG

    console.log("=== DEV REPORT ===");
    console.log("Answers length:", Object.keys(answers).length);
    console.log("Input Major:", uMajor, "=> mapped to:", MAJOR_TO_INDUSTRY_MAP[uMajor]);
    console.log("TopCode (RIASEC):", topCode);
    console.log("IndustryPrefs:", targetIndustryPref.id, targetJobPref.id);
    console.log("Detected Industry:", industryType);
    console.log("==================");

    // 3. Competency Analysis (Part 2)
    let scoreKorean = 0, countKorean = 0;
    let scoreOA = 0, countOA = 0;
    let scoreMajor = 0, countMajor = 0;
    let scoreWage = 0;

    if (kvtiQuestions.part2_competency) {
        kvtiQuestions.part2_competency.forEach(q => {
            const val = parseInt(answers[q.id], 10) || 0;
            if (q.id.startsWith('korean') || q.id.startsWith('CMP_K')) { scoreKorean += val; countKorean++; }
            if (q.id.startsWith('gpa') || q.id.startsWith('CMP_G')) { scoreOA += val; countOA++; }
            if (q.id.startsWith('major') || q.id.startsWith('CMP_T')) { scoreMajor += val; countMajor++; }
            if (q.id === 'CMP_WAGE_01') scoreWage = val;
        });
    }

    const finalKorean = countKorean ? (scoreKorean / countKorean).toFixed(1) : 0;
    const finalOA = countOA ? (scoreOA / countOA).toFixed(1) : 0;
    const finalMajor = countMajor ? (scoreMajor / countMajor).toFixed(1) : 0;

    // 4. Culture Fit & Risk Analysis (Part 5)
    let scoreCulture = 0, countCulture = 0;
    let scoreStartupIntent = 0;
    let scoreFreelanceIntent = 0;

    if (kvtiQuestions.part5_org_culture) {
        kvtiQuestions.part5_org_culture.forEach(q => {
            const val = parseInt(answers[q.id], 10) || 0;
            if (q.id === 'PER_E_01') scoreStartupIntent = val;
            else if (q.id === 'PER_I_01') scoreFreelanceIntent = val;
            else {
                scoreCulture += val;
                countCulture++;
            }
        });
    }
    const finalCulture = countCulture ? (scoreCulture / countCulture).toFixed(1) : 0;

    // 4.5 Residency Intent (Part 6)
    let scoreResidency = 0, countResidency = 0;
    let intentMaster = 3; // Default

    if (kvtiQuestions.part6_residency) {
        kvtiQuestions.part6_residency.forEach(q => {
            const val = parseInt(answers[q.id], 10) || 0;
            if (q.id === 'LIF_VIS_11') {
                intentMaster = val;
            } else {
                scoreResidency += val;
                countResidency++;
            }
        });
    }
    const finalResidency = countResidency ? (scoreResidency / countResidency).toFixed(1) : 0;

    // 5. Persona Determination (Using KVTI_DICTIONARY 32-Matrix)

    // 1. Calculate Axis 1: Industry Fit (IT, BIZ, DES, MFG) early to determine char_1
    let indScores = { IT: 0, BIZ: 0, DES: 0, MFG: 0 };
    if (kvtiQuestions.part4_industry_pref) {
        kvtiQuestions.part4_industry_pref.forEach(q => {
            const val = parseInt(answers[q.id], 10) || 0;
            if (q.id.startsWith("IND_I")) indScores.IT += val;
            if (q.id.startsWith("IND_B") || q.id.startsWith("IND_T")) indScores.BIZ += val;
            if (q.id.startsWith("IND_C")) indScores.DES += val;
            if (q.id.startsWith("IND_M")) indScores.MFG += val;
        });
    }

    // Determine char_1 from mathematical highest score
    const sortedIndustries = Object.entries(indScores).sort((a, b) => b[1] - a[1]);
    const topIndustryCode = sortedIndustries[0][0]; // 'IT', 'BIZ', 'DES', or 'MFG'

    // Generate 3-letter KVTI Code
    const char_1 = topIndustryCode.charAt(0); // 'I', 'B', 'D', 'M'

    // Override the legacy industryType text for strategy generation to match char_1
    const industryTypeMapped = char_1 === 'I' ? 'IT' : char_1 === 'D' ? 'DES' : char_1 === 'M' ? 'MFG' : 'BIZ';

    // 2. Calculate Axis 2: Work Style (RIASEC derived: A, C, P, E) early to determine char_2
    const styleScores = {
        A: riasecScores.I + riasecScores.C,
        C: riasecScores.A,
        P: riasecScores.R,
        E: riasecScores.E + riasecScores.S
    };

    // Pick the character with the absolute highest sum. 
    // This perfectly aligns the 3-letter KVTI code with the highest gauge bar in the UI.
    const sortedStyles = Object.entries(styleScores).sort((a, b) => b[1] - a[1]);
    const char_2 = sortedStyles[0][0]; // 'A', 'C', 'P', or 'E'

    const parsedCulture = parseFloat(finalCulture);
    // 3.0 represents a perfectly neutral response. We default to 'H' (Hierarchy/Stable)
    // to align with the dominant Korean corporate culture if no strong preference is shown,
    // but the UI accurately reflects this neutrality in the 50:50 progress bar.
    const char_3 = parsedCulture >= 3.0 ? 'H' : 'F';

    const char_4 = parseFloat(finalResidency) >= 3.0 ? 'K' : 'G';
    const coreCode = `${char_1}${char_2}${char_3}`; // Base 3 letters for Persona lookup
    const typeCode = `${char_1}${char_2}${char_3}${char_4}`; // Full 4 letters

    const TARGET_DICT = locale === 'en' ? KVTI_DICTIONARY_EN : KVTI_DICTIONARY_KO;
    const personaInfo = TARGET_DICT[coreCode] || TARGET_DICT['BEH'];
    const koTitle = personaInfo.nickname; // Dynamic based on dict
    const personaQuote = personaInfo.description;

    // --- Score Breakdown Calculation (MBTI-style percentages) ---
    // 1. Axis 1 Breakdown Percentages
    const totalInd = Object.values(indScores).reduce((a, b) => a + b, 0) || 1;
    const indBreakdown = {
        IT: Math.round((indScores.IT / totalInd) * 100),
        BIZ: Math.round((indScores.BIZ / totalInd) * 100),
        DES: Math.round((indScores.DES / totalInd) * 100),
        MFG: Math.round((indScores.MFG / totalInd) * 100),
    };

    // 2. Axis 2 Breakdown Percentages
    const totalStyle = Object.values(styleScores).reduce((a, b) => a + b, 0) || 1;
    const styleBreakdown = {
        A: Math.round((styleScores.A / totalStyle) * 100),
        C: Math.round((styleScores.C / totalStyle) * 100),
        P: Math.round((styleScores.P / totalStyle) * 100),
        E: Math.round((styleScores.E / totalStyle) * 100),
    };

    // 3. Axis 3: Culture Fit (H vs F)
    // Map finalCulture (1-5 scale) to percentage. 5 = 100% Hierarchy, 1 = 100% Flat
    // Formula: ((finalCulture - 1) / 4) * 100
    const hierarchyPct = Math.round(((parseFloat(finalCulture) - 1) / 4) * 100) || 50;
    const cultureBreakdown = {
        H: hierarchyPct,
        F: 100 - hierarchyPct
    };

    // 4. Axis 4: Residency Intent (K vs G)
    // Map finalResidency (1-5 scale) to percentage. 5 = 100% Korea (K), 1 = 100% Global (G)
    const residencyPct = Math.round(((parseFloat(finalResidency) - 1) / 4) * 100) || 50;
    const residencyBreakdown = {
        K: residencyPct,
        G: 100 - residencyPct
    };

    const scoreBreakdown = {
        industry: indBreakdown,
        style: styleBreakdown,
        culture: cultureBreakdown,
        residency: residencyBreakdown
    };
    // -------------------------------------------------------------

    // Tag Generation (Korean & English)
    const tags = [locale === 'en' ? `#${industryType}_Talent` : `#${industryType}_인재`, `#${typeCode}`];
    if (finalKorean >= 4) tags.push(locale === 'en' ? "#Korean_Master" : "#한국어_마스터");
    else if (finalKorean < 3) tags.push(locale === 'en' ? "#Focus_Korean" : "#한국어_집중필요");

    // Phase 2 GNI Decoupling: Calculate expected salary based on wage expectation answers
    // Map score 1-5 to estimated starting salary (e.g., 2800, 3200, 3600, 4000, 4400)
    const predictedIncome = 2400 + (scoreWage * 400);
    const passesGniThreshold = predictedIncome >= CURRENT_GNI_80;

    if (passesGniThreshold) tags.push(locale === 'en' ? "#HighIncome_Potential" : "#고소득_잠재력");
    if (finalOA >= 4.0) tags.push(locale === 'en' ? "#Ready_for_Work" : "#실무_준비완료");

    // ** 1. Major Deficit Compensation Math **
    // IF major is 0 but practical proof (OA) is high, compensate with 1.2x weight, capped at 5.0
    let adjustedMajorScore = parseFloat(finalMajor);
    const proofScore = parseFloat(finalOA);
    let isMajorCompensated = false;
    if (adjustedMajorScore < 3.0 && proofScore >= 4.0) {
        adjustedMajorScore = Math.min(proofScore * 1.2, 5.0);
        isMajorCompensated = true;
    }

    // --- 3. Multi-Dimensional Job Matching (MDJM) ---

    // Deep Research Patch 3: Profile Elevation (Career Vitality Index)
    // Extract raw 6D magnitude prior to normalization to measure the absolute response intensity.
    const rawRiasecScores = [riasecScores.R, riasecScores.I, riasecScores.A, riasecScores.S, riasecScores.E, riasecScores.C];
    // Max per trait is 45. Max Euclidean length = sqrt(6 * 45^2) = approx 110.2
    const elevationMagnitude = Math.sqrt(rawRiasecScores.reduce((sum, val) => sum + Math.pow(val, 2), 0));
    // Normalize to 1-100 scale for UI
    const careerVitalityIndex = Math.min(Math.round((elevationMagnitude / 110.2) * 100), 100);

    // Deep Research Patch 1: Prediger 2D Projection (Cosine Function Modeling)
    // Map 6D RIASEC to 2D Cartesian plane to correct orthogonality errors (hexagonal relationships).
    const projectToPrediger = (v) => {
        // X-axis: Things vs People. R(1), I(0.5), A(-0.5), S(-1), E(-0.5), C(0.5)
        const x = (v.R * 1) + (v.I * 0.5) + (v.A * -0.5) + (v.S * -1) + (v.E * -0.5) + (v.C * 0.5);
        // Y-axis: Data vs Ideas. R(0), I(0.866), A(0.866), S(0), E(-0.866), C(-0.866)
        const y = (v.R * 0) + (v.I * 0.866) + (v.A * 0.866) + (v.S * 0) + (v.E * -0.866) + (v.C * -0.866);
        return { x, y };
    };

    // Prepare User Vectors (Independent Dual-Normalization prep)
    const userRiasecNorm = {
        R: riasecScores.R / 45, I: riasecScores.I / 45, A: riasecScores.A / 45,
        S: riasecScores.S / 45, E: riasecScores.E / 45, C: riasecScores.C / 45
    };
    const userPrediger2D = projectToPrediger(userRiasecNorm);
    const userPredigerMag = Math.sqrt(Math.pow(userPrediger2D.x, 2) + Math.pow(userPrediger2D.y, 2)) || 1;

    const userInd4D = {
        IT: (indScores.IT || 0) / 30, BIZ: (indScores.BIZ || 0) / 30,
        DES: (indScores.DES || 0) / 30, MFG: (indScores.MFG || 0) / 30,
    };
    const userIndMag = Math.sqrt(Math.pow(userInd4D.IT, 2) + Math.pow(userInd4D.BIZ, 2) + Math.pow(userInd4D.DES, 2) + Math.pow(userInd4D.MFG, 2)) || 1;

    // Deep Research Patch 2: Hyperparameters for Dual-Normalization Ensemble
    const ALPHA_RIASEC = 0.5;
    const BETA_INDUSTRY = 0.5;

    let mdjmResults = [];

    // Calculate Dual-Normalized Cosine Similarity with all standard E-7 jobs
    Object.keys(E7_DB).forEach(jobCode => {
        const job = E7_DB[jobCode];
        if (job.ideal_traits && !isNaN(parseInt(jobCode))) { // Only standard E-7 jobs
            const ideal = job.ideal_traits;

            // 1. RIASEC 2D (Prediger) Similarity
            const jobPrediger2D = projectToPrediger(ideal);
            const jobPredigerMag = Math.sqrt(Math.pow(jobPrediger2D.x, 2) + Math.pow(jobPrediger2D.y, 2)) || 1;

            const dotPrediger = (userPrediger2D.x * jobPrediger2D.x) + (userPrediger2D.y * jobPrediger2D.y);
            const simRiasec = dotPrediger / (userPredigerMag * jobPredigerMag);
            // Convert domain [-1, 1] to [0, 1] for easier ensemble
            const simRiasecNorm = (simRiasec + 1) / 2;

            // 2. Industry 4D Similarity
            const jobIndMag = Math.sqrt(Math.pow(ideal.IT, 2) + Math.pow(ideal.BIZ, 2) + Math.pow(ideal.DES, 2) + Math.pow(ideal.MFG, 2)) || 1;
            const dotInd = (userInd4D.IT * ideal.IT) + (userInd4D.BIZ * ideal.BIZ) + (userInd4D.DES * ideal.DES) + (userInd4D.MFG * ideal.MFG);
            const simInd = dotInd / (userIndMag * jobIndMag);
            // Industry is already positive, so domain is [0, 1]

            // 3. Dual-Normalization Ensemble Combination
            const finalEnsembleScore = (ALPHA_RIASEC * simRiasecNorm) + (BETA_INDUSTRY * simInd);

            // Anchoring Bonus from Part 3 (Direct Preference)
            let tieBreakerBonus = 0;
            // A simple keyword match against the job's Korean name (very rudimentary, but effective anchoring)
            const prefKeyword = targetJobPref.text ? targetJobPref.text.split(' ')[0] : '';
            if (prefKeyword && job.name_ko.includes(prefKeyword)) {
                tieBreakerBonus += 0.20; // Massive 20% bonus if direct text match
            }

            mdjmResults.push({
                code: jobCode,
                score: finalEnsembleScore + tieBreakerBonus,
                similarity: finalEnsembleScore,
                simRiasec: simRiasecNorm,
                simInd: simInd
            });
        }
    });

    // Sort by descending score
    mdjmResults.sort((a, b) => b.score - a.score);

    // Extract Top 3 Job Codes
    let extractedJobCodes = mdjmResults.slice(0, 3).map(res => res.code);

    if (extractedJobCodes.length === 0) extractedJobCodes = ["2742", "2733", "2731"]; // Safe Fallback

    // Specific Job Code Matching
    const targetJobCode = extractedJobCodes[0];
    const jobData = E7_DB[targetJobCode] || E7_DB["2742"]; // Default
    const consultingJobData = `${targetJobCode} ${jobData.name_ko.split('(')[0].trim()}`;

    // MDJM logging
    console.log("MDJM Vector User Prediger:", userPrediger2D);
    console.log("MDJM Top 3:", mdjmResults.slice(0, 3));

    // ** 2. 100-Point Quantitative Cut-off for E-7 Jobs **
    // Formula: (Interest Match * 40%) + (Industry Weight * 30%) + (Proof * 30%)
    // (Used internally for reference but not in final UI)
    // const visaReadinessPercentage = Math.min(
    //     (adjustedMajorScore / 5) * 50 + (parseFloat(finalKorean) / 5) * 30 + (proofScore / 5) * 20,
    //     100
    // );

    // Extract Top 2 Traits for Dynamic Fit Calculation (Max score per trait is 50 = 10 questions * 5 points)
    const pTrait1 = topCode[0] || 'E';
    const pTrait2 = topCode[1] || pTrait1;

    // Normalize to 100 scale
    const intensity1 = (riasecScores[pTrait1] / 50) * 100;
    const intensity2 = (riasecScores[pTrait2] / 50) * 100;
    const normCulture = (parseFloat(finalCulture) / 5) * 100;

    // Calculate core raw personality fit (100-point scale)
    const rawPersonalityFit = (intensity1 * 0.45) + (intensity2 * 0.35) + (normCulture * 0.20);

    // Phase 4: Auto-Map Major to Industry and establish Match Truth
    const userMappedIndustry = MAJOR_TO_INDUSTRY_MAP[uMajor] || "BIZ";
    const isGlobalMajorMatch = userMappedIndustry === industryType;

    // Extract user base language/portfolio scores
    const langScore = parseFloat(finalKorean) || 3.0; // 1-5 scale (test score)
    const portScore = parseFloat(finalOA) || 3.0;     // 1-5 scale (test score)
    const hasHighSecLang = uSecLangs.some(l => l.level === 'native' || l.level === 'business');
    const isVocationalCollege = uSchool === 'Unknown' || uSchool.includes('전문대학');

    let recommendedJobsArray = extractedJobCodes.map((jCode) => {
        const jData = E7_DB[jCode];

        // Phase 4 Directive: Major Match & Multiplier
        let fitScore = 0;

        if (isGlobalMajorMatch) {
            fitScore = Math.round(rawPersonalityFit * 1.0);
        } else {
            // Drop logic for Vocational College (Hard constraint)
            if (isVocationalCollege) {
                fitScore = 0; // Hard Drop
            } else {
                // Multiplier Logic for Bachelor Degrees
                if (langScore >= 4.0 || portScore >= 4.0 || hasHighSecLang) {
                    const bestComp = Math.max(langScore, portScore, hasHighSecLang ? 5.0 : 0);
                    const boostedScore = Math.min(bestComp * 1.2, 5.0);
                    fitScore = Math.round((boostedScore / 5.0) * 100 * 0.90);
                } else {
                    fitScore = Math.round(rawPersonalityFit * 0.70); // Heavy penalty
                }
            }
        }

        // Cap & Floor for UX (unless hard dropped)
        if (fitScore > 0) {
            fitScore = Math.min(Math.max(fitScore, 50), 99);
        }

        return {
            code: jCode,
            title: jData ? jData.name_ko.split('(')[0].trim() : "추천 직무",
            readiness: fitScore
        };
    }).filter(job => job.readiness > 0); // Drop ones that failed legal constraints

    // ** 3. Independent Track Normalization (Startup / Freelance) **
    // Intent score is 1-5. Traits are max 40.
    // Let's normalize everything to a 5-point scale first for math consistency.
    const normE = riasecScores.E / 8; // (up to 40) / 8 = max 5
    const normI = riasecScores.I / 8;
    const normA = riasecScores.A / 8;

    // Formula: Intent (Weight 1.5) + Traits Average (Weight 1.0)
    const rawStartupScore = (scoreStartupIntent * 1.5) + ((normE + normI) / 2);
    const normStartupScore = Math.min(Math.round((rawStartupScore / 12.5) * 100), 100); // Max possible: 5*1.5 + 5 = 12.5

    const rawFreelanceScore = (scoreFreelanceIntent * 1.5) + ((normA + parseFloat(finalKorean)) / 2); // Final Korean is already 1-5
    const normFreelanceScore = Math.min(Math.round((rawFreelanceScore / 12.5) * 100), 100);

    // Only inject IF they pass the 80% independent cutoff threshold
    if (normStartupScore >= 80 || normFreelanceScore >= 80) {
        // F-1-D is extremely strict (2x GNI, approx 8,600만원), so we default to D-8-4 Startup 
        // for all independent/freelance tracks to ensure realistic student roadmaps.
        const highestIndependentScore = Math.max(normStartupScore, normFreelanceScore);
        recommendedJobsArray.push({
            code: "D84_STARTUP",
            title: E7_DB["D84_STARTUP"]?.name_ko.split('(')[0].trim() || "기술 창업(D-8-4)",
            readiness: highestIndependentScore,
            isExtraTrack: true
        });
        tags.push("#창업_가속기");
    }

    // (Removed F-2-7S K-STAR from separate recommended tracking as it lacks hard specs for probability)

    const isMasterOrAbove = uGrade === '석박사';

    // Sort array: Extra tracks are ALWAYS pushed to the bottom.
    // Standard jobs are sorted by readiness in descending order.
    // Extra tracks are also sorted by readiness among themselves at the bottom.
    recommendedJobsArray.sort((a, b) => {
        if (a.isExtraTrack && !b.isExtraTrack) return 1;
        if (!a.isExtraTrack && b.isExtraTrack) return -1;
        return b.readiness - a.readiness;
    });

    // Pad to 3 if the persona has fewer than 3 defined jobs (and we didn't inject enough)
    const fallbackCodes = ["2742", "2733", "2731"];
    let fallbackIdx = 0;
    while (recommendedJobsArray.length < 3 && fallbackIdx < fallbackCodes.length) {
        const fbCode = fallbackCodes[fallbackIdx];
        if (!recommendedJobsArray.find(j => j.code === fbCode)) {
            const fbData = E7_DB[fbCode];
            recommendedJobsArray.push({
                code: fbCode,
                title: fbData ? fbData.name_ko.split('(')[0].trim() : "추천 직무",
                readiness: 60 - (fallbackIdx * 5)
            });
        }
        fallbackIdx++;
    }

    // 6. F-2-7 Simulation & Visa Grade Logic (Report Based)
    // F-2-7 Age Points calculation (Phase 1)
    let scoreAge = 0;
    if (uAge >= 18 && uAge <= 24) scoreAge = 23;
    else if (uAge >= 25 && uAge <= 29) scoreAge = 25;
    else if (uAge >= 30 && uAge <= 34) scoreAge = 23;
    else if (uAge >= 35 && uAge <= 39) scoreAge = 20;
    else if (uAge >= 40 && uAge <= 44) scoreAge = 12; // Adjusted to match exact specs
    else if (uAge >= 45 && uAge <= 50) scoreAge = 8;
    else scoreAge = 3; // default fallback for 51+

    const isSTEM = MAJOR_TO_INDUSTRY_MAP[uMajor] === 'IT' || MAJOR_TO_INDUSTRY_MAP[uMajor] === 'MFG';

    let scoreEdu = 15; // default Bachelor
    if (uGrade === '석박사') {
        scoreEdu = isSTEM ? 20 : 17; // Master Science/Engineering (20) vs General (17)
    } else {
        scoreEdu = isSTEM ? 17 : 15; // Bachelor Science/Engineering (17) vs General (15)
    }

    const scoreIncomePromised = scoreWage >= 3 ? 30 : 10;

    // Dynamic Korean Points (Phase 1) using TOPIK/KIIP actuals
    let scoreKPoint = 0;
    if (uTopik >= 5 || uKiip >= 5) scoreKPoint = 20;
    else if (uTopik === 4 || uKiip === 4) scoreKPoint = 15;
    else if (uTopik === 3 || uKiip === 3) scoreKPoint = 10;
    else if (uTopik === 2 || uKiip === 2) scoreKPoint = 5;

    const scoreKIIP = uKiip >= 4 ? 10 : (uKiip === 3 ? 5 : 0);

    // Extra language bonus logic (Phase 1)
    let scoreLangBonus = 0;
    if (uSecLangs.some(l => l.level === 'native' || l.level === 'business')) {
        scoreLangBonus = 5;
    }

    const totalF27 = scoreAge + scoreEdu + scoreIncomePromised + scoreKPoint + scoreKIIP + scoreLangBonus;
    const f27Gap = Math.max(80 - totalF27, 0);

    // ** Hybrid Visa Engine Simulation (Phase 2 & 4) **

    // Calculate E-7 Visa Readiness / Potential (Phase 2)
    // NOTE: This is a simulation based on self-reported psychometric data.
    // It is NOT a definitive pass/fail probability since we lack hard spec validation (GPA, TOPIK certs) at this stage.
    const W_MAJOR = 0.35;
    const W_LANG = 0.30;
    const W_MATCH = 0.15;
    const W_PROOF = 0.20;

    let m_alignment = finalMajor >= 4 ? 100 : (finalMajor * 20);
    const hasDomesticBachelor = true; // Assuming D-2 student
    const e_proof = finalOA >= 4 ? 80 : (finalOA * 20);

    // Exception: Domestic Bachelor exemption logic correctly applies experience proof to boost major alignment.
    let experience_exempt = false;
    if (hasDomesticBachelor && e_proof >= 80) {
        m_alignment = 100; // Dead code fixed: m_alignment is actually boosted and utilized in the equation below.
        experience_exempt = true;
    }

    // Language Booster
    let korean_score = Math.min(finalKorean * 15, 90);
    if (finalKorean >= 4) {
        korean_score += 20; // TOPIK 4+ Booster
    }

    // Determine Industry/Job match naturally rather than hardcoding.
    // We use finalCulture and finalResidency averages as a proxy for holistic 'match' potential.
    const i_match = Math.min(((parseFloat(finalCulture) + parseFloat(finalResidency)) / 2) * 20 + 20, 100);

    // Calculate potential score (Replacing the misleading term "Probability" conceptually)
    const visaProbability = Math.min(Math.max((W_MAJOR * m_alignment) + (W_LANG * korean_score) + (W_MATCH * i_match) + (W_PROOF * e_proof), 0), 100);
    const isVisaReady = visaProbability >= 80;

    // ** New Visa Grade Logic (A/B/C) **
    let visaGrade = 'C';
    let visaGradeLabel = 'Preparation (장기적 준비 필요)'; // Positive framing

    const isF27EffectivelyReady = totalF27 >= 80 && (isMasterOrAbove);

    // Grade A: Stable
    if (isVisaReady || isF27EffectivelyReady) {
        visaGrade = 'A';
        visaGradeLabel = 'Stable (안정권)';
    }
    // Grade B: Potential
    else if (visaProbability >= 60 || totalF27 >= 60) {
        visaGrade = 'B';
        visaGradeLabel = 'Potential (성장 잠재력)';
    }

    const f27Breakdown = [
        { label: locale === 'en' ? "Age (20s)" : "연령 (20대)", score: scoreAge },
        { label: locale === 'en' ? "Education (Bachelor+)" : "학력 (대졸)", score: scoreEdu },
        { label: locale === 'en' ? "Est. Income (Potential)" : "예상 소득 (잠재력)", score: scoreIncomePromised },
        { label: locale === 'en' ? "K-Point (Language)" : "K-Point (어학)", score: scoreKPoint },
        { label: locale === 'en' ? "Bonus (KIIP/Language)" : "가산점 (KIIP/외국어)", score: scoreKIIP + scoreLangBonus }
    ];

    // ** Survival Score Calculation (0-100) **
    const jobFitScore = 4.5; // Persona match implies high fit
    const competenceAvg = (parseFloat(finalKorean) + parseFloat(finalOA) + parseFloat(finalMajor)) / 3;
    const cultureScore = parseFloat(finalCulture) || 3;
    const settlementScore = (parseFloat(scoreWage) + parseFloat(finalKorean)) / 2;

    const rawSurvival = (jobFitScore + competenceAvg + cultureScore + settlementScore) / 4;
    const survivalScore = Math.min(Math.round((rawSurvival / 5) * 100), 99);

    // ** Risk Factor Inverse Framing (Phase 3) **
    let riskFactors = [];
    if (cultureScore < 3.0) {
        riskFactors.push({
            code: "Low_Hierarchical_Adaptability",
            ui_framing: "수평적 소통과 자율성을 강하게 선호하는 성향으로, 글로벌 벤처 스타트업이나 외국계 기업 문화와 높은 시너지를 낼 수 있습니다."
        });
    }

    if (!isMasterOrAbove) {
        riskFactors.push({
            code: "F27_Master_Required",
            ui_framing: "유학생 대상 점수제 거주비자(F-2-7) 특례는 '국내 정규 석사 이상' 학위 또는 '우수대학 학사'를 필수로 요구합니다. 당장 특례대상이 아니라면 최초 취업은 E-7으로 시작하여 경력을 쌓거나 일반 대학원 진학을 고려하는 것이 좋습니다."
        });
    }

    // ** D-10 Simulator (Phase 4) **
    let d10Passed = false;
    let d10Message = "";
    let d10Score = 0;

    // 국내 정규 학사 이상 졸업자는 D-10 점수제(60점) 적용 최초 1회 면제 (성적/한국어 무관)
    if (hasDomesticBachelor) {
        d10Score = 0; // Not applicable
        d10Passed = true;
        d10Message = locale === 'en' ?
            "Congratulations! Domestic bachelor's degree graduates (or expected) are exempt from the D-10 job seeking visa points system once, allowing conversion without strict requirements." :
            "축하합니다! 국내 학사 졸업(예정)자는 D-10 구직 비자 점수제 적용이 최초 1회 면제되어, 요건 없이 구직 비자 전환이 가능합니다.";
    } else {
        d10Score = 15 + // Bachelor (General)
            15 + // Age 25
            (finalKorean >= 5 ? 20 : (finalKorean >= 4 ? 15 : 0)) +
            30; // Study in KR 3+ yrs
        d10Passed = d10Score >= 60;
        d10Message = d10Passed ?
            (locale === 'en' ? "You have already secured 60+ points with your degree and studying experience, making D-10 conversion highly likely." : "학위 취득과 유학 경력만으로도 이미 60점 이상을 확보하여 D-10 구직 비자 전환이 매우 유력합니다.") :
            (locale === 'en' ? "Supplementing your Korean score before graduation will help you safely reach 60 points." : "졸업 전까지 한국어 점수를 보완하면 충분히 60점을 달성할 수 있습니다.");
    }


    // 7. Roadmap Construction (Dynamic 4-Stage Strategy for ALL Top 3 Jobs)
    const buildRoadmapForJob = (jobCode, jobTitle) => {
        let steps = [];
        const indTypeKor = industryTypeMapped === 'IT' ? 'IT' : industryTypeMapped === 'DES' ? '디자인' : industryTypeMapped === 'MFG' ? '제조업' : '비즈니스';

        if (jobCode === "D84_STARTUP") {
            steps = [
                {
                    stage: "Phase 1. 아이디어 발굴 (1~2학년)",
                    icon: "💡",
                    action_items: [
                        { task: locale === 'en' ? 'Utilize your intro/extrovert traits and actively participate in campus startup clubs and hackathons.' : '내향/외향 성향을 살려 교내 창업 동아리 및 해커톤에 적극 참여하세요.', priority: "High", tag: locale === 'en' ? 'Networking' : '네트워킹' },
                        { task: locale === 'en' ? 'Highly recommended to enter Step 1 of the OASIS (Overall Assistance for Startup Immigration System) program.' : '글로벌 창업 이민센터(OASIS) 교육 1단계 진입을 강력히 추천합니다.', priority: "Medium", tag: locale === 'en' ? 'OASIS' : 'OASIS' }
                    ]
                },
                {
                    stage: "Phase 2. 시드 및 지적재산권 (3학년)",
                    icon: "🛡️",
                    action_items: [
                        { task: locale === 'en' ? 'Complete core team building for prospective founders and materialize your Business Model (BM).' : '예비창업자 핵심 팀 빌딩을 완료하고 비즈니스 모델(BM)을 구체화하세요.', priority: "High", tag: locale === 'en' ? 'Team Building' : '팀빌딩' },
                        { task: locale === 'en' ? 'Secure intellectual property such as patents/utility models/designs to pre-set 50 OASIS points.' : '특허/실용신안/디자인권 출원 등 지식재산권을 확보하여 OASIS 점수(50점)를 미리 세팅하세요.', priority: "High", tag: locale === 'en' ? 'Intellectual Property' : '지식재산권' }
                    ]
                },
                {
                    stage: "Phase 3. 정부 지원금 확보 (4학년)",
                    icon: "💰",
                    action_items: [
                        { task: locale === 'en' ? 'Secure initial capital by being selected for government startup support programs like K-Startup.' : 'K-Startup 등 정부 창업 지원 사업에 선정되어 초기 자본금을 확보하세요.', priority: "High", tag: locale === 'en' ? 'Gov Funding' : '정부지원' },
                        { task: locale === 'en' ? 'Develop an MVP (Minimum Viable Product) with the secured funds and test market reactions.' : '확보된 자금으로 최소기능제품(MVP)을 개발하고 시장의 반응을 테스트하세요.', priority: "Medium", tag: locale === 'en' ? 'MVP Validation' : 'MVP검증' }
                    ]
                },
                {
                    stage: "Phase 4. 법인 설립 (D-8-4 준비)",
                    icon: "🏢",
                    action_items: [
                        { task: locale === 'en' ? 'Attract investment from Angel Investors or Accelerators (AC) and prepare for corporate setup.' : '엔젤 투자자나 엑셀러레이터(AC)로부터 투자를 유치하고 법인 설립을 준비하세요.', priority: "Medium", tag: locale === 'en' ? 'Investment Attraction' : '투자유치' },
                        { task: locale === 'en' ? 'Complete capital registration of 100M+ KRW and fulfill the final 80 OASIS points.' : '1억 이상의 자본 등기를 완료하고, 최종 OASIS 80점을 채우세요.', priority: "High", tag: locale === 'en' ? 'Corporate Setup' : '법인설립' }
                    ]
                },
                {
                    stage: "Phase 5. 매출 발생 & 고용 (D-8-4 취득)",
                    icon: "📈",
                    action_items: [
                        { task: locale === 'en' ? 'Convert to the D-8-4 special visa and focus on achieving the initial revenue J-curve.' : 'D-8-4 특례 비자로 전환하고 본격적인 초기 매출 J커브 달성에 집중하세요.', priority: "High", tag: locale === 'en' ? 'Visa Conversion' : '비자전환' },
                        { task: locale === 'en' ? 'Prove business scale-up and economic contribution, such as creating direct employment for Korean staff.' : '한국인 직원 직고용 창출 등 비즈니스 스케일업과 경제 기여도를 입증하세요.', priority: "Medium", tag: locale === 'en' ? 'Hiring Expansion' : '채용확대' }
                    ]
                },
                {
                    stage: "Phase 6. 벤처 인증 & 영주권 (F-5-11)",
                    icon: "🚀",
                    action_items: [
                        { task: locale === 'en' ? 'Acquire outstanding venture enterprise certification from KIBO or others.' : '기술보증기금 등으로부터 우수 벤처기업 인증을 획득하세요.', priority: "High", tag: locale === 'en' ? 'Venture Cert' : '벤처인증' },
                        { task: locale === 'en' ? 'Challenge the F-5-11 Investor PR via large-scale external investment (Targeting 300M+ KRW).' : '외부 대규모 투자 유치(3억 이상 타겟)를 통해 최종적으로 F-5-11 투자 영주권에 도전해 보세요.', priority: "High", tag: locale === 'en' ? 'Permanent Residency' : '영주권' }
                    ]
                }
            ];
        } else if (jobCode.startsWith("E-7-3") || jobCode.startsWith("E-7-4") || jobCode.startsWith("E73") || jobCode.startsWith("E74")) {
            steps = [
                {
                    stage: "Phase 1. 기술 자격 및 로컬라이징 (1~2학년)",
                    icon: "⚙️",
                    action_items: [
                        { task: locale === 'en' ? 'Maximize adaptation to Korean industrial sites. Maintain STEM/Associate degree and master Korean for field communication.' : '한국 산업 현장 적응력을 극대화하세요. 이공계/전문 학사 유지는 기본, 현장 소통을 위한 한국어를 마스터하세요.', priority: "High", tag: locale === 'en' ? 'Degree Defense' : '학위방어' },
                        { task: locale === 'en' ? 'Thoroughly prepare for KIIP pre-completion for communication and residency visa bonus points.' : '거주 비자 가산점 및 소통을 위해 KIIP(사회통합프로그램) 사전 이수를 철저히 대비하세요.', priority: "Medium", tag: locale === 'en' ? 'KIIP' : 'KIIP' }
                    ]
                },
                {
                    stage: "Phase 2. 현장 맞춤형 자격증 (3학년)",
                    icon: "🛠️",
                    action_items: [
                        { task: locale === 'en' ? 'Prepare to acquire national technical certificates (Craftsman/Industrial Engineer) demanded by industrial sites.' : '산업 현장에서 요구하는 국가 기술 자격증(기능사/산업기사) 취득을 준비하세요.', priority: "High", tag: locale === 'en' ? 'Certification' : '자격증' },
                        { task: locale === 'en' ? 'Acquire practical knowledge proving field value equal to or greater than domestic skilled workers.' : '내국인 기능인력 대비 동등 이상의 현장 가치를 증명할 수 있는 실무 지식을 습득하세요.', priority: "Medium", tag: locale === 'en' ? 'Practical Knowledge' : '실무지식' }
                    ]
                },
                {
                    stage: "Phase 3. 산학 연계 실습 (4학년)",
                    icon: "🏭",
                    action_items: [
                        { task: locale === 'en' ? 'Actively explore fields like Root Industries or Shipbuilding where the \'International Student Experience Exemption\' applies.' : '뿌리산업, 조선업 등 \'유학생 경력 면제 특례\'가 적용되는 분야를 적극 탐색하세요.', priority: "High", tag: locale === 'en' ? 'Exemption Targeting' : '특례타겟팅' },
                        { task: locale === 'en' ? 'Enter systematic industry-academy practice networks to build solid field networks and practical experience.' : '체계적인 산학 실습 네트워크에 진입하여 현장 네트워크와 탄탄한 실무 경험을 쌓으세요.', priority: "High", tag: locale === 'en' ? 'Industry-Academy Practice' : '산학실습' }
                    ]
                },
                {
                    stage: "Phase 4. K-Point E-74 전환 (구직)",
                    icon: "🏗️",
                    action_items: [
                        { task: locale === 'en' ? 'At graduation, build a visa strategy utilizing the international student bonus (10pts) and local gov recommendation (30pts).' : '졸업 시점, 유학생 한정 가점(10점) 및 지자체 추천서(30점)를 활용하는 비자 전략을 세우세요.', priority: "High", tag: locale === 'en' ? 'K-Point' : 'K-Point' },
                        { task: locale === 'en' ? 'Armed with this government bonus point system, contact field employers to induce employment contracts.' : '이러한 정부 가점 제도를 무기로 현장 취업처를 컨택하고 고용 계약을 유도하세요.', priority: "High", tag: locale === 'en' ? 'Job Contact' : '취업컨택' }
                    ]
                },
                {
                    stage: "Phase 5. 비자 직행 (E-7 취득)",
                    icon: "🤝",
                    action_items: [
                        { task: locale === 'en' ? 'Avoid the E-9 process by securing an employment contract over 26M KRW annually (wage requirement).' : '현장 연 2600만 원 이상(임금 요건) 고용계약으로 E-9 과정을 거치지 마세요.', priority: "High", tag: locale === 'en' ? 'Wage Requirement' : '임금요건' },
                        { task: locale === 'en' ? 'Go straight to a professional work visa (E-7) from the start to quickly settle in the field and start your career.' : '초기부터 전문 취업(E-7) 비자에 직행하여 현장에 빠르게 안착하고 경력을 시작하세요.', priority: "High", tag: locale === 'en' ? 'Direct E-7' : 'E-7직행' }
                    ]
                },
                {
                    stage: "Phase 6. 현장 마이스터 (F-2-9)",
                    icon: "🥇",
                    action_items: [
                        { task: locale === 'en' ? 'Demonstrate craftsmanship: Serve diligently in the same workplace for over 3 years.' : '장인 정신 발휘: 동일 직장에서 3년 이상 성실히 장기 근속하세요.', priority: "High", tag: locale === 'en' ? 'Long-term Service' : '장기근속' },
                        { task: locale === 'en' ? 'Convert to the Skilled Talent Residency Visa (F-2-9) to lay a perfect foundation for permanent residency.' : '숙련기능 우수인재 거주 비자(F-2-9)로 전환하고 완벽한 영주권 기반을 닦으세요.', priority: "High", tag: locale === 'en' ? 'Meister' : '마이스터' }
                    ]
                }
            ];
        } else {
            // Removed standalone F27S_KSTAR roadmap block from here, transitioning it to a roadmap step.
            // Corporate Pro Track (Default E-7-1)

            // 1. [데이터 연동 환경 셋업] E7_REQUIREMENTS DB에 해당 직무의 구체적인 roadmap 데이터가 있다면 우선 사용!
            const dbRef = E7_REQUIREMENTS[jobCode] ? E7_REQUIREMENTS[jobCode].roadmap : undefined;

            let targetSpecs = {
                basicReq: [], // Degree, Korean, etc.
                certifications: [],
                tools: [],
                portfolio: []
            };

            // Extract job title from db logic
            // The jobTitle parameter is already passed to buildRoadmapForJob, so we don't need to re-extract it here.
            // const jobTitle = E7_DB[jobCode]?.name_ko || E7_DB[jobCode]?.title || jobCode; // This line is not needed here.

            // Define userName directly
            const userName = baseProfile?.name || '지원자';

            // E7_DB 연동 (기본 자격 요건)
            const dbInfo = E7_DB[jobCode] || E7_DB[String(jobCode)];
            if (dbInfo && dbInfo.req) {
                if (dbInfo.req.degree) targetSpecs.basicReq.push((locale === 'en' ? 'Degree: ' : '학위: ') + dbInfo.req.degree);
                if (dbInfo.req.korean) targetSpecs.basicReq.push((locale === 'en' ? 'Korean: TOPIK Level ' : '한국어: TOPIK ') + dbInfo.req.korean + (locale === 'en' ? '+' : '급 이상'));
                if (dbInfo.hot_skills) targetSpecs.tools = [...dbInfo.hot_skills];
            } else {
                targetSpecs.basicReq.push(locale === 'en' ? "Degree: Relevant Bachelor's or higher" : "학위: 관련 전공 학사 이상");
                targetSpecs.basicReq.push(locale === 'en' ? "Korean: TOPIK Level 4+ Rec." : "한국어: TOPIK 4급 이상 권장");
            }

            // E7_REQUIREMENTS 연동 (자격증, 포트폴리오 등 세부 로드맵)
            if (dbRef) {
                targetSpecs.certifications = dbRef.certifications || [];
                // E7_DB의 hot_skills와 제미나이 데이터 합치기 (중복 제거)
                if (dbRef.tools && dbRef.tools.length > 0) {
                    targetSpecs.tools = [...new Set([...targetSpecs.tools, ...dbRef.tools])];
                }
                targetSpecs.portfolio = dbRef.portfolio || [];
            }

            // 2. Fallback: DB에 구체적인 데이터가 비어있다면 산업군별 디폴트 키워드로 채우기
            if (targetSpecs.certifications.length === 0 || targetSpecs.tools.length === 0 || targetSpecs.portfolio.length === 0) {
                let defaultCerts = [];
                let defaultTools = [];
                let defaultPorts = [];

                if (indTypeKor === 'IT' || jobCode.includes('IT')) {
                    defaultCerts = locale === 'en' ? ["Information Processing Eng.", "AWS Certified"] : ["정보처리기사", "AWS Certified"];
                    defaultTools = ["React", "Spring", "Docker", "Git/GitHub"];
                    defaultPorts = locale === 'en' ? ["IT Venture Internship Exp.", "Deployable Full-stack Toy Project"] : ["IT 벤처기업 실무 인턴십 경험", "배포 및 서비스 가능한 풀스택 토이 프로젝트"];
                } else if (indTypeKor === '디자인' || jobCode === "2855") {
                    defaultCerts = locale === 'en' ? ["Computer Graphics Craftsman", "Colorist"] : ["컴퓨터그래픽스운용기능사", "컬러리스트"];
                    defaultTools = ["Figma", "Adobe CC (Ps, Ai, Ae)"];
                    defaultPorts = locale === 'en' ? ["Design Agency Co-op Internship", "Behance/Notion Real-world UI/UX Output"] : ["디자인 에이전시 산학협력 인턴", "Behance/Notion 업로드된 실무형 UI/UX 산출물"];
                } else if (jobCode === "S273" || jobCode === "2742" || jobCode === "2733" || jobCode === "2731") { // Sales/Marketing/PR/Planning
                    defaultCerts = locale === 'en' ? ["GA4 (Google Analytics)", "Search Ad Marketer"] : ["GA4(구글애널리틱스)", "검색광고마케터"];
                    defaultTools = locale === 'en' ? ["Advanced Excel Analytics", "Performance Marketing Tools"] : ["Excel 고급 데이터 분석", "퍼포먼스 마케팅 툴"];
                    defaultPorts = locale === 'en' ? ["Global Brand Supporter Activity", "Actual SNS Channel Ops & ROAS Report"] : ["글로벌 브랜드 서포터즈 활동", "실제 SNS 채널 운영 및 ROAS 분석 성과 보고서"];
                } else if (jobCode === "272" || jobCode === "1212") { // Management
                    defaultCerts = locale === 'en' ? ["Computerized Tax Acct.", "Intl. Trade Specialist"] : ["전산세무회계", "국제무역사"];
                    defaultTools = locale === 'en' ? ["ERP System Master", "Fluent English/Local Lang Biz Comms"] : ["ERP 시스템 마스터", "비즈니스 영어/현지어 소통"];
                    defaultPorts = locale === 'en' ? ["MNC Mgmt Support Internship", "Overseas Market Research Sim Report", "English Biz Email Writing Skills"] : ["다국적 기업 경영지원 인턴십", "해외 시장 조사 시뮬레이션 보고서", "영문 비즈니스 이메일 작성 역량"];
                } else {
                    defaultCerts = locale === 'en' ? ["Job-related Industrial Eng. or higher"] : ["직무 관련 산업기사 이상"];
                    defaultTools = locale === 'en' ? ["Essential Industry SW & OA"] : ["현업 필수 전문 소프트웨어 및 OA"];
                    defaultPorts = locale === 'en' ? ["Industry-linked Part-time & Internship Exp.", "Practical Problem-Solving Portfolio"] : ["현업 연계 아르바이트 및 인턴 경험", "실전 문제 해결 능력 증명 포트폴리오"];
                }

                if (targetSpecs.certifications.length === 0) targetSpecs.certifications = defaultCerts;
                // tools는 hot_skills가 이미 있을 수도 있으므로 없거나 너무 적으면 병합
                if (targetSpecs.tools.length <= 1) targetSpecs.tools = [...new Set([...targetSpecs.tools, ...defaultTools])];
                if (targetSpecs.portfolio.length === 0) targetSpecs.portfolio = defaultPorts;
            }

            // --- 3. [Advanced] Data Granular Classification ---
            // A. 자격증 난이도/중요도 분류 (High vs Normal)
            targetSpecs.certifications = targetSpecs.certifications.map(cert => {
                const isHigh = /(기사|산업기사|필수|마스터|고급|마스터)/i.test(cert);
                return {
                    text: cert,
                    priority: isHigh ? 'High' : 'Normal',
                    label: isHigh ? (locale === 'en' ? 'Core/Required' : '핵심/필수') : (locale === 'en' ? 'Recommended/Preferred' : '권장/우대')
                };
            });

            // B. 포트폴리오 성격 분류 (Activity vs Portfolio)
            targetSpecs.portfolio = targetSpecs.portfolio.map(port => {
                const isActivity = /(인턴|아르바이트|알바|동아리|서포터즈|공모전|활동|참여|대외|봉사)/i.test(port);
                return {
                    text: port,
                    type: isActivity ? 'Activity' : 'Portfolio',
                    label: isActivity ? (locale === 'en' ? 'Experience/Extracurricular' : '경험/대외활동') : (locale === 'en' ? 'Practical/Portfolio' : '실무/포트폴리오')
                };
            });

            // --- 4. Unified E-7 Roadmap (Includes Vacations) ---
            const needsLanguage = uTopik < 4;
            const bilingualTip = hasHighSecLang ?
                (locale === 'en' ?
                    `[Tip] ${userName} is bilingual. When writing your recommendation letter, strongly appeal your 'overseas networking skills' and 'role as a bridgehead for global market expansion' rather than just your Korean proficiency.` :
                    `[Tip] ${userName}님은 이중언어 능력자입니다. 고용사유서 작성 시 단순 한국어 실력이 아닌 '해외 현지 네트워킹 능력'과 '글로벌 시장 확장의 교두보 역할'을 강력히 어필하세요.`) :
                (locale === 'en' ?
                    "Persuade the interviewer with distinct job competencies and a clear justification for 'why they must hire you' in the recommendation letter." :
                    "면접관에게 뚜렷한 직무 역량과 '나를 꼭 뽑아야 하는 고용 사유서'의 핵심 명분을 설득하세요.");

            steps = [
                {
                    stage: locale === 'en' ? "Phase 1. Fundamental Skills & Exploration (Freshman/Sophomore)" : "Phase 1. 기초 역량 및 탐색 (1~2학년 정규학기)",
                    icon: "📖",
                    action_items: [
                        { task: (locale === 'en' ? `Maintain a **GPA of 3.0+** while taking major/elective courses related to **${jobTitle}**. GPA is a measure of diligence and a basic requirement for resume screening.` : `**${jobTitle}** 관련 전공/교양을 수강하며 **GPA 3.0 이상**을 방어하세요. 평점은 성실성의 척도이자 취업 서류 통과의 기본 요건입니다.`), priority: "High", tag: locale === 'en' ? 'Major GPA' : '전공평점' },
                        { task: (locale === 'en' ? `Join the Office of International Affairs (OIA) programs or major societies to directly collect **real E-7 employment success/failure cases** from senior students.` : `교내 유학생 지원팀(OIA) 프로그램이나 전공 학회에 가입하여, 선배들의 **실제 E-7 취업 성공/실패 사례**를 직접 수집하세요.`), priority: "Medium", tag: locale === 'en' ? 'Networking' : '네트워킹' }
                    ]
                },
                {
                    stage: locale === 'en' ? "Phase 2. Language & Certification Immersion (Freshman/Sophomore Break)" : "Phase 2. 어학 및 자격 몰입 (1~2학년 방학)",
                    icon: "🔥",
                    action_items: [
                        { task: (locale === 'en' ? `Focus on studying during the break aiming for **TOPIK Level 4**, a mandatory visa requirement. You must also take the pre-evaluation for **KIIP Level 3~4** which provides a certificate.` : `비자 필수 요건인 **TOPIK 4급**을 목표로 방학 중 집중 공부하세요. 수료증이 나오는 **사회통합프로그램(KIIP) 3~4단계** 사전평가도 꼭 응시해야 합니다.`), priority: "High", tag: locale === 'en' ? 'Lang Immersion' : '어학몰입' },
                        { task: (locale === 'en' ? `Access **Q-Net (HRDK)** to check the exam schedule for *National Technical Qualifications (Engineer/Industrial Engineer)* related to your target job, and pre-study the written subjects.` : `**한국산업인력공단(Q-Net)**에 접속해 목표 직무와 연관된 *국가기술자격(기사/산업기사)* 시험 일정을 확인하고 필기 과목을 선행 학습하세요.`), priority: "Medium", tag: locale === 'en' ? 'Cert Prep' : '자격증대비' }
                    ]
                },
                {
                    stage: locale === 'en' ? "Phase 3. Building Core Specs (Junior/Senior Semester)" : "Phase 3. 핵심 스펙 구축 (3~4학년 정규학기)",
                    icon: "💻",
                    action_items: [
                        { task: (locale === 'en' ? `Secure the essential software skills and core major certifications (Engineer/Industrial Engineer) specified at the top according to your target job.` : `목표 직무에 맞춰 상단에 명시된 필수 소프트웨어 및 핵심 전공 자격증(기사/산업기사)을 확보하세요.`), priority: "High", tag: locale === 'en' ? 'Hard Skills' : '하드스킬' },
                        { task: (locale === 'en' ? `Actively participate in on-campus capstone design and industry-university cooperation projects to build a practical portfolio demonstrating **what contributions you can make in the Korean corporate field**.` : `교내 캡스톤 디자인, 산학 협력 프로젝트 등에 적극적으로 참여해 **지원자가 한국 기업 현장에서 어떤 기여를 할 수 있는지** 보여줄 실무 포트폴리오를 구성하세요.`), priority: "High", tag: locale === 'en' ? 'Portfolio' : '포트폴리오' }
                    ]
                },
                {
                    stage: locale === 'en' ? "Phase 4. Practical Experience & Internship (Junior/Senior Break)" : "Phase 4. 실전 경험 및 인턴십 (3~4학년 방학)",
                    icon: "💼",
                    action_items: [
                        { task: (locale === 'en' ? `Regularly check major domestic recruitment portals and the campus career center to complete at least one job-related internship or job experience available for foreigners.` : `국내 주요 채용 포털이나 교내 취업지원센터를 주기적으로 확인하여, 외국인 지원이 가능한 직무 연관 인턴십이나 직무 체험을 1회 이상 완수하세요.`), priority: "High", tag: locale === 'en' ? 'Practical Exp' : '실전경험' },
                        { task: (locale === 'en' ? `Weave your on/off-campus activities and practical experiences into a single story, finalizing a **Master Resume & Job Portfolio** that you can present to interviewers immediately.` : `그동안의 교내외 활동과 실무 경험들을 하나의 스토리로 엮어, 면접관에게 즉각 제시할 수 있는 **마스터 이력서 및 직무 포트폴리오**를 확정하세요.`), priority: "Medium", tag: locale === 'en' ? 'Resume Prep' : '이력서완성' }
                    ]
                },
                {
                    stage: locale === 'en' ? "Phase 5. D-10 Job Search & Direct E-7 Transition (Graduation)" : "Phase 5. D-10 구직 및 E-7 직행 (졸업전후)",
                    icon: "🚀",
                    action_items: [
                        { task: (locale === 'en' ? `Utilize the D-10 (Job Seeker) visa exception for international students to focus on applying to robust mid-sized/SME companies with **5+ domestic employment insurance subscribers** and a condition guaranteeing **minimum wage or higher based on base salary**. (*E-7 general wage requirement: 80%+ of the previous year's GNI*)` : `D-10(구직) 비자 소지 유학생 특례를 활용해, **내국인 고용보험 가입자 5인 이상**이며 **기본급 기준 최저임금 이상 보장** 조건이 명시된 튼튼한 중견/중소기업에 집중 지원하세요. (*E-7 일반 임금 요건: 전년도 GNI 80% 이상*)`), priority: "High", tag: locale === 'en' ? 'Targeted Apply' : '타겟지원' },
                        { task: bilingualTip, priority: "High", tag: locale === 'en' ? 'Recommendation' : '고용사유서' }
                    ]
                }
            ];

            const userUnivLower = uSchool.toLowerCase();
            const isKStar = userUnivLower.includes('서울') || userUnivLower.includes('고려') || userUnivLower.includes('연세') || userUnivLower.includes('카이스트') || userUnivLower.includes('포항공') || userUnivLower.includes('한양') || userUnivLower.includes('성균관');

            if (isKStar) {
                steps.push({
                    stage: locale === 'en' ? "Phase 6. K-STAR Top Tier Upgrade (F-2-7S)" : "Phase 6. K-STAR 우수대학 업그레이드 (F-2-7S)",
                    icon: "👑",
                    action_items: [
                        { task: locale === 'en' ? 'This is a top-tier position where an early permanent residency (F-5) track can be designed if requirements are met.' : '자격 요건 충족 시 조기 영주권(F-5) 트랙까지 설계 가능한 최상위 포지션입니다.', priority: "High", tag: locale === 'en' ? 'Foundation' : '초석다지기' },
                        { task: locale === 'en' ? `${userName}'s alma mater qualifies for the International Student Exemption (F-2-7S). Independent of E-7 preparation, keep in mind an early upgrade to a residency visa not bound to a specific company by utilizing high education bonus points.` : `${userName}님의 출신 대학은 유학 특례(F-2-7S) 대상입니다. E-7 취업 준비와 별개로, 높은 학력 가점을 활용해 회사에 종속되지 않는 거주 비자로의 조기 업그레이드를 염두에 두세요.`, priority: "High", tag: locale === 'en' ? 'Use Exemption' : '특례활용' },
                        { task: locale === 'en' ? 'It is highly advantageous to complete TOPIK Level 5+ and KIIP Level 5 before graduation to achieve 80 points.' : '점수제 80점 달성을 위해 TOPIK 5급 이상과 KIIP 5단계를 졸업 전까지 반드시 미리 완성해 두는 것이 유리합니다.', priority: "High", tag: locale === 'en' ? 'Secure Points' : '점수확보' }
                    ]
                });
            } else if (isMasterOrAbove || intentMaster >= 4) {
                steps.push({
                    stage: locale === 'en' ? "Phase 6. Residency Visa (F-2-7) Upgrade (Master/PhD)" : "Phase 6. 정주 비자(F-2-7) 업그레이드 (석박사)",
                    icon: "🎓",
                    action_items: [
                        { task: (locale === 'en' ? `General professionals (E-7-1) can upgrade to the Points-Based Excellent Talent (F-2-7) visa upon meeting requirements later.` : `일반 전문직(E-7-1) 취업자는 추후 자격 요건을 충족하면 점수제 우수인재(F-2-7) 비자로 업그레이드할 수 있습니다.`), priority: "High", tag: locale === 'en' ? 'F-2-7 Prep' : 'F-2-7준비' },
                        { task: (locale === 'en' ? `In particular, maintaining or additionally acquiring domestic degrees (Master/PhD) is extremely advantageous for securing visa points.` : `특히 국내 학위(석박사)를 유지하거나 추가 취득할 경우, 비자 점수 확보에 매우 유리합니다.`), priority: "High", tag: locale === 'en' ? 'Bonus Points' : '점수가점' }
                    ]
                });
            }

            // 어학 동적 타임라인 (TOPIK < 4) - 법무부 E-7 요구치에 못 미칠 경우 강제 배치
            if (needsLanguage) {
                steps.unshift({
                    stage: locale === 'en' ? "Phase 0. Urgent Language Score Acquisition [MUST]" : "Phase 0. 긴급 어학 점수 획득 [MUST]",
                    icon: "🚨",
                    action_items: [
                        { task: (locale === 'en' ? `Your current Korean proficiency has not reached the E-7 visa requirement (TOPIK Level 4). We strongly recommend acquiring TOPIK Level 3~4+ as the highest priority of your roadmap!` : `현재 한국어 능력이 E-7 비자 요구치(TOPIK 4급)에 도달하지 못했습니다. 로드맵 최우선 과제로 TOPIK 3~4급 이상 취득을 강력히 권고합니다!`), priority: "High", tag: locale === 'en' ? 'TOPIK Required' : 'TOPIK필수' },
                        { task: (locale === 'en' ? `Concurrently with TOPIK, immediately take the pre-evaluation for KIIP (Korea Immigration & Integration Program) recognized by the Ministry of Justice to dimensionally supplement your language specs.` : `TOPIK과 동시에 법무부 인정 평가인 KIIP(사회통합프로그램) 사전평가를 즉시 응시하여 어학 스펙을 입체적으로 보완하세요.`), priority: "High", tag: locale === 'en' ? 'KIIP Mandatory' : 'KIIP강제' }
                    ]
                });
            }

            return {
                jobCode,
                title: jobTitle,
                targetSpecs,
                steps
            };
        }

        return {
            jobCode,
            title: jobTitle,
            steps
        };
    };

    // Calculate roadmaps for all top 3 recommended jobs
    const allRoadmaps = recommendedJobsArray.map(job => buildRoadmapForJob(job.code, job.title));


    // ** Growth Potential Strategy (ex-Risk Analysis) **
    // Get username for personal touch
    const userName = baseProfile?.name || '지원자';

    // ** Feedback Generation **
    let growthHeading = "";
    let growthItems = [];

    if (parseFloat(finalKorean) < 4) {
        growthHeading = "한국어 역량 강화 필요 (Premium Strategy)";
        growthItems.push("TOPIK 4급 확보 시 D-10 구직비자 혜택 및 E-7 가점을 기대할 수 있습니다.");
        growthItems.push("기술/전공 지식이 높아도, 한국어 능력이 부족하면 채용 매력도가 급감합니다.");
    } else if (scoreWage < 3) {
        growthHeading = locale === 'en' ? 'Starting Salary Negotiation & Job Expertise' : '초봉 협상력 및 직무 전문성 확보';
        growthItems.push(`E - 7 비자는 전년도 GNI 80 % 이상의 소득 요건이 기본입니다.`);
        growthItems.push("단순 노무가 아닌 '전문 인력'임을 어필할 수 있는 실무 포트폴리오를 준비하세요.");
    } else if (totalF27 < 80) {
        growthHeading = "F-2-7 점수 관리 플랜 (Long-term Strategy)";
        growthItems.push(`현재 시뮬레이션 점수는 ${totalF27}점입니다. 80점 안정권 달성이 필요합니다.`);
        if (scoreKIIP === 0) growthItems.push("가장 빠르고 확실한 점수 확보 방법은 사회통합프로그램(KIIP) 이수입니다.");
    }

    if (growthItems.length === 0) {
        growthItems.push("현재 학업/언어/실무 역량이 본 궤도에 올랐습니다. 네트워크를 넓히고 면접을 준비하세요.");
    }

    // ** Strategy Text (Korean & English) **
    const strategyTextEn = `${userName} is a **${typeCode}** type talent who can exhibit ${parseFloat(finalCulture) >= 3.0 ? 'organizational integration' : 'creative autonomy'} in the **${industryTypeMapped}** industry. ${parseFloat(finalKorean) < 4 ? 'If you prioritize securing TOPIK Level 4 to gain visa points and then' : 'Based on your strong Korean skills, if you'} appeal your expertise in the **${jobData.name_en?.split('(')[0] || jobData.name_ko.split('(')[0]}** role, acquiring the E-7 visa is highly plausible.`;

    const strategyTextKo = `${userName}님은 ** ${typeCode} ** 유형의 인재로, ** ${industryTypeMapped} ** 산업군에서 ${parseFloat(finalCulture) >= 3.0 ? '조직 융화력' : '창의적 자율성'}을 발휘할 수 있습니다.${parseFloat(finalKorean) < 4 ? '우선적으로 TOPIK 4급을 확보하여 비자점수 가점을 챙기고,' : '한국어 강점을 바탕으로'} ** ${jobData.name_ko.split('(')[0]}** 직무의 전문성을 어필한다면 E - 7 비자 취득이 유력합니다.`;

    const strategyText = locale === 'en' ? strategyTextEn : strategyTextKo;

    // ** Use established 4-letter KVTI Code **
    const kvtiCode = typeCode;

    const kvtiBreakdown = [
        { char: char_1, name: char_1 === 'I' ? (locale === 'en' ? "IT / Tech" : "IT 기술") : char_1 === 'D' ? (locale === 'en' ? "Creative" : "크리에이티브") : char_1 === 'M' ? (locale === 'en' ? "Engineering" : "엔지니어링") : char_1 === 'S' ? (locale === 'en' ? "Service" : "서비스") : char_1 === 'L' ? (locale === 'en' ? "Local Specialty" : "지역특화") : (locale === 'en' ? "Business" : "비즈니스") },
        { char: char_2, name: char_2 === 'A' ? (locale === 'en' ? "Analysis/Mgmt" : "분석·관리") : char_2 === 'C' ? (locale === 'en' ? "Plan/Creative" : "기획·창조") : char_2 === 'E' ? (locale === 'en' ? "Leader/Pioneer" : "리더·개척") : (locale === 'en' ? "Practical/Field" : "실용·현장") },
        { char: char_3, name: char_3 === 'H' ? (locale === 'en' ? "Stable/Corp" : "안정·대기업형") : (locale === 'en' ? "Autonomous/Startup" : "자율·스타트업형") },
        { char: char_4, name: char_4 === 'K' ? (locale === 'en' ? "Korea Settlement" : "한국정주") : (locale === 'en' ? "Global Migration" : "글로벌이주") }
    ];

    // Return Report Data
    return {
        baseProfile: baseProfile,
        dashboard: {
            persona_title: koTitle,
            kvti_code: kvtiCode,
            kvti_breakdown: kvtiBreakdown,
            scoreBreakdown: scoreBreakdown,
            type_code: typeCode,
            target_visa: locale === 'en' ? 'E-7-1 Professional' : 'E-7-1 전문인력',
            job_code: consultingJobData,
            tags: tags,
            characteristics: personaQuote,
            strategy: strategyText,
            riasec_code: topCode,
            survival_score: survivalScore,
            visa_grade: visaGrade,
            visa_grade_label: visaGradeLabel,
            growth_focus: growthHeading,
            growth_actions: growthItems,
            is_junior: isJunior,
            recommended_jobs: recommendedJobsArray,
            isMajorCompensated: isMajorCompensated,
            careerVitalityIndex: careerVitalityIndex,
            mdjm_raw_results: mdjmResults.slice(0, 10) // Included for debug logs
        },
        diagnosis: {
            riasec: {
                radarData: radarData
            },
            f27_sim: {
                score: totalF27,
                gap: f27Gap,
                breakdown: f27Breakdown
            },
            d10_sim: {
                score: d10Score,
                message: d10Message
            },
            job_fit: {
                target_job: consultingJobData,
                target_industry: industryTypeMapped,
                match_score: 80 + Math.floor(Math.random() * 15)
            },
            competence: {
                korean: parseFloat(finalKorean),
                tech_skill: parseFloat(finalOA),
                major_expertise: parseFloat(finalMajor)
            },
            culture_fit: {
                score: parseFloat(finalCulture),
                risk_factors: riskFactors
            },
            visa_probability: {
                score: visaProbability,
                is_ready: isVisaReady,
                domestic_bachelor_exemption: experience_exempt
            },
            user_profile: {
                isMajorAligned: parseFloat(finalMajor) >= 4
            }
        },
        roadmap: allRoadmaps,
        raw_answers: answers
    };
};
