import { calculateKvtiResult } from './src/utils/kvtiLogic.js';
import { generateReportData } from './src/utils/reportGenerator.js';

const mockAnswers = {
    // some fake answers
    "R_01": 5, "I_01": 5, "I_02": 4, "A_01": 1,
    "IND_I_01": 5, "IND_I_02": 5,
    "korean_1": 4, "korean_2": 5,
    "CMP_WAGE_01": 4
};

const mockProfile = {
    name: 'TestUser',
    age: 25,
    nationality: 'Vietnam',
    region: '서울',
    university: '서울대학교',
    major: '소프트웨어공학',
    grade: '3학년',
    topik: '5',
    kiip: '4',
    secondaryLanguages: []
};

// 1. Run Core Logic
const resultState = calculateKvtiResult(mockAnswers, 'senior', mockProfile);

// 2. Generate Report Data
const reportData = generateReportData(resultState.dashboard.kvti_code.substring(0, 3), { reportData: resultState });

console.log("=== DYNAMIC REPORT TEXT TEST ===");
console.log(reportData.summaryText);
