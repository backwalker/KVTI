const fs = require('fs');

const extractAndPatch = (filename, isKo) => {
    let raw = fs.readFileSync(filename, 'utf8');
    let data = JSON.parse(raw);

    const resultBlockKo = {
        "no_data": "진단 결과가 없습니다.",
        "home_btn": "홈으로 돌아가기",
        "start_over": "다시 진단하기",
        "survey_btn": "KVTI 만족도 조사 참여하기",
        "restart_btn": "진단 다시하기",
        "footer_text": "본 결과는 법무부 E-7 심사 기준과 출입국관리법을 기반으로 AI가 분석한 데이터입니다.\n실제 체류 자격 변경 심사 시에는 다양한 추가 변수(범죄경력, 세금체납 등)가 작용할 수 있습니다.",
        "error_title": "데이터 분석 오류",
        "error_desc": "결과 데이터를 불러올 수 없습니다. 다시 시도해주세요.",
        "kvti_type_of": "의 KVTI 유형",
        "what_is_kvti": "KVTI 유형이란?",
        "default_char": "조직 적응력과 직무 전문성을 고루 갖춘 인재",
        "stats_title": "비자 잠재력 & 핵심 역량",
        "industry_title": "산업 적합성 (Industry Fit)",
        "style_title": "업무 스타일 (Work Style)",
        "style_labels": {
            "A": "분석적/체계적",
            "C": "기획적/창조적",
            "E": "도전적/리더형",
            "P": "실용적/현장형"
        },
        "culture_title": "조직 문화 (Org Culture)",
        "culture_labels": {
            "H": "수직적/대기업형",
            "F": "수평적/스타트업형"
        },
        "residency_title": "정주 의지 (Residency / K-Point)",
        "residency_labels": {
            "K": "정주형(K-Point/초청)",
            "G": "글로벌이동/외국계"
        },
        "profile_title": "지원자 기본 스펙 (Phase 0)",
        "prof_major": "전공",
        "prof_univ": "대학",
        "prof_lang": "한국어",
        "prof_second": "제2외국어",
        "prof_kiip": "사회통합(KIIP)",
        "level_suffix": "급",
        "not_selected": "미선택",
        "not_applicable": "해당없음",
        "step_suffix": "단계",
        "top3_title": "E-7-1 최적의 직무 (Top 3)",
        "rank_1": "1순위 추천",
        "rank_2": "2순위 대안",
        "rank_3": "3순위 대안",
        "rank_n": "순위 대안",
        "detail_btn": "상세 스펙 보기",
        "pers_fit": "성향 일치도",
        "major_comp_note": "전공 적합성 주의",
        "special_tag": "특별 추천",
        "hidden_talent": "숨겨진 적성 발견",
        "premium_track": "프리미엄 트랙",
        "tech_startup": "스타트업",
        "view_strategy": "전략 보기",
        "summary_title": "AI 종합 컨설팅 리포트",
        "view_report": "전체 리포트 열기",
        "style_map": {
            "A": "분석/관리",
            "C": "기획/창조",
            "E": "리더/개척",
            "P": "실용/현장"
        },
        "ind_map": {
            "IT": "IT/Tech",
            "BIZ": "비즈니스",
            "DES": "디자인",
            "MFG": "제조/공학"
        },
        "sum_point1": "결과 요약 1",
        "sum_p1_text": "분석 결과, <strong className='text-white font-bold'>{{name}}</strong>님은 <strong>{{persona}}</strong> 성향과 가장 깊이 공명하고 있습니다. 특히 눈에 띄는 점은 {{name}}님의 내재적 확신(커리어 선명도)이 <strong>{{cvi}}점</strong>으로 산출되었다는 것입니다. 세부 업무 스타일(Work Style) 스탯을 분해한 결과, <strong>'{{topStyleName}}' 성향이 {{topStyleVal}}%</strong> 로 가장 두드러지게 나타났고, 그 다음으로 <strong>'{{secondStyleName}}' 성향({{secondStyleVal}}%)</strong>이 이를 뒷받침하고 있습니다. 거시적 산업 시너지는 <strong>{{topIndName}} 성향({{topIndVal}}%)</strong>과 <strong>{{secondIndName}} 성향({{secondIndVal}}%)</strong>의 하이브리드에 집중되어 있으며, 이를 바탕으로 <strong>{{jobs}}</strong> 분야로 로드맵을 설계할 때 가장 높은 내적 확신과 몰입도를 발휘할 수 있습니다.",
        "sum_point2": "결과 요약 2",
        "sum_p2_text_high": "탁월한 전공 일치도와 뚜렷한 목표 의식",
        "sum_p2_text_low": "다양한 가능성을 열어두는 유연한 직무 적응력",
        "sum_p2_text_common": "(해당 직군 기준 <strong>{{score}}%</strong> 도출)을 향후 자격증이나 인턴십 포트폴리오로 구체화해 나간다면, E-7 비자 취업 시장 진입에 훌륭한 디딤돌이 될 것입니다.",
        "sum_point3": "결과 요약 3",
        "sum_p3_flexible": "{{name}}님의 체계 및 조직 상호작용 선호도를 분석한 결과, '수평적/스타트업형' 중심의 환경에 무려 <strong>{{val}}%</strong>의 유의미한 수용성을 보였습니다. 엄격한 위계질서보다는 구조 혁신적인 글로벌 벤처 스타트업이나 능동적인 기업 문화를 타겟으로 리서치하는 것이 유리합니다.",
        "sum_p3_hierarchical": "조직 문화 상호작용을 분석한 결과, '수직적/대기업형' 중심의 안정적이고 체계적인 환경에 <strong>{{val}}%</strong>의 강한 수용성을 보였습니다. 체계적인 시스템과 보고 체계가 확립된 중견 및 대기업 조직 문화를 위주로 탐색하는 것이 좋습니다.",
        "roadmap_title": "비자 & 커리어 액션 로드맵",
        "route_prefix": "Route",
        "target_spec_title": "Target Specification",
        "basic_req": "Basic Requirements",
        "certifications": "Certifications & Tests",
        "tool_stack": "Core Tool Stack",
        "portfolio": "Portfolio & Activity",
        "phase_prefix": "Phase",
        "major_exception_title": "비전공자 통과 특례",
        "major_exception_desc": "학사 학위 이상 + 관련 실무 경력 1년 또는 KOTRA 우수 인재 추천서 대체 가능",
        "d10_predict_title": "D-10 예측 점수",
        "points": "점",
        "key_quests": "Key Quests",
        "must_tag": "필수",
        "premium_feature": "프리미엄 전용",
        "red_flag_title": "비자 거절 위험 (Risk Factors)",
        "red_flag_desc": "비자 신청 전 체크해야 할 <strong>심각한 리스크</strong>가 감지되었습니다.",
        "extra_desc": "전공 불일치를 상쇄할 <strong>{{name}}</strong>님의 고유한 재능을 강조하세요."
    };

    const resultBlockEn = {
        "no_data": "No diagnostic results available.",
        "home_btn": "Return to Home",
        "start_over": "Diagnose Again",
        "survey_btn": "Participate in KVTI Satisfaction Survey",
        "restart_btn": "Restart Diagnosis",
        "footer_text": "This result is AI-analyzed data based on the Ministry of Justice E-7 review standards and Immigration Act.\nActual status change reviews may involve various additional variables (criminal records, tax arrears, etc.).",
        "error_title": "Data Analysis Error",
        "error_desc": "Could not load result data. Please try again.",
        "kvti_type_of": "'s KVTI Type",
        "what_is_kvti": "What is KVTI Type?",
        "default_char": "A talent with balanced organizational adaptability and job expertise",
        "stats_title": "Visa Potential & Core Competencies",
        "industry_title": "Industry Fit",
        "style_title": "Work Style",
        "style_labels": {
            "A": "Analytical/Systematic",
            "C": "Planning/Creative",
            "E": "Challenging/Leader",
            "P": "Practical/Field"
        },
        "culture_title": "Org Culture",
        "culture_labels": {
            "H": "Vertical/Corporate",
            "F": "Horizontal/Startup"
        },
        "residency_title": "Residency (K-Point)",
        "residency_labels": {
            "K": "Residency (K-Point)",
            "G": "Global Relocation"
        },
        "profile_title": "Applicant Basic Spec (Phase 0)",
        "prof_major": "Major",
        "prof_univ": "University",
        "prof_lang": "Korean",
        "prof_second": "2nd Language",
        "prof_kiip": "KIIP",
        "level_suffix": " Level",
        "not_selected": "N/A",
        "not_applicable": "N/A",
        "step_suffix": " Step",
        "top3_title": "E-7-1 Optimal Jobs (Top 3)",
        "rank_1": "1st Recommendation",
        "rank_2": "2nd Alternative",
        "rank_3": "3rd Alternative",
        "rank_n": "th Alternative",
        "detail_btn": "View Details",
        "pers_fit": "Personality Fit",
        "major_comp_note": "Major Match Warning",
        "special_tag": "Special Recommendation",
        "hidden_talent": "Hidden Talent Found",
        "premium_track": "Premium Track",
        "tech_startup": "Startup",
        "view_strategy": "View Strategy",
        "summary_title": "AI General Consulting Report",
        "view_report": "Open Full Report",
        "style_map": {
            "A": "Analysis/Mgmt",
            "C": "Planning/Creative",
            "E": "Leader/Pioneer",
            "P": "Practical/Field"
        },
        "ind_map": {
            "IT": "IT/Tech",
            "BIZ": "Business",
            "DES": "Design",
            "MFG": "Manufacturing/Eng"
        },
        "sum_point1": "Result Summary 1",
        "sum_p1_text": "Our analysis shows that <strong className='text-white font-bold'>{{name}}</strong> resonates most deeply with the <strong>{{persona}}</strong> inclination. Notably, your intrinsic certainty (Career Clarity) was calculated at <strong>{{cvi}} points</strong>. Deconstructing detailed Work Style stats, the <strong>'{{topStyleName}}' inclination stood out most at {{topStyleVal}}%</strong>, followed and supported by the <strong>'{{secondStyleName}}' inclination ({{secondStyleVal}}%)</strong>. Your macroscopic industry synergy driven by data is focused on a hybrid of <strong>{{topIndName}} ({{topIndVal}}%)</strong> and <strong>{{secondIndName}} ({{secondIndVal}}%)</strong> traits. Based on this, you can exert the highest internal certainty and immersion when designing a roadmap for the <strong>{{jobs}}</strong> fields.",
        "sum_point2": "Result Summary 2",
        "sum_p2_text_high": "Excellent major match and clear goal orientation",
        "sum_p2_text_low": "Flexible job adaptability exploring various possibilities",
        "sum_p2_text_common": "(Derived <strong>{{score}}%</strong> based on the job cluster). If you materialize this matching degree through future certifications or internship portfolios, it will serve as a great stepping stone to entering the E-7 visa employment market.",
        "sum_point3": "Result Summary 3",
        "sum_p3_flexible": "Analyzing your system and organizational interaction preferences, you showed a significant receptiveness of <strong>{{val}}%</strong> for 'Horizontal/Startup' centric environments. Researching structurally innovative global venture startups or active corporate cultures rather than strict hierarchies provides a much more advantageous direction.",
        "sum_p3_hierarchical": "Analyzing your organizational culture interactions, you showed strong receptiveness of <strong>{{val}}%</strong> towards stable and systematic environments centered on 'Vertical/Corporate' cultures. We recommend exploring mid-sized to large corporate cultures where systematic processes and reporting structures are well established.",
        "roadmap_title": "Visa & Career Action Roadmap",
        "route_prefix": "Route",
        "target_spec_title": "Target Specification",
        "basic_req": "Basic Requirements",
        "certifications": "Certifications & Tests",
        "tool_stack": "Core Tool Stack",
        "portfolio": "Portfolio & Activity",
        "phase_prefix": "Phase",
        "major_exception_title": "Non-Major Exception Track",
        "major_exception_desc": "Bachelor's+ and 1 yr practical exp OR replaceable via KOTRA Excellence Recommendation",
        "d10_predict_title": "D-10 Prediction",
        "points": " pts",
        "key_quests": "Key Quests",
        "must_tag": "MUST",
        "premium_feature": "Premium Only",
        "red_flag_title": "Visa Rejection Risk Factors",
        "red_flag_desc": "<strong>Serious risks</strong> detected that must be checked before visa application.",
        "extra_desc": "Highlight <strong>{{name}}</strong>'s unique talents to offset any major mismatch."
    };

    data.result = isKo ? resultBlockKo : resultBlockEn;
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Updated ${filename}`);
};

extractAndPatch('src/locales/ko/common.json', true);
extractAndPatch('src/locales/en/common.json', false);
