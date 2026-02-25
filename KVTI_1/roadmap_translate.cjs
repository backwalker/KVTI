const fs = require('fs');
let code = fs.readFileSync('src/utils/kvtiLogic.js', 'utf8');

const reps = [
    // Tags
    [/tag: "네트워킹"/g, "tag: locale === 'en' ? 'Networking' : '네트워킹'"],
    [/tag: "OASIS"/g, "tag: locale === 'en' ? 'OASIS' : 'OASIS'"],
    [/tag: "팀빌딩"/g, "tag: locale === 'en' ? 'Team Building' : '팀빌딩'"],
    [/tag: "지식재산권"/g, "tag: locale === 'en' ? 'Intellectual Property' : '지식재산권'"],
    [/tag: "정부지원"/g, "tag: locale === 'en' ? 'Gov Funding' : '정부지원'"],
    [/tag: "MVP검증"/g, "tag: locale === 'en' ? 'MVP Validation' : 'MVP검증'"],
    [/tag: "투자유치"/g, "tag: locale === 'en' ? 'Investment Attraction' : '투자유치'"],
    [/tag: "법인설립"/g, "tag: locale === 'en' ? 'Corporate Setup' : '법인설립'"],
    [/tag: "비자전환"/g, "tag: locale === 'en' ? 'Visa Conversion' : '비자전환'"],
    [/tag: "채용확대"/g, "tag: locale === 'en' ? 'Hiring Expansion' : '채용확대'"],
    [/tag: "벤처인증"/g, "tag: locale === 'en' ? 'Venture Cert' : '벤처인증'"],
    [/tag: "영주권"/g, "tag: locale === 'en' ? 'Permanent Residency' : '영주권'"],
    [/tag: "학위방어"/g, "tag: locale === 'en' ? 'Degree Defense' : '학위방어'"],
    [/tag: "KIIP"/g, "tag: locale === 'en' ? 'KIIP' : 'KIIP'"],
    [/tag: "자격증"/g, "tag: locale === 'en' ? 'Certification' : '자격증'"],
    [/tag: "실무지식"/g, "tag: locale === 'en' ? 'Practical Knowledge' : '실무지식'"],
    [/tag: "특례타겟팅"/g, "tag: locale === 'en' ? 'Exemption Targeting' : '특례타겟팅'"],
    [/tag: "산학실습"/g, "tag: locale === 'en' ? 'Industry-Academy Practice' : '산학실습'"],
    [/tag: "K-Point"/g, "tag: locale === 'en' ? 'K-Point' : 'K-Point'"],
    [/tag: "취업컨택"/g, "tag: locale === 'en' ? 'Job Contact' : '취업컨택'"],
    [/tag: "임금요건"/g, "tag: locale === 'en' ? 'Wage Requirement' : '임금요건'"],
    [/tag: "E-7직행"/g, "tag: locale === 'en' ? 'Direct E-7' : 'E-7직행'"],
    [/tag: "장기근속"/g, "tag: locale === 'en' ? 'Long-term Service' : '장기근속'"],
    [/tag: "마이스터"/g, "tag: locale === 'en' ? 'Meister' : '마이스터'"],
    [/tag: "전공평점"/g, "tag: locale === 'en' ? 'Major GPA' : '전공평점'"],
    [/tag: "어학몰입"/g, "tag: locale === 'en' ? 'Lang Immersion' : '어학몰입'"],
    [/tag: "자격증대비"/g, "tag: locale === 'en' ? 'Cert Prep' : '자격증대비'"],
    [/tag: "하드스킬"/g, "tag: locale === 'en' ? 'Hard Skills' : '하드스킬'"],
    [/tag: "포트폴리오"/g, "tag: locale === 'en' ? 'Portfolio' : '포트폴리오'"],
    [/tag: "실전경험"/g, "tag: locale === 'en' ? 'Practical Exp' : '실전경험'"],
    [/tag: "이력서완성"/g, "tag: locale === 'en' ? 'Resume Prep' : '이력서완성'"],
    [/tag: "타겟지원"/g, "tag: locale === 'en' ? 'Targeted Apply' : '타겟지원'"],
    [/tag: "초석다지기"/g, "tag: locale === 'en' ? 'Foundation' : '초석다지기'"],
    [/tag: "특례활용"/g, "tag: locale === 'en' ? 'Use Exemption' : '특례활용'"],
    [/tag: "점수확보"/g, "tag: locale === 'en' ? 'Secure Points' : '점수확보'"],
    [/tag: "F-2-7준비"/g, "tag: locale === 'en' ? 'F-2-7 Prep' : 'F-2-7준비'"],
    [/tag: "점수가점"/g, "tag: locale === 'en' ? 'Bonus Points' : '점수가점'"],
    [/tag: "TOPIK필수"/g, "tag: locale === 'en' ? 'TOPIK Required' : 'TOPIK필수'"],
    [/tag: "KIIP강제"/g, "tag: locale === 'en' ? 'KIIP Mandatory' : 'KIIP강제'"],
    [/tag: "고용사유서"/g, "tag: locale === 'en' ? 'Recommendation' : '고용사유서'"],

    // Tasks
    [/task: "내향\/외향 성향을 살려 교내 창업 동아리 및 해커톤에 적극 참여하세요."/g, "task: locale === 'en' ? 'Utilize your intro/extrovert traits and actively participate in campus startup clubs and hackathons.' : '내향/외향 성향을 살려 교내 창업 동아리 및 해커톤에 적극 참여하세요.'"],
    [/task: "글로벌 창업 이민센터\(OASIS\) 교육 1단계 진입을 강력히 추천합니다."/g, "task: locale === 'en' ? 'Highly recommended to enter Step 1 of the OASIS (Overall Assistance for Startup Immigration System) program.' : '글로벌 창업 이민센터(OASIS) 교육 1단계 진입을 강력히 추천합니다.'"],
    [/task: "예비창업자 핵심 팀 빌딩을 완료하고 비즈니스 모델\(BM\)을 구체화하세요."/g, "task: locale === 'en' ? 'Complete core team building for prospective founders and materialize your Business Model (BM).' : '예비창업자 핵심 팀 빌딩을 완료하고 비즈니스 모델(BM)을 구체화하세요.'"],
    [/task: "특허\/실용신안\/디자인권 출원 등 지식재산권을 확보하여 OASIS 점수\(50점\)를 미리 세팅하세요."/g, "task: locale === 'en' ? 'Secure intellectual property such as patents/utility models/designs to pre-set 50 OASIS points.' : '특허/실용신안/디자인권 출원 등 지식재산권을 확보하여 OASIS 점수(50점)를 미리 세팅하세요.'"],
    [/task: "K-Startup 등 정부 창업 지원 사업에 선정되어 초기 자본금을 확보하세요."/g, "task: locale === 'en' ? 'Secure initial capital by being selected for government startup support programs like K-Startup.' : 'K-Startup 등 정부 창업 지원 사업에 선정되어 초기 자본금을 확보하세요.'"],
    [/task: "확보된 자금으로 최소기능제품\(MVP\)을 개발하고 시장의 반응을 테스트하세요."/g, "task: locale === 'en' ? 'Develop an MVP (Minimum Viable Product) with the secured funds and test market reactions.' : '확보된 자금으로 최소기능제품(MVP)을 개발하고 시장의 반응을 테스트하세요.'"],
    [/task: "엔젤 투자자나 엑셀러레이터\(AC\)로부터 투자를 유치하고 법인 설립을 준비하세요."/g, "task: locale === 'en' ? 'Attract investment from Angel Investors or Accelerators (AC) and prepare for corporate setup.' : '엔젤 투자자나 엑셀러레이터(AC)로부터 투자를 유치하고 법인 설립을 준비하세요.'"],
    [/task: "1억 이상의 자본 등기를 완료하고, 최종 OASIS 80점을 채우세요."/g, "task: locale === 'en' ? 'Complete capital registration of 100M+ KRW and fulfill the final 80 OASIS points.' : '1억 이상의 자본 등기를 완료하고, 최종 OASIS 80점을 채우세요.'"],
    [/task: "D-8-4 특례 비자로 전환하고 본격적인 초기 매출 J커브 달성에 집중하세요."/g, "task: locale === 'en' ? 'Convert to the D-8-4 special visa and focus on achieving the initial revenue J-curve.' : 'D-8-4 특례 비자로 전환하고 본격적인 초기 매출 J커브 달성에 집중하세요.'"],
    [/task: "한국인 직원 직고용 창출 등 비즈니스 스케일업과 경제 기여도를 입증하세요."/g, "task: locale === 'en' ? 'Prove business scale-up and economic contribution, such as creating direct employment for Korean staff.' : '한국인 직원 직고용 창출 등 비즈니스 스케일업과 경제 기여도를 입증하세요.'"],
    [/task: "기술보증기금 등으로부터 우수 벤처기업 인증을 획득하세요."/g, "task: locale === 'en' ? 'Acquire outstanding venture enterprise certification from KIBO or others.' : '기술보증기금 등으로부터 우수 벤처기업 인증을 획득하세요.'"],
    [/task: "외부 대규모 투자 유치\(3억 이상 타겟\)를 통해 최종적으로 F-5-11 투자 영주권에 도전해 보세요."/g, "task: locale === 'en' ? 'Challenge the F-5-11 Investor PR via large-scale external investment (Targeting 300M+ KRW).' : '외부 대규모 투자 유치(3억 이상 타겟)를 통해 최종적으로 F-5-11 투자 영주권에 도전해 보세요.'"],
    [/task: "한국 산업 현장 적응력을 극대화하세요. 이공계\/전문 학사 유지는 기본, 현장 소통을 위한 한국어를 마스터하세요."/g, "task: locale === 'en' ? 'Maximize adaptation to Korean industrial sites. Maintain STEM/Associate degree and master Korean for field communication.' : '한국 산업 현장 적응력을 극대화하세요. 이공계/전문 학사 유지는 기본, 현장 소통을 위한 한국어를 마스터하세요.'"],
    [/task: "거주 비자 가산점 및 소통을 위해 KIIP\(사회통합프로그램\) 사전 이수를 철저히 대비하세요."/g, "task: locale === 'en' ? 'Thoroughly prepare for KIIP pre-completion for communication and residency visa bonus points.' : '거주 비자 가산점 및 소통을 위해 KIIP(사회통합프로그램) 사전 이수를 철저히 대비하세요.'"],
    [/task: "산업 현장에서 요구하는 국가 기술 자격증\(기능사\/산업기사\) 취득을 준비하세요."/g, "task: locale === 'en' ? 'Prepare to acquire national technical certificates (Craftsman/Industrial Engineer) demanded by industrial sites.' : '산업 현장에서 요구하는 국가 기술 자격증(기능사/산업기사) 취득을 준비하세요.'"],
    [/task: "내국인 기능인력 대비 동등 이상의 현장 가치를 증명할 수 있는 실무 지식을 습득하세요."/g, "task: locale === 'en' ? 'Acquire practical knowledge proving field value equal to or greater than domestic skilled workers.' : '내국인 기능인력 대비 동등 이상의 현장 가치를 증명할 수 있는 실무 지식을 습득하세요.'"],
    [/task: "뿌리산업, 조선업 등 '유학생 경력 면제 특례'가 적용되는 분야를 적극 탐색하세요."/g, "task: locale === 'en' ? 'Actively explore fields like Root Industries or Shipbuilding where the \\'International Student Experience Exemption\\' applies.' : '뿌리산업, 조선업 등 \\'유학생 경력 면제 특례\\'가 적용되는 분야를 적극 탐색하세요.'"],
    [/task: "체계적인 산학 실습 네트워크에 진입하여 현장 네트워크와 탄탄한 실무 경험을 쌓으세요."/g, "task: locale === 'en' ? 'Enter systematic industry-academy practice networks to build solid field networks and practical experience.' : '체계적인 산학 실습 네트워크에 진입하여 현장 네트워크와 탄탄한 실무 경험을 쌓으세요.'"],
    [/task: "졸업 시점, 유학생 한정 가점\(10점\) 및 지자체 추천서\(30점\)를 활용하는 비자 전략을 세우세요."/g, "task: locale === 'en' ? 'At graduation, build a visa strategy utilizing the international student bonus (10pts) and local gov recommendation (30pts).' : '졸업 시점, 유학생 한정 가점(10점) 및 지자체 추천서(30점)를 활용하는 비자 전략을 세우세요.'"],
    [/task: "이러한 정부 가점 제도를 무기로 현장 취업처를 컨택하고 고용 계약을 유도하세요."/g, "task: locale === 'en' ? 'Armed with this government bonus point system, contact field employers to induce employment contracts.' : '이러한 정부 가점 제도를 무기로 현장 취업처를 컨택하고 고용 계약을 유도하세요.'"],
    [/task: "현장 연 2600만 원 이상\(임금 요건\) 고용계약으로 E-9 과정을 거치지 마세요."/g, "task: locale === 'en' ? 'Avoid the E-9 process by securing an employment contract over 26M KRW annually (wage requirement).' : '현장 연 2600만 원 이상(임금 요건) 고용계약으로 E-9 과정을 거치지 마세요.'"],
    [/task: "초기부터 전문 취업\(E-7\) 비자에 직행하여 현장에 빠르게 안착하고 경력을 시작하세요."/g, "task: locale === 'en' ? 'Go straight to a professional work visa (E-7) from the start to quickly settle in the field and start your career.' : '초기부터 전문 취업(E-7) 비자에 직행하여 현장에 빠르게 안착하고 경력을 시작하세요.'"],
    [/task: "장인 정신 발휘: 동일 직장에서 3년 이상 성실히 장기 근속하세요."/g, "task: locale === 'en' ? 'Demonstrate craftsmanship: Serve diligently in the same workplace for over 3 years.' : '장인 정신 발휘: 동일 직장에서 3년 이상 성실히 장기 근속하세요.'"],
    [/task: "숙련기능 우수인재 거주 비자\(F-2-9\)로 전환하고 완벽한 영주권 기반을 닦으세요."/g, "task: locale === 'en' ? 'Convert to the Skilled Talent Residency Visa (F-2-9) to lay a perfect foundation for permanent residency.' : '숙련기능 우수인재 거주 비자(F-2-9)로 전환하고 완벽한 영주권 기반을 닦으세요.'"],
    [/task: "자격 요건 충족 시 조기 영주권\(F-5\) 트랙까지 설계 가능한 최상위 포지션입니다."/g, "task: locale === 'en' ? 'This is a top-tier position where an early permanent residency (F-5) track can be designed if requirements are met.' : '자격 요건 충족 시 조기 영주권(F-5) 트랙까지 설계 가능한 최상위 포지션입니다.'"],
    [/task: "점수제 80점 달성을 위해 TOPIK 5급 이상과 KIIP 5단계를 졸업 전까지 반드시 미리 완성해 두는 것이 유리합니다."/g, "task: locale === 'en' ? 'It is highly advantageous to complete TOPIK Level 5+ and KIIP Level 5 before graduation to achieve 80 points.' : '점수제 80점 달성을 위해 TOPIK 5급 이상과 KIIP 5단계를 졸업 전까지 반드시 미리 완성해 두는 것이 유리합니다.'"],
    [/task: "일반 전문직\(E-7-1\) 취업자는 추후 자격 요건을 충족하면 점수제 우수인재\(F-2-7\) 비자로 업그레이드할 수 있습니다."/g, "task: locale === 'en' ? 'General professionals (E-7-1) can upgrade to the Points-Based Excellent Talent (F-2-7) visa upon meeting requirements later.' : '일반 전문직(E-7-1) 취업자는 추후 자격 요건을 충족하면 점수제 우수인재(F-2-7) 비자로 업그레이드할 수 있습니다.'"],
    [/task: "특히 국내 학위\(석박사\)를 유지하거나 추가 취득할 경우, 비자 점수 확보에 매우 유리합니다."/g, "task: locale === 'en' ? 'In particular, maintaining or additionally acquiring domestic degrees (Master/PhD) is extremely advantageous for securing visa points.' : '특히 국내 학위(석박사)를 유지하거나 추가 취득할 경우, 비자 점수 확보에 매우 유리합니다.'"]
];

for (const [re, rep] of reps) {
    code = code.replace(re, rep);
}

fs.writeFileSync('src/utils/kvtiLogic.js', code);
console.log('Script ran!');
