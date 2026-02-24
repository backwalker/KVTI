import fs from 'fs';
import { calculateKvtiResult } from './src/utils/kvtiLogic.js';
import kvtiQuestions from './src/data/kvti_questions.json' with { type: "json" };

const allSections = [
    'part1_riasec', 'part2_competency', 'part3_job_pref',
    'part4_industry_pref', 'part5_org_culture', 'part6_residency'
];

const industryKeys = ['IT', 'BIZ', 'DES', 'MFG'];
const majorMap = { 'IT': '소프트웨어공학', 'BIZ': '경영학', 'DES': '시각디자인', 'MFG': '기계공학' };
const industryToRiasecMap = {
    'IT': ['I', 'R', 'C'],
    'BIZ': ['E', 'S', 'C'],
    'DES': ['A', 'I', 'E'],
    'MFG': ['R', 'I', 'C']
};

function generateRealisticProfile() {
    const chosenIndustry = industryKeys[Math.floor(Math.random() * industryKeys.length)];
    const possibleRiasec = industryToRiasecMap[chosenIndustry];
    const chosenRiasec = possibleRiasec[Math.floor(Math.random() * possibleRiasec.length)];

    const randomAnswers = {};

    allSections.forEach(sectionKey => {
        const questions = kvtiQuestions[sectionKey] || [];
        questions.forEach(q => {
            if (!q || !q.id) return;
            if (q.id === 'ID' || q.type === '코드' || q.question?.includes('문항')) return;

            if (q.options) {
                if (q.options.length > 0) {
                    const randomOptionIndex = Math.floor(Math.random() * q.options.length);
                    randomAnswers[q.id] = q.options[randomOptionIndex].value;
                }
            } else {
                let val = Math.floor(Math.random() * 2) + 1; // 1-2 default

                if (sectionKey === 'part1_riasec') {
                    if (q.type?.startsWith(chosenRiasec)) val = Math.floor(Math.random() * 2) + 4; // 4-5 peak
                } else if (sectionKey === 'part4_industry_pref') {
                    const isMatch = (chosenIndustry === 'IT' && q.id.includes('IND_I')) ||
                        (chosenIndustry === 'MFG' && q.id.includes('IND_M')) ||
                        (chosenIndustry === 'DES' && q.id.includes('IND_C')) ||
                        (chosenIndustry === 'BIZ' && (q.id.includes('IND_T') || q.id.includes('IND_B')));
                    if (isMatch) val = Math.floor(Math.random() * 2) + 4;
                } else if (sectionKey === 'part3_job_pref') {
                    const isMatch = (chosenIndustry === 'IT' && q.id.includes('JP_I')) ||
                        (chosenIndustry === 'MFG' && q.id.includes('JP_R')) ||
                        (chosenIndustry === 'BIZ' && (q.id.includes('JP_E') || q.id.includes('JP_S') || q.id.includes('JP_C'))) ||
                        (chosenIndustry === 'DES' && q.id.includes('JP_A'));
                    if (isMatch) val = Math.floor(Math.random() * 2) + 4;
                } else if (sectionKey === 'part2_competency' || sectionKey === 'part6_residency') {
                    val = Math.floor(Math.random() * 5) + 1; // 1-5 full range for competency and residency
                }

                randomAnswers[q.id] = val;
            }
        });
    });

    const randomPhase0 = {
        name: 'SimBot',
        age: Math.floor(Math.random() * 10) + 20,
        nationality: 'USA',
        region: '서울',
        university: '서울대학교',
        major: majorMap[chosenIndustry],
        grade: '3학년',
        topik: Math.floor(Math.random() * 4) + 3 + "", // 3 to 6
        kiip: '0',
        secondaryLanguages: []
    };

    return { randomAnswers, randomPhase0 };
}

function runSimulations(iterations = 1000) {
    console.log(`Starting KVTI Logic Simulation for ${iterations} profiles...`);
    const results = {
        total: iterations,
        personas: {},
        topE7Jobs: {},
        visas: { 'F-2-7': 0, 'D-10': 0, 'E-7-1': 0 },
        gniPassFail: { pass: 0, fail: 0 },
        averageF27Score: 0
    };

    let totalF27Score = 0;

    for (let i = 0; i < iterations; i++) {
        const { randomAnswers, randomPhase0 } = generateRealisticProfile();
        try {
            const result = calculateKvtiResult(randomAnswers, 'senior', randomPhase0);

            // Tally Personas (3-letter Code)
            const pCode = result.dashboard.kvti_code.substring(0, 3);
            results.personas[pCode] = (results.personas[pCode] || 0) + 1;

            // Tally Top E-7 Recommended Job
            const topJob = result.dashboard.mdjm_raw_results[0].code;
            results.topE7Jobs[topJob] = (results.topE7Jobs[topJob] || 0) + 1;

            // Tally Visas (Current logic sets target_visa based on rules)
            if (result.diagnosis.f27_sim.score >= 80) results.visas['F-2-7']++;
            if (result.diagnosis.d10_sim.score >= 60) results.visas['D-10']++;
            if (result.diagnosis.visa_probability.is_ready) results.visas['E-7-1']++;

            // F-2-7 Scores
            const f27Score = result.diagnosis.f27_sim.score;
            totalF27Score += f27Score;

            // GNI Pass
            if (result.dashboard.tags.includes("#고소득_잠재력")) {
                results.gniPassFail.pass++;
            } else {
                results.gniPassFail.fail++;
            }

        } catch (err) {
            console.log(`\n--- CRASH ON ITERATION ${i} ---`);
            console.log("Answers length:", Object.keys(randomAnswers).length);
            console.error(err);
        }
    }

    results.averageF27Score = (totalF27Score / iterations).toFixed(2);

    // Sort logic for presentation
    results.personas = Object.fromEntries(
        Object.entries(results.personas).sort(([, a], [, b]) => b - a)
    );
    results.topE7Jobs = Object.fromEntries(
        Object.entries(results.topE7Jobs).sort(([, a], [, b]) => b - a).slice(0, 10) // Top 10
    );

    console.log("\n=== SIMULATION RESULTS ===");
    console.log(JSON.stringify(results, null, 2));

    let markdownReport = `# KVTI Logic Simulation Report
- **Total Profiles Tested:** ${iterations}
- **Simulation Constraints:** Realistically Constrained Randomness (Major-to-Industry coupled logic)

## 📌 Visa Strategy Distribution
- **F-2-7 (Stable Probability > 80%):** ${results.visas['F-2-7']} profiles
- **D-10 Eligible (> 60 Points):** ${results.visas['D-10']} profiles
- **E-7-1 Probability (> 80 Points):** ${results.visas['E-7-1'] || 0} profiles

*Average F-2-7 Mock Score:* **${results.averageF27Score} / 125**

## 📌 Top 5 Generated Persona Clusters (Out of 32 types)
`;

    Object.entries(results.personas).slice(0, 5).forEach(([code, count]) => {
        markdownReport += `- **${code}**: ${count} occurrences (${((count / iterations) * 100).toFixed(1)}%)\n`;
    });

    markdownReport += `\n## 📌 Top 5 Recommended E-7 Job Codes\n`;
    Object.entries(results.topE7Jobs).slice(0, 5).forEach(([code, count]) => {
        markdownReport += `- **Code ${code}**: ${count} occurrences\n`;
    });

    markdownReport += `\n## 📌 GNI 80% Threshold (High Income Potential)\n`;
    markdownReport += `- **Pass:** ${results.gniPassFail.pass} profiles\n`;
    markdownReport += `- **Fail:** ${results.gniPassFail.fail} profiles\n`;

    fs.writeFileSync('./simulation_report.md', markdownReport, 'utf8');
    console.log("\nReport saved to simulation_report.md");
}

runSimulations(1000);
