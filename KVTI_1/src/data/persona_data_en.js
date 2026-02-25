export const CACHE_BUSTER = 1;
export const E7_DB = {
    // IT & Tech
    "2223": {
        code: "2223",
        name_ko: "Web Developer",
        desc: "An expert who designs and builds frontend/backend systems for websites and mobile applications.",
        req: {
            degree: "Bachelor (Relevant Major)",
            wage: "GNI x 80% (approx. 32M KRW)",
            major: ["Computer Science", "Software Engineering"],
            korean: 2 // Preferred but not strict if wage is high
        },
        hot_skills: ["React", "Node.js", "AWS", "TypeScript"],
        ideal_traits: { R: 0.1, I: 1.0, A: 0.2, S: 0.1, E: 0.4, C: 0.8, IT: 1.0, BIZ: 0.2, DES: 0.4, MFG: 0.1 }
    },
    "2224": {
        code: "2224",
        name_ko: "App Developer",
        desc: "An expert who develops applications for PC and mobile devices.",
        req: { degree: "Bachelor", wage: "GNI x 80%", major: ["CS", "IT"], korean: 2 },
        hot_skills: ["Flutter", "Kotlin", "Swift", "Unity"],
        ideal_traits: { R: 0.2, I: 1.0, A: 0.3, S: 0.2, E: 0.5, C: 0.7, IT: 1.0, BIZ: 0.3, DES: 0.5, MFG: 0.1 }
    },
    "2211": {
        code: "2211",
        name_ko: "System SW Developer",
        desc: "A highly challenging technical role handling OS, firmware, embedded systems, etc.",
        req: { degree: "Bachelor", wage: "GNI x 80%", major: ["EE", "CS"], korean: 2 },
        hot_skills: ["C/C++", "Linux", "Embedded", "RTOS"],
        ideal_traits: { R: 0.6, I: 1.0, A: 0.1, S: 0.1, E: 0.2, C: 0.9, IT: 1.0, BIZ: 0.1, DES: 0.0, MFG: 0.8 }
    },

    // Business & Trade
    "2742": {
        code: "2742",
        name_ko: "Overseas Sales",
        desc: "Sells Korean corporate products to overseas buyers and finalizes export contracts.",
        req: {
            degree: "Bachelor",
            wage: "GNI x 80%",
            major: ["Business", "Language", "Economics"],
            korean: 4 // High proficiency required
        },
        hot_skills: ["Business English", "Trading Laws", "Communication"],
        ideal_traits: { R: 0.1, I: 0.3, A: 0.2, S: 0.8, E: 1.0, C: 0.6, IT: 0.2, BIZ: 1.0, DES: 0.1, MFG: 0.2 }
    },
    "2731": {
        code: "2731",
        name_ko: "Merchandiser",
        desc: "Analyzes market trends to plan and launch competitive new products.",
        req: { degree: "Bachelor", wage: "GNI x 80%", major: ["Marketing", "Business"], korean: 4 },
        hot_skills: ["Market Research", "Trend Analysis", "Planning"],
        ideal_traits: { R: 0.1, I: 0.6, A: 0.5, S: 0.6, E: 0.9, C: 0.7, IT: 0.4, BIZ: 1.0, DES: 0.4, MFG: 0.1 }
    },
    "2733": {
        code: "2733",
        name_ko: "Marketing Specialist",
        desc: "Formulates strategies to increase brand awareness and attract customers.",
        req: { degree: "Bachelor", wage: "GNI x 80%", major: ["Advertising", "Business"], korean: 4 },
        hot_skills: ["Digital Marketing", "SEO/SEM", "Content Strategy"],
        ideal_traits: { R: 0.1, I: 0.5, A: 0.8, S: 0.7, E: 0.8, C: 0.4, IT: 0.5, BIZ: 1.0, DES: 0.6, MFG: 0.1 }
    },

    // Design & Creative
    "2855": {
        code: "2855",
        name_ko: "UI/UX Designer",
        desc: "Designs web and app interfaces considering user experience (UX).",
        req: { degree: "Bachelor", wage: "GNI x 80%", major: ["Design", "Art"], korean: 3 },
        hot_skills: ["Figma", "Adobe Suite", "Prototyping"],
        ideal_traits: { R: 0.2, I: 0.5, A: 1.0, S: 0.4, E: 0.4, C: 0.3, IT: 0.8, BIZ: 0.3, DES: 1.0, MFG: 0.1 }
    },
    "2841": {
        code: "2841",
        name_ko: "Product Designer",
        desc: "Designs the exterior considering both function and aesthetics of the product.",
        req: { degree: "Bachelor", wage: "GNI x 80%", major: ["Industrial Design"], korean: 3 },
        hot_skills: ["3D Rendering", "CAD", "Material Sense"],
        ideal_traits: { R: 0.6, I: 0.4, A: 1.0, S: 0.2, E: 0.3, C: 0.5, IT: 0.2, BIZ: 0.2, DES: 1.0, MFG: 0.8 }
    },

    // Manufacturing & Engineering
    "2351": {
        code: "2351",
        name_ko: "Mechanical Engineer",
        desc: "Designs and develops machinery or equipment and manages production processes.",
        req: { degree: "Bachelor", wage: "GNI x 80%", major: ["Mechanical Eng."], korean: 3 },
        hot_skills: ["AutoCAD", "SolidWorks", "CATIA"],
        ideal_traits: { R: 1.0, I: 0.8, A: 0.2, S: 0.1, E: 0.3, C: 0.8, IT: 0.3, BIZ: 0.1, DES: 0.3, MFG: 1.0 }
    },
    "2352": {
        code: "2352",
        name_ko: "Robotics Engineer",
        desc: "Researches and develops industrial robots or automation systems.",
        req: { degree: "Bachelor", wage: "GNI x 80%", major: ["Robotics", "Mechatronics"], korean: 3 },
        hot_skills: ["ROS", "PLC", "Motion Control"],
        ideal_traits: { R: 0.9, I: 1.0, A: 0.1, S: 0.1, E: 0.2, C: 0.8, IT: 0.7, BIZ: 0.1, DES: 0.1, MFG: 1.0 }
    },
    // 🚀 Non-E-7 Special Paths (Startup & Freelance & Fast Track & Regional)
    "D84_STARTUP": {
        code: "D-8-4",
        name_ko: "Tech Startup Founder",
        desc: "An innovator leading a business by directly establishing a corporation in Korea with original ideas and technology.",
        req: {
            degree: "Irrelevant (OASIS required if Bachelor or below)",
            wage: "Irrelevant (Initial investment and item screening)",
            major: ["All Majors"],
            korean: 3
        },
        hot_skills: ["OASIS Startup Visa Program", "Business Model", "Investment Pitch"],
        ideal_traits: { R: 0.3, I: 0.8, A: 0.7, S: 0.5, E: 1.0, C: 0.1, IT: 0.8, BIZ: 0.9, DES: 0.6, MFG: 0.4 }
    },
    "F27S_KSTAR": {
        code: "F-2-7S",
        name_ko: "K-STAR Outstanding Talent",
        desc: "A graduate of top domestic universities holding the potential to bypass complex E-7 salary requirements directly for a 5-year resident visa.",
        req: {
            degree: "Regular Bachelor or above from designated outstanding domestic universities",
            wage: "Relaxed income proof (Replaced by President's Recommendation)",
            major: ["Irrelevant (STEM preferred)"],
            korean: 0 // Exempt or points combined
        },
        hot_skills: ["President's Recommendation (K-STAR)", "Outstanding Academic Grades", "3+ years stay in Korea"],
        ideal_traits: { R: 0.5, I: 1.0, A: 0.5, S: 0.5, E: 0.8, C: 0.8, IT: 0.8, BIZ: 0.6, DES: 0.5, MFG: 0.7 }
    },
    "F2R_REGION": {
        code: "F-2-R",
        name_ko: "Region-Specific Outstanding Talent",
        desc: "A realistic strategist making direct contributions to industries in population-declining regions, securing a stable 5-year resident visa.",
        req: {
            degree: "Graduation from universities within requested regions or domestic Associate degree and above",
            wage: "GNI 70% or Minimum Wage and above",
            major: ["Majors related to key regional industries preferred"],
            korean: 3 // TOPIK 3 or KIIP level 3 required
        },
        hot_skills: ["Mayor/Governor's Recommendation", "Korean (TOPIK 3+)", "Actual Residence in Region"],
        ideal_traits: { R: 0.8, I: 0.4, A: 0.2, S: 0.8, E: 0.5, C: 0.9, IT: 0.3, BIZ: 0.5, DES: 0.2, MFG: 0.9 }
    },
    "F1D_NOMAD": {
        code: "F-1-D / F-2-7",
        name_ko: "Freelancer / Digital Nomad",
        desc: "An independent professional working remotely without corporate ties, or contracting with multiple clients based on specialized skills.",
        req: {
            degree: "Bachelor",
            wage: "GNI x 2+ (F-1-D) or passing point system limit (F-2-7)",
            major: ["IT", "Design", "Translation"],
            korean: 4
        },
        hot_skills: ["Remote Work", "Self-Branding", "Taxation", "Networking"],
        ideal_traits: { R: 0.2, I: 0.7, A: 0.9, S: 0.3, E: 0.8, C: 0.2, IT: 0.9, BIZ: 0.5, DES: 0.8, MFG: 0.1 }
    }
};
export const KVTI_32_PERSONAS = {
    "IAH": "AI/Data Researcher",
    "BAH": "Market Researcher",
    "DAH": "UX Researcher",
    "MAH": "R&D Researcher",
    "IAF": "Data Analyst",
    "BAF": "Growth Hacker",
    "DAF": "UX Analyst",
    "MAF": "R&D Innovator",

    "ICH": "Creative Director",
    "BCH": "Brand Marketer",
    "DCH": "Industrial Designer",
    "MCH": "Product Designer",
    "ICF": "UI/UX Publisher",
    "BCF": "Content Marketer",
    "DCF": "K-Design Innovator",
    "MCF": "Industrial Artist",

    "IEH": "IT Project Manager",
    "BEH": "Global Sales/CS",
    "DEH": "Service Planner",
    "MEH": "Plant/Safety Manager",
    "IEF": "IT Startup Founder",
    "BEF": "K-Business Leader",
    "DEF": "Creative Leader",
    "MEF": "Startup Process Manager",

    "IPH": "System Maintenance (QA)",
    "BPH": "Trade Administration Manager",
    "DPH": "Practical/Product Designer",
    "MPH": "Production Manager (QC)",
    "IPF": "Full-Stack/Web Developer",
    "BPF": "Technical Sales Specialist",
    "DPF": "Product Engineer",
    "MPF": "K-Tech Maestro"
};

export const detectIndustry = (industryId, jobId, indText, jobText) => {
    // Map IDs to Industry Types
    // IND_I = IT, IND_M = MFG, IND_C = DES, IND_B = BIZ, IND_T = BIZ, IND_S = SER, IND_L = LOC
    // JP_I = IT, JP_R = MFG, JP_A = DES, JP_E = BIZ, JP_S = BIZ, JP_C = BIZ, JP_X = SER, JP_Y = LOC

    const idStr = (industryId || "") + "_" + (jobId || "");

    if (idStr.includes('IND_I') || idStr.includes('JP_I')) return 'IT';
    if (idStr.includes('IND_C') || idStr.includes('JP_A')) return 'DES';
    if (idStr.includes('IND_M') || idStr.includes('JP_R')) return 'MFG';
    if (idStr.includes('IND_S') || idStr.includes('JP_X')) return 'SER'; // Phase 2: Service/Tourism
    if (idStr.includes('IND_L') || idStr.includes('JP_Y')) return 'LOC'; // Phase 2: Local Specialization
    if (idStr.includes('IND_T') || idStr.includes('IND_B') || idStr.includes('JP_E') || idStr.includes('JP_S') || idStr.includes('JP_C')) return 'BIZ';

    // Fallback: search text just in case (e.g. legacy compatibility)
    const s = (indText || "") + (jobText || "");
    if (s.includes('개발') || s.includes('IT') || s.includes('데이터') || s.includes('Developer') || s.includes('Data')) return 'IT';
    if (s.includes('디자인') || s.includes('예술') || s.includes('콘텐츠') || s.includes('Design') || s.includes('Art')) return 'DES';
    if (s.includes('제조') || s.includes('기계') || s.includes('생산') || s.includes('Manufacture') || s.includes('Mechanical')) return 'MFG';

    // Default fallback based on commonality
    return 'BIZ';
};
