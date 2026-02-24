import { KVTI_DICTIONARY } from '../data/kvti_dictionary.js';
import { E7_DESCRIPTIONS } from '../data/e7_official_descriptions.js';
import { E7_REQUIREMENTS } from '../data/e7_requirements.js';
import { E7_DB } from '../data/persona_data.js';

/**
 * TRAIT_DICTIONARY
 * Deep analytical descriptions for each of the 10 KVTI letters.
 * Used for the "세부 지표(Factor) 분해능 해석" section to provide consulting-grade details.
 */
const TRAIT_DICTIONARY = {
    // 1st Letter: Work Style
    "A": "■ 핵심 역량 (Core Competency)\n데이터와 팩트를 기반으로 합리적이고 객관적인 결정을 내리는 '분석적 사고' 최상위 수준입니다. 불확실성 속에서도 명확한 인과관계를 찾아내며, 리스크를 사전에 식별하고 통제하는 환경에서 압도적인 퍼포먼스를 발휘합니다.\n\n■ 행동 패턴 및 강점\n감정이나 직관보다는 논리적 근거를 우선시하며, 엑셀, 데이터베이스, 재무제표 등 정량적 지표를 다루는 데 피로감을 느끼지 않습니다. 조직의 비용을 절감하고 공정을 최적화하는 데 기여합니다.\n\n■ 커리어 어드바이스\n숫자와 로직으로 설득할 수 있는 데이터 구조화 역량(SQL, 파이썬 등)을 하드 스펙으로 추가한다면, 단순 기획자를 넘어 전략 컨설턴트나 데이터 애널리스트로서 한국 시장에서 독보적인 경쟁력을 갖출 수 있습니다.",
    "C": "■ 핵심 역량 (Core Competency)\n정해진 틀과 관습을 깨고 직관과 창의성을 바탕으로 무에서 유를 창출하는 '아이데이션(Ideation)' 역량이 탁월합니다. 트렌드 변화에 민감하며, 시장이나 타겟 고객에게 매력적인 인사이트를 던지는 크리에이터 기질을 띱니다.\n\n■ 행동 패턴 및 강점\n반복적이고 기계적인 업무보다는 새로운 프로젝트를 기획하거나 디자인, 콘텐츠를 생산하는 환경에서 동기부여를 얻습니다. 남들이 보지 못하는 미학적, 기획적 연결고리를 발견하는 데 능합니다.\n\n■ 커리어 어드바이스\n아이디어를 현실로 구현할 수 있는 최신 실행 도구(Figma, 3D 모델링, 영상 편집 등) 활용 능력을 포트폴리오로 증명해야 합니다. 추상적인 기획안을 비즈니스 언어로 번역하는 연습이 성공적인 취업의 열쇠입니다.",
    "P": "■ 핵심 역량 (Core Competency)\n추상적인 이론이나 탁상공론보다는 실제 현장(Field)과 실무에서 직접 몸으로 부딪히며 문제를 해결하는 '실용주의 현장형' 인재입니다. 상황 변화에 대한 대처 능력이 뛰어나며 즉각적인 결과물을 요하는 업무에 극도록 강합니다.\n\n■ 행동 패턴 및 강점\n긴급한 이슈가 발생했을 때 누구보다 빠르게 손과 발을 움직여 트러블슈팅(Troubleshooting)을 해냅니다. 기술 셋업, 현장 인력 통솔, 무역 또는 영업 최전선 등 생동감 넘치는 환경에서 진가를 발휘합니다.\n\n■ 커리어 어드바이스\n현장에서의 감각을 시스템 메뉴얼이나 보고서 형태로 체계화하는 연습이 필요합니다. 실무 경험에 관리자로서의 문서화 역량을 더한다면, 단기 실무자를 넘어 장기적인 현장 오퍼레이션 총괄 매니저로 성장할 수 있습니다.",
    "E": "■ 핵심 역량 (Core Competency)\n도전적이고 진취적인 자세로 타인을 설득하고 한 팀을 목표로 이끄는 타고난 '엔터프라이즈 리더십'을 갖추었습니다. 불확실한 사업 영역에서도 결단력 있게 프로젝트를 앞장서 추진하는 강력한 돌파력이 특징입니다.\n\n■ 행동 패턴 및 강점\n협상 테이블과 비즈니스 커뮤니케이션에서 주도권을 잡는 데 능합니다. 사람과 자본을 동원하여 새로운 비즈니스 파이프라인을 구축하거나 글로벌 확장을 기획·실행하는 매니지먼트 및 사업개발 직무에 적합합니다.\n\n■ 커리어 어드바이스\n넘치는 추진력이 때로는 세부 디테일을 놓치는 결과로 이어질 수 있습니다. 재무적 단가 타당성 검토(Feasibility Study)나 꼼꼼한 실무 지식을 보완해주는 도구를 활용한다면 본인의 강력한 에너지 시너지가 극대화됩니다.",

    // 2nd Letter: Organizational Culture Fit
    "H": "■ 핵심 역량 (Core Competency)\n체계적인 내부 매뉴얼, 명확한 위계질서, 그리고 예측 가능한 시스템이 갖춰진 조직에서 톱니바퀴처럼 완벽한 최고 효율을 내는 '시스템 수호자'입니다. 룰을 준수하고 책임감 있게 직무를 100% 완수해 내는 높은 직업적 신뢰성을 자랑합니다.\n\n■ 행동 패턴 및 강점\n주어진 R&R(역할과 책임)의 한계를 명확히 이해하고, 타 부서와의 업무 조율 시 사내 규정을 기반으로 꼼꼼하게 일처리를 합니다. 전통적인 대기업, 공공기관 파트너, 금융권 등 안정성이 최우선인 거대 조직에서 빛을 발합니다.\n\n■ 커리어 어드바이스\n한국의 전통적인 대기업 문서 문화(기안서, 품의서 등)와 수직적 보고 체계에 대한 이해도를 어필하면 면접관들에게 대단히 긍정적인 평가를 받습니다. 변동성이 지나치게 큰 초기 스타트업보다는 성숙한 중견 기업 이상을 타겟팅하십시오.",
    "F": "■ 핵심 역량 (Core Competency)\n보수적인 위계질서에 얽매이기보다는 개인의 자율성이 완벽히 보장되고 의견을 수평적으로 피드백하는(Flat Hierarchy) 조직에서 폭발적인 성장을 이뤄내는 역동적 인재입니다. 자기 주도적이고 목표(결과물) 중심적인 업무 처리에 강합니다.\n\n■ 행동 패턴 및 강점\n상사의 구체적인 지시를 기다리기보다 '무엇을 달성할 것인가' 스스로 과제를 찾고 솔루션을 도출해냅니다. 애자일(Agile) 조직, 슬랙 중심의 비동기적 소통, 원격 및 하이브리드 근무 형태에 최적화되어 스트레스 없이 역량을 발휘합니다.\n\n■ 커리어 어드바이스\n실내 조직 정치가 없는 대신 철저히 실력과 결과물로 본인의 가치를 증명해야 하므로, 명확한 포트폴리오, Github, 프로젝트 기여도 데이터가 취업의 당락을 가릅니다. 혁신적인 IT 기업이나 외국계(MNC), 로컬 유니콘 스타트업을 우선하십시오.",

    // 3rd Letter: Industry Preference
    "I": "■ 산업 적합도 (Industry Fit) & 생태계 이해도\nIT, 소프트웨어, 인공지능, 테크놀로지 등 기술의 진보가 산업 패러다임을 통째로 이끄는 지식 집약적 IT 환경에 깊은 흥미를 가집니다. 기술 혁신 속도가 가장 빠른 시장에서 방대한 기술 문서와 새로운 기술 스택을 빠르게 습득하는 데 거부감이 없습니다.\n\n■ 장기 발전 방향\n단순 코더를 넘어, 기술 기반 비즈니스를 주도하는 시대의 흐름에 발맞추십시오. '비즈니스 언어로 기술의 한계를 통역하는 소통 능력'을 갖춘다면 개발, 데이터 분석, IT기획 전반을 아우르는 글로벌(Global) 대체 불가 인력으로 우뚝 설 수 있습니다.",
    "B": "■ 산업 적합도 (Industry Fit) & 생태계 이해도\n무역, 마케팅, 경영 컨설팅, 구매, 커머스 등 사람과 상품, 그리고 자본이 교환되며 거대한 부를 창출하는 전통적 상경(Business) 생태계에 탁월한 체질적 본능을 지녔습니다. 이윤 추구와 시장 점유율 확보라는 자본주의 기업의 본질적 목표에 100% 공감합니다.\n\n■ 장기 발전 방향\n해외 유학생이라는 다문화 글로벌 인사이트의 강점에 B2B 파트너 네트워크 개척 능력, 무역 규정 이해, 재무적 엑셀 분석력 등 솔리드한 역량을 증빙하시기 바랍니다. 이를 통해 글로벌 수출입 전략 기획자나 B2B 무역 어카운트 총괄 담당자로 성장할 수 있습니다.",
    "D": "■ 산업 적합도 (Industry Fit) & 생태계 이해도\n시각 디자인, 공간 환경, 방송 엔터테인먼트, 뉴미디어 콘텐츠 제작 등 미학적 감각과 밀레니얼 대중 문화 트렌드를 리드하는 크리에이티브 미디어 산업군이 당신의 진짜 무대입니다. 높은 문화적 감수성을 바탕으로 유저의 감성을 자극하는 부가가치를 만들어냅니다.\n\n■ 장기 발전 방향\n단순한 시각적 예쁨에만 집중하는 것이 아닌, 철저한 UX/UI 설계 방법론(User Experience), 유통 마케팅 퍼널(Funnel) 이해도를 당신의 재능에 화학적으로 결합하십시오. 상업 데이터 트렌드를 분석하는 실무형 아트 디렉터로 커리어를 확고히 할 수 있습니다.",
    "M": "■ 산업 적합도 (Industry Fit) & 생태계 이해도\n반도체 장비, 자동차 부품 생산, 전기차 배터리, 정밀화학 등 국가 핵심 부가가치의 원천이 되는 물리적 제품을 다루고 공정을 엔지니어링하는 이른바 뿌리 산업군(Manufacturing / Root Industry) 생태계에 최적화된 귀중한 적성입니다.\n\n■ 장기 발전 방향\n대한민국 수출 경제의 확고한 허리 역할을 하는 이 분야에서는 글로벌 품질 관리 규격(ISO), 스마트 팩토리 공정 지식, 그리고 설비 유지보수에 대한 하드 스킬이 생존의 무기가 됩니다. 기계 공학적 이해를 바탕으로 외국인 특례 비자 발급이 가장 활발한 생산 엔지니어 파트에서 강점을 증명해 보십시오."
};

const TRAIT_TITLES = {
    "A": "분석/관리 (Analyze)",
    "C": "창조/직관 (Create)",
    "P": "현장/실행 (Practical)",
    "E": "엔터프라이즈/리더 (Enterprise)",
    "H": "수직/안정 (Hierarchy)",
    "F": "수평/자율 (Flat)",
    "I": "IT/테크 (IT/Tech)",
    "B": "비즈니스 (Business)",
    "D": "디자인/미디어 (Design)",
    "M": "제조/엔지니어링 (Manufacturing)"
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
    const personalizedText1 = `${baseText1}\n\n■ 💡 1:1 맞춤 컨설팅 리포트\n${userName}님의 성향 대조 데이터에 따르면, 해당 스타일 지표(${TRAIT_TITLES[char2]})의 발현율이 약 ${Math.round(styleVal)}%에 달합니다. 이는 평균 유학생 대비 또렷한 특장점이 포지셔닝 되었음을 뜻합니다. 실무에서 이 장점을 강력하게 무기화하려면, 평균 ${compScores.tech_skill}점(5점 만점)으로 측정된 OA 및 기초 행정 역량이나 자격증 등을 통해 '입증 가능한 하드 스킬'을 더해야 최우선 타겟인 [${topJobName}] 직무에서 서류 통과율을 비약적으로 높일 수 있습니다.`;

    const personalizedText2 = `${baseText2}\n\n■ 💡 1:1 맞춤 컨설팅 리포트\n현재 진단된 알고리즘 수치상, ${userName}님은 해당 조직 분위기에 약 ${Math.round(topCultureVal)}% 의 극도로 높은 적합/수용도를 보이고 있습니다. 면접 시 "한국 문화에 적응할 수 있는가?"라는 흔한 공격 질문을 받았을 때, 막연한 대답 대신 "${univName} 생활과 팀 프로젝트를 통해 ${isFlexible ? '수평적 협업과 주도성' : '정해진 룰과 위계질서를 존중하는 법'}을 체득했다"고 지원 전형에 맞도록 방어한다면, 외국인 채용을 주저하는 기업의 심리적 허들을 단번에 무너뜨릴 수 있습니다.`;

    const personalizedText3 = `${baseText3}\n\n■ 💡 1:1 맞춤 컨설팅 리포트\n해당 산업군은 궁극적으로 ${userName}님이 선택하신 [${majorName}] 전공 관련 지식(${compScores.major_expertise}점)과 한국어 소통 능력(${compScores.korean}점)의 앙상블로 진입 장벽이 결정됩니다. 지원 산업군 특성상 전문 용어를 사용하는 비즈니스 한국어와 실무 전공 지식이 요구되므로, 현재 수준에 만족하기보다 특정 활동(E-7) 비자 취득을 위해 공식 한국어 토픽(TOPIK) 점수를 상향하고, 해당 산업군의 인턴십(D-2-4)을 최우선적으로 확보하는 전략을 강력히 권장합니다.`;

    const coreCode = kvtiUpper.substring(0, 3);
    const dictEntry = KVTI_DICTIONARY[coreCode] || KVTI_DICTIONARY[kvtiUpper];

    // Summary text generation moved to the end to utilize topJobs data

    // 2. Generate Factor Details (Deconstructed text for the Deep Dive section)
    const factorDetails = [
        {
            axisName: "1. 업무 수행 스타일",
            letter: char2,
            title: TRAIT_TITLES[char2] || char2,
            description: personalizedText1
        },
        {
            axisName: "2. 조직 문화 융화력",
            letter: char3,
            title: TRAIT_TITLES[char3] || char3,
            description: personalizedText2
        },
        {
            axisName: "3. 최적합 산업 군",
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

            const lawDefinition = E7_DESCRIPTIONS[extractedCode] || "국가 경쟁력 제고를 위하여 전문적인 지식, 기술, 기능을 가진 외국인 인력 도입이 필요한 분야로서 법무부 장관이 지정하는 특정활동 직무입니다.";
            const visaRequirements = E7_REQUIREMENTS[extractedCode] || {
                education: "관련 분야 석사 학위 이상 소지자, 혹은 관련 학사 취득 후 1년 이상의 전문 경력을 공식적으로 증빙할 수 있는 자.",
                salary: "계약 연봉이 전년도 한국은행 발표 1인당 국민총소득(GNI)의 80% 이상 요건을 의무적으로 충족해야 함.",
                employer: "국민고용보호원칙이 적용되어, 고용 업체에 가입된 내국인 고용보험 가입자 수의 20% 이내 범위에서만 사증 발급이 허용됨."
            };

            // Extract newly designed advanced fields
            const advanceData = E7_REQUIREMENTS[extractedCode] || {};
            const specialNote = advanceData.special || `해당 ${extractedCode} 직종은 법무부의 일반 특정활동 비자 발급 지침을 따르며, 전공 분야 요건 및 한국인 고용 보호 비율(20%) 심사가 필수적으로 진행됩니다.`;
            const roadmapData = advanceData.roadmap || {
                certifications: ["해당 직무 관련 국가 기술/기사 자격증"],
                tools: ["해당 분야 실무 표쥰 소프트웨어/장비"],
                portfolio: ["관련 실무 프로젝트 및 성과 포트폴리오"]
            };

            // Use the algorithmic score passed from the logic engine
            const exactScore = job.readiness || 80;

            return {
                code: codeString,
                visaType: extractedCode === "E-7-4" ? "E-7-4 숙련기능" : "E-7-1 전문인력",
                title_ko: name_ko,
                title_en: name_en,
                readiness: exactScore,
                lawDefinition: lawDefinition,
                visaRequirements: visaRequirements,
                specialNote: specialNote,
                certifications: roadmapData.certifications?.length > 0 ? roadmapData.certifications : ["해당 직무 분야의 전문성을 강하게 입증할 수 있는 국가공인 기술/기사 자격증 또는 글로벌 인증"],
                tools: roadmapData.tools?.length > 0 ? roadmapData.tools : ["채용 직후 즉시 현업 투입이 가능함을 증명하는 실무 표준 핵심 소프트웨어 및 장비 운용 기술 스택"],
                portfolio: roadmapData.portfolio?.length > 0 ? roadmapData.portfolio : ["출입국 심사관 및 기업 인사담당자를 동시에 설득할 수 있는 구체적이고 실증적인 프로젝트 성과물"],
                requiredCompetencies: [
                    "심사관 및 사내 내국인 팀원과의 원활한 소통을 위한 고도화된 비즈니스 한국어 구사 능력 (TOPIK 4급 이상 권장)",
                    "재학 중 특정활동(E-7) 분야와 일치하는 인턴십(D-2-4) 또는 현장실습 경험을 증빙하는 이력 및 포트폴리오 구축"
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

            const lawDefinition = E7_DESCRIPTIONS[extractedCode] || "국가 경쟁력 제고를 위하여 전문적인 지식, 기술, 기능을 가진 외국인 인력 도입이 필요한 분야로서 법무부 장관이 지정하는 특정활동 직무입니다.";
            const visaRequirements = E7_REQUIREMENTS[extractedCode] || {
                education: "관련 분야 석사 학위 이상 소지자, 혹은 관련 학사 취득 후 1년 이상의 전문 경력을 공식적으로 증빙할 수 있는 자.",
                salary: "계약 연봉이 전년도 한국은행 발표 1인당 국민총소득(GNI)의 80% 이상 요건을 의무적으로 충족해야 함.",
                employer: "국민고용보호원칙이 적용되어, 고용 업체에 가입된 내국인 고용보험 가입자 수의 20% 이내 범위에서만 사증 발급이 허용됨."
            };

            // Extract advanced fields
            const advanceData = E7_REQUIREMENTS[extractedCode] || {};
            const specialNote = advanceData.special || `해당 ${extractedCode} 직종은 법무부의 일반 특정활동 비자 발급 지침을 따르며, 전공 분야 요건 및 한국인 고용 보호 비율(20%) 심사가 필수적으로 진행됩니다.`;
            const roadmapData = advanceData.roadmap || {
                certifications: ["해당 직무 관련 국가 기술/기사 자격증"],
                tools: ["해당 분야 실무 표쥰 소프트웨어/장비"],
                portfolio: ["관련 실무 프로젝트 및 성과 포트폴리오"]
            };

            return {
                code: codeString,
                visaType: extractedCode === "E-7-4" ? "E-7-4 숙련기능" : "E-7-1 전문인력",
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
                    "심사관 및 사내 내국인 팀원과의 원활한 소통을 위한 고도화된 비즈니스 한국어 구사 능력 (TOPIK 4급 이상 권장)",
                    "재학 중 특정활동(E-7) 분야와 일치하는 인턴십(D-2-4) 또는 현장실습 경험을 증빙하는 이력 및 포트폴리오 구축"
                ]
            };
        });
    }

    // topJobs is an array of objects like { code: "2742", title: "해외 영업원", ... } or just raw items
    // If the title_ko is missing, we should look it up from E7_DB to avoid generic "1순위 직무" placeholders.
    const getJobName = (index, fallback) => {
        const job = topJobs[index];
        if (!job) return fallback;
        if (job.title_ko) return job.title_ko;
        if (job.title) return job.title; // fallback
        if (job.code && E7_DB[job.code]) return E7_DB[job.code].name_ko;
        return fallback;
    }

    const job1 = getJobName(0, "핵심 추천 직업군");
    const job2 = getJobName(1, "연관 직업군");
    const job3 = getJobName(2, "잠재적 직업군");

    const vitalityIndex = dashboardData?.careerVitalityIndex || 85;
    const matchingScore = dashboardData?.mdjm_raw_results?.[0] ? Math.round(dashboardData.mdjm_raw_results[0].similarity * 100) : 85;

    // --- ALGORITHMIC DATA EXTRACTION ---
    // 1. RIASEC Engine Data
    const rawRiasec = dashboardData?.riasec_code || 'E';
    const maxRiasecKey = rawRiasec.charAt(0);
    const riasecMap = { R: '현실형(R)', I: '탐구형(I)', A: '예술형(A)', S: '사회형(S)', E: '진취형(E)', C: '관습형(C)' };

    // 2. Industry Preferences Array
    const indScores = dashboardData?.scoreBreakdown?.industry || { IT: 25, BIZ: 25, DES: 25, MFG: 25 };
    const sortedInd = Object.entries(indScores).sort((a, b) => b[1] - a[1]);
    const topIndKey = sortedInd[0]?.[0] || 'BIZ';
    const topIndVal = sortedInd[0]?.[1] || 40;
    const secondIndKey = sortedInd[1]?.[0] || 'IT';
    const secondIndVal = sortedInd[1]?.[1] || 25;
    const indNameMap = { IT: 'IT/Tech', BIZ: '경영/비즈니스', DES: '디자인/미디어', MFG: '제조/엔지니어링' };

    // 2.5 Work Style Preferences Array
    const sortedStyle = Object.entries(styleScores).sort((a, b) => b[1] - a[1]);
    const topStyleKey = sortedStyle[0]?.[0] || 'A';
    const topStyleVal = sortedStyle[0]?.[1] || 40;
    const secondStyleKey = sortedStyle[1]?.[0] || 'C';
    const secondStyleVal = sortedStyle[1]?.[1] || 25;
    const styleNameMap = { A: '분석 및 기획(A)', C: '창의 및 아이디어(C)', P: '현장 및 실행(P)', E: '리더십 및 추진(E)' };

    // 3. Competence engine
    const comp = passedState?.diagnosis?.competence || { korean: 0, tech_skill: 0, major_expertise: 0 };

    // Dictionary Description Tone Fix
    let dictDesc = dictEntry ? dictEntry.description : "유연성과 창의성을 동시에 지닌 인재로 평가했습니다.";
    if (dictDesc.endsWith('이다.')) dictDesc = dictDesc.replace(/이다\.$/, '입니다.');
    else if (dictDesc.endsWith('한다.')) dictDesc = dictDesc.replace(/한다\.$/, '합니다.');
    else if (dictDesc.endsWith('다.')) dictDesc = dictDesc.replace(/다\.$/, '습니다.');

    // Vitality Index Interpretation (Tone changed from "Danger" to "Exploration/Certainty" per User request)
    let vitalityInterpretation = "";
    if (vitalityIndex >= 80) {
        vitalityInterpretation = "확립기(80점 이상) 수준으로, 자신의 진로 방향성에 대해 매우 확고한 가치관과 명확한 확신을 지니고 있습니다. 목표가 뚜렷하므로 즉각적인 취업 준비 액션을 취해도 좋은 긍정적인 지표입니다.";
    } else if (vitalityIndex >= 60) {
        vitalityInterpretation = "안정권(60점 이상) 수준으로, 진로에 대한 전반적인 목표와 동기가 잘 설정되어 있습니다. 큰 틀에서의 방향성은 잡혀 있으므로 세부 직무만 정밀하게 타겟팅해 나간다면 훌륭한 결과가 기대됩니다.";
    } else if (vitalityIndex >= 40) {
        vitalityInterpretation = "탐색기(40점 이상) 수준으로, 아직 단 하나의 길을 확정하기보다는 다양한 가능성을 열어두고 유연하게 고민하는 자연스러운 단계임을 보여줍니다. 스펙 쌓기보다는 내게 맞는 직무 탐색이 우선되어야 합니다.";
    } else {
        vitalityInterpretation = "재정립기(40점 미만) 수준으로, 길에 대한 확신을 찾아가며 가능성을 좁혀가는 과정 중에 있음을 보여줍니다. 이는 위험한 상태가 아니며, 섣부른 지원보다는 자신의 진짜 흥미와 가치관이 무엇인지 다양한 선택지를 열어두고 깊이 탐구해보는 시간이 필요함을 의미합니다.";
    }

    // --- DYNAMIC REPORT TEXT GENERATION ---
    // --- DYNAMIC REPORT TEXT GENERATION ---
    // --- DYNAMIC REPORT TEXT GENERATION ---
    const text1_title = `[1. 종합 의견]`;
    const text1_content = `수만 개의 데이터 패턴을 분석한 결과, ${userName}님의 최고 성향은 '${dictEntry ? dictEntry.nickname : "융합형 잠재 인재"}' (${kvtiUpper})로 도출되었습니다. 이 결과는 엔진의 핵심인 RIASEC 직업 흥미도 검사에서 ${userName}님이 '${riasecMap[maxRiasecKey] || '선택'}' 성향에서 가장 두드러진 점수를 보인 것과 깊은 연관이 있습니다. 알고리즘의 전체적인 척도 융합 분석에 따르면, ${userName}님은 ${dictDesc}`;

    const text2_title = `[2. 커리어 선명도]`;
    const text2_content = `자신의 직무 가치관과 목표에 대한 확신의 정도를 수치화한 '커리어 선명도'는 ${vitalityIndex}점(100점 만점)으로 산출되었습니다. 이는 ${vitalityInterpretation}`;

    const text3_title = `[3. 산업군 직무 매칭 (MDJM 알고리즘)]`;
    const text3_content = `MDJM(Multi-Dimensional Job Matching) 엔진이 ${userName}님의 타겟 산업군 선호도 세부 스탯을 분석한 결과, 전체 산업군 중 '${indNameMap[topIndKey] || "해당 산업"}' 영역에 대한 선호도가 ${Math.round(topIndVal)}% 로 가장 높게 측정되었으며, 2순위인 '${indNameMap[secondIndKey]}' 영역(${Math.round(secondIndVal)}%)과 하이브리드된 융합 성향을 보이고 있습니다. 특정 영역에서 이러한 집중적인 수치를 보인 것은 해당 분야의 업무 환경 요소 및 리스크가 ${userName}님의 평소 성향과 안정적으로 교차(Synergy)하고 있음을 의미합니다.

이를 기반으로 법무부 E-7 비자의 전체 세부 직무 요구사항과 ${userName}님의 데이터를 수리적으로 대조했습니다. 전공 백그라운드(${majorName})와 산업/직무 성향 적합도를 모두 고려했을 때, 1순위로 산출된 '${job1}' 직무와의 성향 일치도는 약 ${matchingScore}% 에 달합니다. 이는 실무 환경에 진입했을 때, 이 직무가 다른 어떤 직무보다 ${userName}님에게 높은 가치 충족감과 몰입도를 제공할 수 있다는 알고리즘적 판단 근거입니다.`;

    const text4_title = `[4. 세부 업무 스타일 (Work Style)]`;
    const text4_content = `세부 업무 스타일(Work Style) 스탯을 분해한 결과, '${styleNameMap[topStyleKey]}' 성향이 ${Math.round(topStyleVal)}% 로 가장 두드러지게 나타났고, 그 다음으로 '${styleNameMap[secondStyleKey]}' 성향(${Math.round(secondStyleVal)}%)이 이를 뒷받침하고 있습니다. 커리어 선명도와 이러한 업무 스타일의 결합은 본인에게 가장 확고한 목표와 잘 맞는 역할(Role)을 지정해 줍니다.`;

    const text5_title = `[5. 조직 문화 적합성]`;
    const text5_content = `조직 문화(Culture Fit) 선호도 세부 스탯 지표에 따르면, ${userName}님은 ${isFlexible ? "'수평적 소통'과 '자율성'을 중시하는 유연한 조직" : "'체계적인 매뉴얼'과 '안정성'을 기반으로 하는 계층적 조직"}에 무려 ${Math.round(topCultureVal)}% 의 뚜렷한 상호작용 선호도를 보이고 있는 것으로 나타났습니다. 따라서 향후 입사 표적을 정할 때, 규모가 크더라도 ${isFlexible ? "스타트업, 외국계 기업, 에이전시 등 벤처(혁신형) 문화" : "대기업, 중견기업 혹은 전통적인 시스템을 갖춘 안정적 조직"}을 우선적으로 필터링하는 것이 전략적으로 압도적인 우위를 점할 수 있습니다.`;

    const text6_title = `[6. 실무 역량 분석 (소프트 스펙 분석)]`;
    const text6_content = `단순한 성향을 넘어, 실제 한국 기업 환경에서의 적응력을 측정하는 '실무 역량(Competence)' 분석에서는 다음과 같은 원시 데이터(Raw Score)가 도출되었습니다.

* 한국어 및 비즈니스 소통 역량: 평균 ${comp.korean}점 (5.0 만점 기준)
* 전공 분야 하드스킬 및 전문성: 평균 ${comp.major_expertise}점 (5.0 만점 기준)
* OA 및 기초 행정 역량: 평균 ${comp.tech_skill}점 (5.0 만점 기준)

※ 주의: 본 분석은 진단 기반의 소프트 스펙(Soft Spec)이므로, 실제 채용 시장 및 체류 비자 심사에서 유효성을 갖기 위해서는 TOPIK 등급, 전공 관련 기사 자격증 등 하드 스펙(Hard Spec)을 통한 실질적 증빙이 반드시 수반되어야 합니다.`;

    const text7_title = `[7. 전략적 로드맵 제안 가이드]`;
    const text7_content = `알고리즘이 산출한 '${job1}'을 핵심 타겟 트랙(Plan A)으로 삼되, '${job2}' 및 '${job3}'을 연관 역량(Plan B)으로 시야에 함께 두시기 바랍니다. 진단된 핵심 강점을 극대화하고, 아직 부족한 소통 역량이나 하드 스펙을 보완해 나간다면 대한민국 고용 시장에 본인만의 명확한 자리를 구축할 수 있을 것입니다. 세부 직무 매칭 결과는 아래 'E-7 직무 매칭 추천'에서 확인할 수 있습니다.`;

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
