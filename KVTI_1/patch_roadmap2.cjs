const fs = require('fs');
let s = fs.readFileSync('src/utils/kvtiLogic.js', 'utf8');

const replacement = `            steps = [
                {
                    stage: locale === 'en' ? "Phase 1. Fundamental Skills & Exploration (Freshman/Sophomore)" : "Phase 1. 기초 역량 및 탐색 (1~2학년 정규학기)",
                    icon: "📖",
                    action_items: [
                        { task: (locale === 'en' ? \`Maintain a **GPA of 3.0+** while taking major/elective courses related to **\${jobTitle}**. GPA is a measure of diligence and a basic requirement for resume screening.\` : \`**\${jobTitle}** 관련 전공/교양을 수강하며 **GPA 3.0 이상**을 방어하세요. 평점은 성실성의 척도이자 취업 서류 통과의 기본 요건입니다.\`), priority: "High", tag: locale === 'en' ? 'Major GPA' : '전공평점' },
                        { task: (locale === 'en' ? \`Join the Office of International Affairs (OIA) programs or major societies to directly collect **real E-7 employment success/failure cases** from senior students.\` : \`교내 유학생 지원팀(OIA) 프로그램이나 전공 학회에 가입하여, 선배들의 **실제 E-7 취업 성공/실패 사례**를 직접 수집하세요.\`), priority: "Medium", tag: locale === 'en' ? 'Networking' : '네트워킹' }
                    ]
                },
                {
                    stage: locale === 'en' ? "Phase 2. Language & Certification Immersion (Freshman/Sophomore Break)" : "Phase 2. 어학 및 자격 몰입 (1~2학년 방학)",
                    icon: "🔥",
                    action_items: [
                        { task: (locale === 'en' ? \`Focus on studying during the break aiming for **TOPIK Level 4**, a mandatory visa requirement. You must also take the pre-evaluation for **KIIP Level 3~4** which provides a certificate.\` : \`비자 필수 요건인 **TOPIK 4급**을 목표로 방학 중 집중 공부하세요. 수료증이 나오는 **사회통합프로그램(KIIP) 3~4단계** 사전평가도 꼭 응시해야 합니다.\`), priority: "High", tag: locale === 'en' ? 'Lang Immersion' : '어학몰입' },
                        { task: (locale === 'en' ? \`Access **Q-Net (HRDK)** to check the exam schedule for *National Technical Qualifications (Engineer/Industrial Engineer)* related to your target job, and pre-study the written subjects.\` : \`**한국산업인력공단(Q-Net)**에 접속해 목표 직무와 연관된 *국가기술자격(기사/산업기사)* 시험 일정을 확인하고 필기 과목을 선행 학습하세요.\`), priority: "Medium", tag: locale === 'en' ? 'Cert Prep' : '자격증대비' }
                    ]
                },
                {
                    stage: locale === 'en' ? "Phase 3. Building Core Specs (Junior/Senior Semester)" : "Phase 3. 핵심 스펙 구축 (3~4학년 정규학기)",
                    icon: "💻",
                    action_items: [
                        { task: (locale === 'en' ? \`Secure the essential software skills and core major certifications (Engineer/Industrial Engineer) specified at the top according to your target job.\` : \`목표 직무에 맞춰 상단에 명시된 필수 소프트웨어 및 핵심 전공 자격증(기사/산업기사)을 확보하세요.\`), priority: "High", tag: locale === 'en' ? 'Hard Skills' : '하드스킬' },
                        { task: (locale === 'en' ? \`Actively participate in on-campus capstone design and industry-university cooperation projects to build a practical portfolio demonstrating **what contributions you can make in the Korean corporate field**.\` : \`교내 캡스톤 디자인, 산학 협력 프로젝트 등에 적극적으로 참여해 **지원자가 한국 기업 현장에서 어떤 기여를 할 수 있는지** 보여줄 실무 포트폴리오를 구성하세요.\`), priority: "High", tag: locale === 'en' ? 'Portfolio' : '포트폴리오' }
                    ]
                },
                {
                    stage: locale === 'en' ? "Phase 4. Practical Experience & Internship (Junior/Senior Break)" : "Phase 4. 실전 경험 및 인턴십 (3~4학년 방학)",
                    icon: "💼",
                    action_items: [
                        { task: (locale === 'en' ? \`Regularly check major domestic recruitment portals and the campus career center to complete at least one job-related internship or job experience available for foreigners.\` : \`국내 주요 채용 포털이나 교내 취업지원센터를 주기적으로 확인하여, 외국인 지원이 가능한 직무 연관 인턴십이나 직무 체험을 1회 이상 완수하세요.\`), priority: "High", tag: locale === 'en' ? 'Practical Exp' : '실전경험' },
                        { task: (locale === 'en' ? \`Weave your on/off-campus activities and practical experiences into a single story, finalizing a **Master Resume & Job Portfolio** that you can present to interviewers immediately.\` : \`그동안의 교내외 활동과 실무 경험들을 하나의 스토리로 엮어, 면접관에게 즉각 제시할 수 있는 **마스터 이력서 및 직무 포트폴리오**를 확정하세요.\`), priority: "Medium", tag: locale === 'en' ? 'Resume Prep' : '이력서완성' }
                    ]
                },
                {
                    stage: locale === 'en' ? "Phase 5. D-10 Job Search & Direct E-7 Transition (Graduation)" : "Phase 5. D-10 구직 및 E-7 직행 (졸업전후)",
                    icon: "🚀",
                    action_items: [
                        { task: (locale === 'en' ? \`Utilize the D-10 (Job Seeker) visa exception for international students to focus on applying to robust mid-sized/SME companies with **5+ domestic employment insurance subscribers** and a condition guaranteeing **minimum wage or higher based on base salary**. (*E-7 general wage requirement: 80%+ of the previous year's GNI*)\` : \`D-10(구직) 비자 소지 유학생 특례를 활용해, **내국인 고용보험 가입자 5인 이상**이며 **기본급 기준 최저임금 이상 보장** 조건이 명시된 튼튼한 중견/중소기업에 집중 지원하세요. (*E-7 일반 임금 요건: 전년도 GNI 80% 이상*)\`), priority: "High", tag: locale === 'en' ? 'Targeted Apply' : '타겟지원' },
                        { task: bilingualTip, priority: "High", tag: locale === 'en' ? 'Recommendation' : '고용사유서' }
                    ]
                }
            ];`;

const regex = /steps\s*=\s*\[[\s\S]*?\];/;
s = s.replace(regex, replacement);

fs.writeFileSync('src/utils/kvtiLogic.js', s);
console.log('Roadmap patched with bilingual logic.');
