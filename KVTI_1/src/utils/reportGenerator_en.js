import { KVTI_DICTIONARY } from '../data/kvti_dictionary_en.js';
import { E7_DESCRIPTIONS } from '../data/e7_official_descriptions_en.js';
import { E7_REQUIREMENTS } from '../data/e7_requirements_en.js';
import { E7_DB } from '../data/persona_data_en.js';

/**
 * TRAIT_DICTIONARY
 * Deep analytical descriptions for each of the 10 KVTI letters.
 * Used for the "세부 지표(Factor) 분해능 해석" section to provide consulting-grade details.
 */
const TRAIT_DICTIONARY = {
    // 1st Letter: Work Style
    "A": "■ Core Competency\nPossesses top-tier 'Analytical Thinking' that makes rational and objective decisions based on data and facts. Excels in finding clear causality amidst uncertainty and shows overwhelming performance in environments where risks are proactively identified and controlled.\n\n■ Behavioral Patterns & Strengths\nPrioritizes logical evidence over emotions or intuition, showing no fatigue in handling quantitative metrics like Excel, databases, and financial statements. Contributes significantly to reducing organizational costs and optimizing processes.\n\n■ Career Advice\nIf you add data structuring skills (SQL, Python, etc.) that can persuade with numbers and logic as hard specs, you can grow beyond a simple planner into a strategic consultant or data analyst, gaining unique competitiveness in the Korean market.",
    "C": "■ Core Competency\nPossesses outstanding 'Ideation' skills, creating something out of nothing based on intuition and creativity, breaking out of fixed frameworks and conventions. Highly sensitive to trend changes and has a creator's spirit that delivers attractive insights to the market or target audience.\n\n■ Behavioral Patterns & Strengths\nGains motivation from environments where new projects are planned or designs and content are produced, rather than repetitive or mechanical tasks. Excels at discovering aesthetic and planning connections that others fail to see.\n\n■ Career Advice\nYou must prove your ability to implement ideas into reality using modern tools (Figma, 3D modeling, video editing, etc.) through your portfolio. Practicing how to translate abstract planning proposals into business language is the key to successful employment.",
    "P": "■ Core Competency\nA 'Pragmatic Field-Type' talent who solves problems directly on-site (Field) and in practical affairs rather than relying on abstract theories or desk-bound discussions. Has an excellent ability to cope with situational changes and is extremely strong in tasks requiring immediate results.\n\n■ Behavioral Patterns & Strengths\nResolves emergency issues faster than anyone else through hands-on troubleshooting. Shines brightest in vibrant environments such as technical setups, field personnel management, and the frontlines of trade or sales.\n\n■ Career Advice\nYou need practice in systematizing your field sense into system manuals or report formats. If you add documentation skills as a manager to your practical experience, you can grow beyond a short-term practitioner into a long-term field operations general manager.",
    "E": "■ Core Competency\nPossesses innate 'Enterprise Leadership' that persuades others and leads a team toward a goal with a challenging and progressive attitude. Characterized by a strong breakthrough ability to decisively push projects forward even in uncertain business areas.\n\n■ Behavioral Patterns & Strengths\nExcels at taking the initiative at negotiation tables and in business communication. Highly suitable for management and business development roles that require mobilizing people and capital to build new business pipelines or plan and execute global expansion.\n\n■ Career Advice\nYour overflowing drive can sometimes lead to missing out on fine details. If you utilize tools that supplement financial feasibility studies or meticulous practical knowledge, the powerful energy synergy you possess will be maximized.",

    // 2nd Letter: Organizational Culture Fit
    "H": "■ Core Competency\nA 'System Guardian' who delivers perfect maximum efficiency like a cogwheel in organizations equipped with systematic internal manuals, clear hierarchies, and predictable systems. Boasts high professional reliability, strictly adhering to rules and fulfilling duties 100% responsibly.\n\n■ Behavioral Patterns & Strengths\nClearly understands the limits of given R&R (Roles and Responsibilities) and handles tasks meticulously based on company regulations when coordinating with other departments. Shines in giant organizations where stability is the highest priority, such as traditional large corporations, public institution partners, and the financial sector.\n\n■ Career Advice\nIf you appeal your understanding of traditional Korean corporate documentation culture (draft proposals, approval documents, etc.) and vertical reporting systems, you will receive highly positive evaluations from interviewers. Target mature mid-sized companies or larger rather than early-stage startups with excessive volatility.",
    "F": "■ Core Competency\nA dynamic talent who achieves explosive growth in organizations where individual autonomy is perfectly guaranteed and opinions are feedbacked horizontally (Flat Hierarchy), rather than being bound by conservative hierarchies. Strong in self-directed and goal(result)-oriented task processing.\n\n■ Behavioral Patterns & Strengths\nInstead of waiting for specific instructions from superiors, independently finds tasks of 'what to achieve' and derives solutions. Optimized for agile organizations, asynchronous communication centered on Slack, and remote/hybrid work models, allowing you to display your capabilities without stress.\n\n■ Career Advice\nSince there is no internal organizational politics, your value must be proven strictly through skills and results. Therefore, clear portfolios, GitHub profiles, and project contribution data will determine your employment success. Prioritize innovative IT companies, multinational corporations (MNCs), or local unicorn startups.",

    // 3rd Letter: Industry Preference
    "I": "■ Industry Fit & Ecosystem Understanding\nHas a deep interest in the knowledge-intensive IT environment where technological advancements entirely drive paradigm shifts, such as IT, software, artificial intelligence, and technology. Confident in absorbing massive technical documentation and new tech stacks quickly in the market with the fastest pace of innovation.\n\n■ Long-term Development Direction\nGo beyond being a simple coder and keep pace with the era led by tech-based businesses. If you possess 'communication skills that translate technological limits into business language,' you can stand tall as a globally irreplaceable talent covering development, data analysis, and overall IT planning.",
    "B": "■ Industry Fit & Ecosystem Understanding\nPossesses an outstanding constitutional instinct for the traditional business ecosystem where people, products, and capital are exchanged to create massive wealth, including trade, marketing, management consulting, purchasing, and commerce. 100% empathizes with the fundamental capitalist corporate goals of pursuing profit and securing market share.\n\n■ Long-term Development Direction\nPlease establish solid capabilities such as B2B partner network development skills, trade regulation understanding, and financial Excel analysis based on your multicultural global insights gained as an international student. Through this, you can grow into a global import/export strategic planner or a general manager of B2B trade accounts.",
    "D": "■ Industry Fit & Ecosystem Understanding\nYour true stage is the creative media industry that leads aesthetic senses and millennial mass culture trends, covering visual design, spatial environments, broadcasting entertainment, and new media content production. Based on high cultural sensitivity, you create added value that stimulates user emotions.\n\n■ Long-term Development Direction\nChemically combine a thorough understanding of UX/UI design methodologies (User Experience) and distribution marketing funnels with your talents, rather than simply focusing on visual aesthetics. You can firmly establish your career as a practical art director analyzing commercial data trends.",
    "M": "■ Industry Fit & Ecosystem Understanding\nAn invaluable aptitude optimized for the so-called 'Root Industry' (Manufacturing) ecosystem, which handles and engineers physical products and production processes representing the source of national core added value, such as semiconductor equipment, automotive parts manufacturing, EV batteries, and fine chemicals.\n\n■ Long-term Development Direction\nIn this field, which acts as the solid backbone of Korea's export economy, global quality control standards (ISO), smart factory process knowledge, and hard skills for facility maintenance become your weapons for survival. Try to prove your strengths in the production engineering sector, where special visa issuance for foreigners is most active, based on mechanical engineering understanding."
};

const TRAIT_TITLES = {
    "A": "Analysis/Planning (Analyze)",
    "C": "Creation/Intuition (Create)",
    "P": "Field/Execution (Practical)",
    "E": "Enterprise/Leader (Enterprise)",
    "H": "Vertical/Stable (Hierarchy)",
    "F": "Horizontal/Autonomous (Flat)",
    "I": "IT/Tech",
    "B": "Business",
    "D": "Design/Media",
    "M": "Manufacturing/Engineering"
};

/**
 * generateReportData (Pure Function)
 * Combines hardcoded text modules, user's KVTI code, and master databases
 * to output a single, complete JSON state object for the Comprehensive Report.
 * Ready to be ported to a Node.js backend.
 * 
 * @param {Object} passedState - The full state object passed from Result.jsx
 * @returns {Object} Structured report data containing summaryText, factorDetails, and topJobs.
 */
export function generateReportData(resultCode, passedState = null) {
    if (!resultCode || resultCode.length !== 3) {
        throw new Error("Invalid KVTI resultCode provided. Must be a 3-letter string.");
    }

    const kvtiUpper = resultCode.toUpperCase();
    const char1 = kvtiUpper.charAt(0); // Industry: I, B, D, M
    const char2 = kvtiUpper.charAt(1); // Style: A, C, P, E
    const char3 = kvtiUpper.charAt(2); // Culture: H, F

    const dashboardData = passedState?.dashboard || passedState?.reportData?.dashboard;

    // Extract dynamic variables from passedState safely with defaults
    const topJobName = dashboardData && dashboardData.recommended_jobs && dashboardData.recommended_jobs.length > 0
        ? (typeof dashboardData.recommended_jobs[0] === 'string' ? (E7_DB[dashboardData.recommended_jobs[0]]?.name_ko || dashboardData.recommended_jobs[0]) : dashboardData.recommended_jobs[0].title)
        : "핵심 직무";

    const majorName = passedState?.baseProfile?.major || "지원 전공";
    const univName = passedState?.baseProfile?.univ || "출신 대학";
    const userName = passedState?.baseProfile?.name || "지원자";
    const compScores = passedState?.diagnosis?.competence || { korean: 0, tech_skill: 0, major_expertise: 0 };
    const isFlexible = passedState?.diagnosis?.culture_fit?.risk_factors?.length > 0;
    const cultureScores = dashboardData?.scoreBreakdown?.culture || { H: 50, F: 50 };
    const topCultureVal = isFlexible ? cultureScores.F : cultureScores.H;
    const styleScores = dashboardData?.scoreBreakdown?.style || { A: 25, C: 25, P: 25, E: 25 };
    const styleVal = styleScores[char2] || 0;

    // 1. Generate Highly Personalized Summary Text (Prose) by appending to base dictionary
    const baseText1 = TRAIT_DICTIONARY[char2] || ""; // 업무 수행 스타일
    const baseText2 = TRAIT_DICTIONARY[char3] || ""; // 조직 문화 융화력
    const baseText3 = TRAIT_DICTIONARY[char1] || ""; // 최적합 산업 군

    // Personalization Appendages
    const personalizedText1 = `${baseText1}\n\n■ 💡 1:1 Personalized Consulting Report\nAccording to ${userName}'s trait comparison data, the expression rate of this style indicator (${TRAIT_TITLES[char2]}) reaches approximately ${Math.round(styleVal)}%. This means you have positioned clear strengths compared to the average international student. To strongly weaponize this advantage in practice, you must add 'provable hard skills'—such as OA, basic administrative skills (currently measured at an average of ${compScores.tech_skill} / 5.0), and certifications—to dramatically increase your resume passing rate for your primary target role, [${topJobName}].`;

    const personalizedText2 = `${baseText2}\n\n■ 💡 1:1 Personalized Consulting Report\nBased on your algorithmically diagnosed figures, ${userName} shows an extremely high suitability/acceptance rate of approximately ${Math.round(topCultureVal)}% for this organizational atmosphere. When faced with the common interview attack question, "Can you adapt to Korean corporate culture?", instead of a vague answer, defending yourself by stating, "Through my life and team projects at ${univName}, I have internalized ${isFlexible ? 'horizontal collaboration and proactivity' : 'respect for established rules and hierarchies'}" tailored to the application process, will instantly break down the psychological hurdles of companies hesitant to hire foreigners.`;

    const personalizedText3 = `${baseText3}\n\n■ 💡 1:1 Personalized Consulting Report\nUltimately, the entry barrier to this industry is determined by the ensemble of your chosen major's knowledge ([${majorName}], ${compScores.major_expertise} pts) and Korean communication skills (${compScores.korean} pts). Because this industry strictly requires business Korean with specialized terminology and practical major knowledge, we strongly recommend a strategy of upgrading your official TOPIK score and prioritizing an internship (D-2-4) in this industry to secure the Specific Activity (E-7) visa, rather than settling for your current level.`;

    const coreCode = kvtiUpper.substring(0, 3);
    const dictEntry = KVTI_DICTIONARY[coreCode] || KVTI_DICTIONARY[kvtiUpper];

    // Summary text generation moved to the end to utilize topJobs data

    // 2. Generate Factor Details (Deconstructed text for the Deep Dive section)
    const factorDetails = [
        {
            axisName: "1. Work Style",
            letter: char2,
            title: TRAIT_TITLES[char2] || char2,
            description: personalizedText1
        },
        {
            axisName: "2. Culture Fit",
            letter: char3,
            title: TRAIT_TITLES[char3] || char3,
            description: personalizedText2
        },
        {
            axisName: "3. Industry Preference",
            letter: char1,
            title: TRAIT_TITLES[char1] || char1,
            description: personalizedText3
        }
    ];

    // 3. Assemble Job & Visa Requirement Master Data using dynamic passed state if available
    let topJobs = [];

    if (dashboardData && dashboardData.recommended_jobs && dashboardData.recommended_jobs.length > 0) {
        // Use the strictly calculated dynamic data from MDJM Engine
        topJobs = dashboardData.recommended_jobs.filter(job => !job.isExtraTrack).slice(0, 3).map(jobStr => {
            const job = typeof jobStr === 'string' ? { code: jobStr, title: E7_DB[jobStr]?.name_ko || jobStr, readiness: 85 } : jobStr;
            const codeString = String(job.code);
            let name_ko = job.title;
            let name_en = E7_DB[codeString]?.name_en || "";

            let extractedCode = codeString;
            if (name_ko && name_ko.includes("숙련기능")) extractedCode = "E-7-4";

            const lawDefinition = E7_DESCRIPTIONS[extractedCode] || "A Specific Activity profession designated by the Minister of Justice, requiring specialized knowledge, technology, or skills to enhance national competitiveness through foreign talent introduction.";
            const visaRequirements = E7_REQUIREMENTS[extractedCode] || {
                education: "Must hold a Master's degree or higher in a relevant field, or possess a relevant Bachelor's degree along with at least 1 year of officially provable professional experience.",
                salary: "The contracted annual salary must obligatorily meet at least 80% of the previous year's Gross National Income (GNI) per capita announced by the Bank of Korea.",
                employer: "The principle of protecting national employment applies; visa issuance is only permitted within 20% of the total number of domestic employees insured by employment insurance at the hiring company."
            };

            // Extract newly designed advanced fields
            const advanceData = E7_REQUIREMENTS[extractedCode] || {};
            const specialNote = advanceData.special || `This ${extractedCode} occupation follows the Ministry of Justice's general guidelines for Specific Activity visas. Thus, verification of the major field requirement and the Korean employee protection ratio (20%) will strictly take place.`;
            const roadmapData = advanceData.roadmap || {
                certifications: ["National technical/professional certifications relevant to the target role"],
                tools: ["Standard software/equipment capabilities required for the field"],
                portfolio: ["Practical project and performance portfolio in the related area"]
            };

            // Use the algorithmic score passed from the logic engine
            const exactScore = job.readiness || 80;

            return {
                code: codeString,
                visaType: extractedCode === "E-7-4" ? "E-7-4 Skilled Worker" : "E-7-1 Professional",
                title_ko: name_ko,
                title_en: name_en,
                readiness: exactScore,
                lawDefinition: lawDefinition,
                visaRequirements: visaRequirements,
                specialNote: specialNote,
                certifications: roadmapData.certifications?.length > 0 ? roadmapData.certifications : ["Nationally recognized technical/professional licenses or global certifications that strongly prove expertise in the relevant field"],
                tools: roadmapData.tools?.length > 0 ? roadmapData.tools : ["Core software and equipment operating tech stacks that prove immediate readiness for field deployment upon hiring"],
                portfolio: roadmapData.portfolio?.length > 0 ? roadmapData.portfolio : ["Concrete and empirical project deliverables capable of simultaneously persuading immigration officers and corporate HR managers"],
                requiredCompetencies: [
                    "Advanced business Korean proficiency for smooth communication with immigration officers and domestic team members (TOPIK Level 4 or higher recommended)",
                    "Building a resume and portfolio demonstrating internship (D-2-4) or field practicum/experience that exactly matches the Special Activity (E-7) target field during undergraduate years"
                ]
            };
        });
    } else {
        // Absolute fallback ONLY if data is totally missing (should be prevented by UI guards)
        const coreCode = kvtiUpper.substring(0, 3);
        const dictionaryEntry = KVTI_DICTIONARY[coreCode] || KVTI_DICTIONARY[kvtiUpper];
        const recommendedJobCodes = dictionaryEntry && dictionaryEntry.career_paths
            ? dictionaryEntry.career_paths.slice(0, 3)
            : ["2742", "2731", "2629"];

        topJobs = recommendedJobCodes.map(codeString => {
            const jobInfo = E7_DB[codeString] || E7_DB[parseInt(codeString)];
            let name_ko = jobInfo ? jobInfo.name_ko.split('(')[0].trim() : "추천 직무";
            let name_en = jobInfo ? jobInfo.name_en : "";

            let extractedCode = codeString;
            if (name_ko.includes("숙련기능")) extractedCode = "E-7-4";

            const lawDefinition = E7_DESCRIPTIONS[extractedCode] || "A Specific Activity profession designated by the Minister of Justice, requiring specialized knowledge, technology, or skills to enhance national competitiveness through foreign talent introduction.";
            const visaRequirements = E7_REQUIREMENTS[extractedCode] || {
                education: "Must hold a Master's degree or higher in a relevant field, or possess a relevant Bachelor's degree along with at least 1 year of officially provable professional experience.",
                salary: "The contracted annual salary must obligatorily meet at least 80% of the previous year's Gross National Income (GNI) per capita announced by the Bank of Korea.",
                employer: "The principle of protecting national employment applies; visa issuance is only permitted within 20% of the total number of domestic employees insured by employment insurance at the hiring company."
            };

            // Extract advanced fields
            const advanceData = E7_REQUIREMENTS[extractedCode] || {};
            const specialNote = advanceData.special || `This ${extractedCode} occupation follows the Ministry of Justice's general guidelines for Specific Activity visas. Thus, verification of the major field requirement and the Korean employee protection ratio (20%) will strictly take place.`;
            const roadmapData = advanceData.roadmap || {
                certifications: ["National technical/professional certifications relevant to the target role"],
                tools: ["Standard software/equipment capabilities required for the field"],
                portfolio: ["Practical project and performance portfolio in the related area"]
            };

            return {
                code: codeString,
                visaType: extractedCode === "E-7-4" ? "E-7-4 Skilled Worker" : "E-7-1 Professional",
                title_ko: name_ko,
                title_en: name_en,
                readiness: 75, // Flat 75% for hard fallback
                lawDefinition: lawDefinition,
                visaRequirements: visaRequirements,
                specialNote: specialNote,
                certifications: roadmapData.certifications || [],
                tools: roadmapData.tools || [],
                portfolio: roadmapData.portfolio || [],
                requiredCompetencies: [
                    "Advanced business Korean proficiency for smooth communication with immigration officers and domestic team members (TOPIK Level 4 or higher recommended)",
                    "Building a resume and portfolio demonstrating internship (D-2-4) or field practicum/experience that exactly matches the Special Activity (E-7) target field during undergraduate years"
                ]
            };
        });
    }

    // topJobs is an array of objects like { code: "2742", title: "해외 영업원", ... } or just raw items
    // If the title_ko is missing, we should look it up from E7_DB to avoid generic "1순위 직무" placeholders.
    const getJobName = (index, fallback) => {
        const job = topJobs[index];
        if (!job) return fallback;
        if (job.title_en) return job.title_en;
        if (job.title_ko) return job.title_ko;
        if (job.title) return job.title; // fallback
        if (job.code && E7_DB[job.code]) return E7_DB[job.code].name_en || E7_DB[job.code].name_ko;
        return fallback;
    }

    const job1 = getJobName(0, "Primary Target Role");
    const job2 = getJobName(1, "Related Role");
    const job3 = getJobName(2, "Potential Role");

    const vitalityIndex = dashboardData?.careerVitalityIndex || 85;
    const matchingScore = dashboardData?.mdjm_raw_results?.[0] ? Math.round(dashboardData.mdjm_raw_results[0].similarity * 100) : 85;

    // --- ALGORITHMIC DATA EXTRACTION ---
    // 1. RIASEC Engine Data
    const rawRiasec = dashboardData?.riasec_code || 'E';
    const maxRiasecKey = rawRiasec.charAt(0);
    const riasecMap = { R: 'Realistic(R)', I: 'Investigative(I)', A: 'Artistic(A)', S: 'Social(S)', E: 'Enterprising(E)', C: 'Conventional(C)' };

    // 2. Industry Preferences Array
    const indScores = dashboardData?.scoreBreakdown?.industry || { IT: 25, BIZ: 25, DES: 25, MFG: 25 };
    const sortedInd = Object.entries(indScores).sort((a, b) => b[1] - a[1]);
    const topIndKey = sortedInd[0]?.[0] || 'BIZ';
    const topIndVal = sortedInd[0]?.[1] || 40;
    const secondIndKey = sortedInd[1]?.[0] || 'IT';
    const secondIndVal = sortedInd[1]?.[1] || 25;
    const indNameMap = { IT: 'IT/Tech', BIZ: 'Business/Management', DES: 'Design/Media', MFG: 'Manufacturing/Engineering' };

    // 2.5 Work Style Preferences Array
    const sortedStyle = Object.entries(styleScores).sort((a, b) => b[1] - a[1]);
    const topStyleKey = sortedStyle[0]?.[0] || 'A';
    const topStyleVal = sortedStyle[0]?.[1] || 40;
    const secondStyleKey = sortedStyle[1]?.[0] || 'C';
    const secondStyleVal = sortedStyle[1]?.[1] || 25;
    const styleNameMap = { A: 'Analysis & Planning (A)', C: 'Creativity & Ideation (C)', P: 'Field & Execution (P)', E: 'Leadership & Enterprise (E)' };

    // 3. Competence engine
    const comp = passedState?.diagnosis?.competence || { korean: 0, tech_skill: 0, major_expertise: 0 };

    let dictDesc = dictEntry ? dictEntry.description : "Evaluated as a talent possessing both flexibility and creativity.";

    // Vitality Index Interpretation
    let vitalityInterpretation = "";
    if (vitalityIndex >= 80) {
        vitalityInterpretation = "Establishment Phase (80+ pts), indicating you possess highly firm values and clear certainty regarding your career direction. Having a distinct goal is a very positive indicator, meaning you are ready to take immediate job-hunting actions.";
    } else if (vitalityIndex >= 60) {
        vitalityInterpretation = "Stable Phase (60+ pts), showing your overall career goals and motivations are well-set. Since the broad direction is established, pinpointing specific roles will lead to excellent results.";
    } else if (vitalityIndex >= 40) {
        vitalityInterpretation = "Exploration Phase (40+ pts), demonstrating a natural stage of flexibly contemplating various possibilities rather than fixing a single path yet. Exploring roles suited for you should precede building arbitrary specs.";
    } else {
        vitalityInterpretation = "Re-establishment Phase (Under 40 pts), revealing you are in the process of narrowing down possibilities and finding certainty. This is not a dangerous state; it means you need time to deeply explore different options to discover your genuine interests and values before hastily applying.";
    }

    // --- DYNAMIC REPORT TEXT GENERATION ---
    const text1_title = `[1. Comprehensive Opinion]`;
    const text1_content = `As a result of analyzing tens of thousands of data patterns, ${userName}'s highest trait emerged as '${dictEntry ? dictEntry.title : "Hybrid Potential Talent"}' (${kvtiUpper}). This result is deeply related to ${userName} showing the most prominent score in the '${riasecMap[maxRiasecKey] || 'Selected'}' trait during the RIASEC Vocational Interest Test, the core of our engine. According to the algorithm's overall scale fusion analysis: ${dictDesc}`;

    const text2_title = `[2. Career Distinctness]`;
    const text2_content = `The 'Career Distinctness' score, quantifying the degree of conviction in your vocational values and goals, was calculated at ${vitalityIndex} points (out of 100). This indicates the ${vitalityInterpretation}`;

    const text3_title = `[3. Industry-Role Matching (MDJM Algorithm)]`;
    const text3_content = `When the MDJM (Multi-Dimensional Job Matching) engine analyzed the detailed stats of ${userName}'s target industry preferences, the preference for the '${indNameMap[topIndKey] || "Relevant Industry"}' sector was measured highest at ${Math.round(topIndVal)}% among all industries, showing a hybridized tendency synergizing with the 2nd priority '${indNameMap[secondIndKey]}' sector (${Math.round(secondIndVal)}%). Showing such concentrated figures in specific areas means that the work environment elements and risks of those fields stably and positively intersect with ${userName}'s usual traits.\n\nBased on this, we mathematically compared the overall detailed job requirements of the Ministry of Justice E-7 visa with ${userName}'s data. Considering both academic background ([${majorName}]) and industry/role trait suitability, the trait match rate with the #1 ranked '${job1}' role reaches approximately ${matchingScore}%. This is the algorithmic basis judging that upon entering the practical environment, this role can provide ${userName} with higher value fulfillment and immersion than any other role.`;

    const text4_title = `[4. Work Style Detail]`;
    const text4_content = `Breaking down the Work Style stats, the '${styleNameMap[topStyleKey]}' trait appeared most prominently at ${Math.round(topStyleVal)}%, supported next by the '${styleNameMap[secondStyleKey]}' trait (${Math.round(secondStyleVal)}%). The combination of Career Distinctness and these work styles designates the most solid goals and well-fitting roles for you in the workplace.`;

    const text5_title = `[5. Organizational Culture Fit]`;
    const text5_content = `According to the Culture Fit preference stats, ${userName} shows a distinctly high interaction preference of a whopping ${Math.round(topCultureVal)}% towards a ${isFlexible ? "flexible organization that values 'horizontal communication' and 'autonomy'" : "hierarchical organization based on 'systematic manuals' and 'stability'"}. Therefore, when setting future company targets, strategically prioritizing ${isFlexible ? "venture/innovative cultures like startups, foreign companies (MNCs), or agile agencies" : "large corporations, mid-sized enterprises, or stable organizations with traditional systems"}, regardless of company size, will grant you an overwhelming psychological and operational advantage.`;

    const text6_title = `[6. Practical Competence Analysis (Soft Spec)]`;
    const text6_content = `Going beyond simple traits, the 'Practical Competence' analysis measuring adaptability in actual Korean corporate environments derived the following raw scores:\n\n* Korean & Business Communication: Average ${comp.korean} (Out of 5.0)\n* Major Field Hard Skills: Average ${comp.major_expertise} (Out of 5.0)\n* OA & Basic Administration: Average ${comp.tech_skill} (Out of 5.0)\n\n※ Note: As this analysis is based on diagnostic Soft Specs, practical proof via Hard Specs—such as official TOPIK levels or major-related certifications—must necessarily accompany this to hold validity in the actual job market and residency visa screening.`;

    const text7_title = `[7. Strategic Roadmap Guidelines]`;
    const text7_content = `We recommend adopting the algorithmically generated '${job1}' as your core target track (Plan A), while keeping '${job2}' and '${job3}' in sight as associated competencies (Plan B). If you maximize your diagnosed core strengths and continuously supplement lacking communication skills or hard specs, you will undoubtedly build a clear position for yourself in the Korean employment market. Detailed role-matching results can be validated below in the 'E-7 Job Match Recommendations'.`;

    const summaryText = `${text1_title}\n${text1_content}\n\n${text2_title}\n${text2_content}\n\n${text3_title}\n${text3_content}\n\n${text4_title}\n${text4_content}\n\n${text5_title}\n${text5_content}\n\n${text6_title}\n${text6_content}\n\n${text7_title}\n${text7_content}`;

    // Structured Array for UI component mapping (Robust vs String parsing)
    const comprehensiveOpinion = [
        {
            id: 'opinion',
            title: text1_title,
            content: text1_content
        },
        {
            id: 'vitality',
            title: text2_title,
            content: text2_content
        },
        {
            id: 'industry',
            title: text3_title,
            content: text3_content
        },
        {
            id: 'style',
            title: text4_title,
            content: text4_content
        },
        {
            id: 'culture',
            title: text5_title,
            content: text5_content
        },
        {
            id: 'competence',
            title: text6_title,
            content: text6_content
        },
        {
            id: 'roadmap',
            title: text7_title,
            content: text7_content
        }
    ];

    // 4. Return Final Data Structure
    return {
        kvtiCode: kvtiUpper,
        personaTitle: dictEntry ? dictEntry.title : "융합형 잠재 인재",
        summaryText: summaryText,
        comprehensiveOpinion: comprehensiveOpinion,
        factorDetails: factorDetails,
        topJobs: topJobs
    };
}
