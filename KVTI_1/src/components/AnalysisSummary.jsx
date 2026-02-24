import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { E7_DB } from '../data/persona_data';

const IND_NAME_MAP = { IT: 'IT/Tech', BIZ: '비즈니스', DES: '디자인/미디어', MFG: '제조/엔지니어링' };

export default function AnalysisSummary({ dashboardData }) {
    const navigate = useNavigate();

    if (!dashboardData) return null;
    const { dashboard, diagnosis, baseProfile } = dashboardData;
    const userName = baseProfile?.name || "지원자";

    const sortedInd = dashboard.scoreBreakdown?.industry ? Object.entries(dashboard.scoreBreakdown.industry).sort((a, b) => b[1] - a[1]) : [['BIZ', 50], ['IT', 25]];
    const topIndustry = sortedInd[0];
    const secondIndustry = sortedInd[1];
    const topIndName = IND_NAME_MAP[topIndustry[0]] || '비즈니스';
    const secondIndName = IND_NAME_MAP[secondIndustry[0]] || 'IT/Tech';
    const topMatchScore = dashboard.mdjm_raw_results?.[0] ? Math.round(dashboard.mdjm_raw_results[0].similarity * 100) : 85;

    const sortedStyle = dashboard.scoreBreakdown?.style ? Object.entries(dashboard.scoreBreakdown.style).sort((a, b) => b[1] - a[1]) : [['A', 40], ['C', 30]];
    const topStyle = sortedStyle[0];
    const secondStyle = sortedStyle[1];
    const STYLE_NAME_MAP = { A: '분석 및 기획(A)', C: '창의 및 아이디어(C)', P: '현장 및 실행(P)', E: '리더십 및 추진(E)' };
    const topStyleName = STYLE_NAME_MAP[topStyle[0]];
    const secondStyleName = STYLE_NAME_MAP[secondStyle[0]];

    const isFlexible = diagnosis.culture_fit?.risk_factors?.length > 0;
    const cultureScores = dashboard.scoreBreakdown?.culture || { H: 50, F: 50 };
    const topCultureVal = isFlexible ? cultureScores.F : cultureScores.H;

    return (
        <div className="card bg-slate-800/80 border border-white/10 p-8 rounded-3xl mt-12 shadow-xl backdrop-blur-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">📋</span> KVTI 종합 분석 리포트 요약본
                </h2>
                <button
                    onClick={() => navigate('/report', { state: { result: dashboardData } })}
                    className="bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-sm px-5 py-2.5 rounded-xl transition-colors border border-white/10 flex items-center gap-2 shadow-sm whitespace-nowrap"
                >
                    <FileText className="w-4 h-4" /> 종합 분석 리포트 보기
                </button>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm md:text-base">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <h3 className="text-kvti-primary font-bold text-lg mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-kvti-primary/20 flex items-center justify-center text-xs">1</span>
                        직무 및 산업 적합성 종합
                    </h3>
                    <p>
                        분석 결과, {userName}님은 <strong>{dashboard.persona_title}</strong> 성향과 가장 깊이 공명하고 있습니다.
                        특히 눈에 띄는 점은 {userName}님의 <strong>내재적 확신(커리어 선명도)이 {dashboard.careerVitalityIndex}점</strong>으로 산출되었다는 것입니다.
                        세부 업무 스타일(Work Style) 스탯을 분해한 결과, <strong>'{topStyleName}' 성향이 {topStyle[1]}%</strong> 로 가장 두드러지게 나타났고, 그 다음으로 <strong>'{secondStyleName}' 성향({secondStyle[1]}%)</strong>이 이를 뒷받침하고 있습니다.
                        데이터가 도출한 {userName}님의 거시적 산업 시너지는 <strong>{topIndName} 성향({topIndustry[1]}%)</strong>과 <strong>{secondIndName} 성향({secondIndustry[1]}%)</strong>의 하이브리드에 집중되어 있으며,
                        이를 바탕으로 <strong>{dashboard.recommended_jobs ? dashboard.recommended_jobs.map(j => E7_DB[j.code]?.name_ko || j.code).join(', ') : dashboard.job_code}</strong> 분야로 로드맵을 설계할 때 가장 높은 내적 확신과 몰입도를 발휘할 수 있습니다.
                    </p>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <h3 className="text-blue-400 font-bold text-lg mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs">2</span>
                        실무 역량 진단 및 보완 방향성
                    </h3>
                    <p>
                        현재 진단된 한국어 소통 역량은
                        {diagnosis.competence?.korean >= 4 ? " 한국 기업에 즉시 투입되어도 무리가 없을 만큼 훌륭한 기반을 갖추고 있습니다." : " 향후 실무 소통을 위해 꾸준히 어학 능력을 끌어올려 취업 시장에서의 경쟁력을 다져나가야 합니다."}
                        여기에 {userName}님이 보여준 전공 지식과 직무 성향 일치도(<strong>해당 직군 기준 {topMatchScore}% 도출</strong>)를 향후 자격증이나 인턴십 포트폴리오로 구체화해 나간다면, E-7 비자 취업 시장 진입에 훌륭한 디딤돌이 될 것입니다.
                    </p>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <h3 className="text-pink-400 font-bold text-lg mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-xs">3</span>
                        조직 문화 선호도 지표
                    </h3>
                    {diagnosis.culture_fit?.risk_factors && diagnosis.culture_fit.risk_factors.length > 0 ? (
                        <p>
                            {userName}님의 체계 및 조직 상호작용 선호도를 분석한 결과, <strong>'수평적 소통'과 '자율성' 중심의 환경에 무려 {Math.round(topCultureVal)}% 의 유의미한 수용성</strong>을 보였습니다.
                            엄격한 위계질서보다는, 구성원 스스로 문제를 찾고 해결해 나가는 <strong>유연한 글로벌 벤처 스타트업이나 능력 중심의 혁신 기업 문화</strong>를 가진 조직을 타겟으로 리서치하는 것이 훨씬 유리한 방향성을 제시해 줄 수 있습니다.
                        </p>
                    ) : (
                        <p>
                            다양한 조직의 절차와 체계를 이해하고 큰 무리 없이 조화롭게 적응할 수 있는 뛰어난 수용성(<strong>조직 융화력 {Math.round(topCultureVal)}%</strong>)을 확인했습니다.
                            이러한 성향은 보수적인 대기업이나 탄탄한 시스템을 갖춘 중견기업 환경에서도 안정적으로 협업망을 구축하고, 꾸준히 전문성을 쌓아나가는 데 큰 강점으로 작용할 것입니다.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
