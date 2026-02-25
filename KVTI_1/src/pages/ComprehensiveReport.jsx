import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Printer, ArrowLeft, Bookmark, Target, Briefcase, FileCheck, CheckCircle2, ClipboardList } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { generateReportData } from '../utils/reportGenerator';
import kvtiQuestions from '../data/kvti_questions.json';

export default function ComprehensiveReport() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    // Use state to hold the report hash to avoid impure render warnings
    const [reportHash] = React.useState(() => {
        return `KVTI-RPT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    });

    // Parse dynamic KVTI code from previous screen state
    let currentResultCode = "BAF"; // Fallback Test Seed
    const passedState = location.state?.result;

    if (passedState) {
        // Handle variations in how the state was passed (DashboardTop vs AnalysisSummary)
        const dashboardInfo = passedState.dashboard || passedState?.reportData?.dashboard;
        if (dashboardInfo && dashboardInfo.kvti_code) {
            currentResultCode = dashboardInfo.kvti_code.substring(0, 3);
        }
    }

    console.log("Generating Comprehensive Report...", currentResultCode);
    const reportData = generateReportData(currentResultCode, passedState, i18n.language);

    // Prioritize passedState data, fallback to localStorage
    const reportDataFull = passedState?.reportData || passedState;
    const rawAnswers = reportDataFull?.raw_answers || JSON.parse(localStorage.getItem('kvti_answers') || '{}');
    // const mdjmRawResults = passedState?.dashboard?.mdjm_raw_results || reportDataFull?.dashboard?.mdjm_raw_results || [];

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Check if we have RIASEC data
    const mapSubjectToKorean = (subject) => {
        switch (subject) {
            case 'Realistic': return '현실형(R)';
            case 'Investigative': return '탐구형(I)';
            case 'Artistic': return '예술형(A)';
            case 'Social': return '사회형(S)';
            case 'Enterprising': return '진취형(E)';
            case 'Conventional': return '관습형(C)';
            default: return subject;
        }
    };

    const localizedRadarData = (reportDataFull?.diagnosis?.riasec?.radarData || []).map(d => ({
        ...d,
        subject: mapSubjectToKorean(d.subject)
    }));

    const handlePrint = () => {
        window.print();
    };

    const userName = passedState?.baseProfile?.name || "지원자";

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-32 font-serif selection:bg-indigo-200">

            {/* Top Navigation Bar - Hidden on print */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-4 flex justify-between items-center print-hidden transition-all duration-300 shadow-sm">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full text-sm font-medium font-sans"
                >
                    <ArrowLeft className="w-4 h-4" /> {t('common.back', { defaultValue: '뒤로 가기' })}
                </button>
                <div className="text-slate-800 font-bold tracking-widest flex items-center gap-2 font-sans">
                    <div className="w-2 h-2 rounded-full bg-kvti-primary animate-pulse"></div>
                    KVTI COMPREHENSIVE DOSSIER
                </div>
            </nav>

            {/* Floating Print Button - Hidden on print */}
            <button
                onClick={handlePrint}
                className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 max-md:px-4 max-md:py-3 max-md:bottom-4 max-md:right-4 max-md:scale-90 rounded-full shadow-2xl transition-all transform hover:scale-105 print-hidden print:hidden font-sans"
            >
                <Printer className="w-5 h-5" />
                <span className="font-bold tracking-wide">리포트 다운로드 (PDF)</span>
            </button>

            {/* Main Report Container - Styled to look like a physical document */}
            <main className="pt-32 px-4 sm:px-12 md:px-24 max-w-4xl mx-auto space-y-24 bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none print:pt-0">

                {/* ==========================================
                    Document Header Profile
                ========================================== */}
                <div className="border-b-4 border-slate-900 pb-12 mb-16">
                    <p className="text-sm font-bold tracking-[0.3em] text-slate-500 uppercase mb-4 font-sans">
                        {t('report_ui.title_sub', { defaultValue: 'Confidential Assessment Report' })}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tight mt-6 whitespace-pre-line">
                        {t('report_ui.title_main', { defaultValue: 'KVTI 심층 커리어\n진단 결과 보고서' })}
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8 justify-between items-start mt-12 bg-slate-100 p-8 rounded-lg">
                        <div className="space-y-4 font-sans focus:outline-none">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest w-24">{t('report_ui.issue_number', { defaultValue: '발급 번호' })}</span>
                                <span className="font-mono text-slate-900 font-bold">{reportHash}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest w-24">{t('report_ui.diagnosis_result', { defaultValue: '진단 결과' })}</span>
                                <span className="text-lg font-black text-indigo-700 tracking-widest">{reportData.kvtiCode}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest w-24">{t('report_ui.applicant_trait', { defaultValue: '지원자 특성' })}</span>
                                <span className="text-base font-bold text-slate-800">{reportData.personaTitle}</span>
                            </div>
                            {passedState?.dashboard?.careerVitalityIndex && (
                                <div className="flex items-center gap-4 mt-2 group relative">
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest w-24 truncate">{t('report_ui.career_vitality', { defaultValue: '커리어 선명도' })}</span>
                                    <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden shrink-0 min-w-0">
                                        <div
                                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full relative"
                                            style={{ width: `${Math.min(100, Math.max(0, reportDataFull.dashboard.careerVitalityIndex))}%` }}>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-slate-800 ml-2">{passedState.dashboard.careerVitalityIndex}{t('common.points', { defaultValue: '점' })}</span>
                                </div>
                            )}
                        </div>
                        <div className="text-right shrink-0">
                            <img src="/assets/logo/cuty_logo_dark.svg" alt="CUTY" className="h-8 opacity-50 mb-2 grayscale" />
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-sans font-bold mt-2">{t('report_ui.global_center', { defaultValue: 'Global Career Center' })}</p>
                        </div>
                    </div>
                </div>

                {/* Score Breakdown visuals will now be rendered inline within the Deep Dive section */}

                {/* ==========================================
                    Section 1: KVTI Introduction
                ========================================== */}
                <section className="space-y-8 leading-loose text-lg text-slate-800">
                    <h2 className="text-2xl font-black text-slate-900 border-l-4 border-indigo-600 pl-4 mb-8 font-sans leading-snug">
                        {t('report_ui.section1_title', { defaultValue: 'I. 서론: 대한민국 유학생 커리어 생존 지표' })}
                    </h2>
                    <p className="indent-8 text-justify">
                        {t('report_ui.section1_p1', { defaultValue: 'KVTI(Korea Visa Type Indicator) 분석 모델은 최신 한국 노동 시장의 트렌드 데이터와 심리학적 행동 지표를 기반으로 설계된 초정밀 커리어 진단 시스템입니다. 외국인 유학생이 한국 사회에서 자신의 강점을 발휘하기 위해 필수적으로 요구되는 핵심 진단 지표(산업 적합도, 직무 성향, 조직 문화 융화력 등)를 다각도에서 분석하여 지원자 고유의 성향 지도를 도출합니다.' })}
                    </p>
                    <p className="indent-8 text-justify" dangerouslySetInnerHTML={{ __html: t('report_ui.section1_p2', { userName: userName, defaultValue: `본 진단 보고서는 지원자의 잠재력을 가장 잘 시너지화 할 수 있는 페르소나를 매칭합니다. 이를 바탕으로 <strong>대한민국 법무부가 공식적으로 허가한 체류 자격(전문취업 E-7, 기술창업 D-8, 우수인재거주 F-2 등)의 광범위한 범주 내에서, 제약 조건을 극복하고 지원자의 성향과 가치관에 가장 완벽하게 부합하는 최적의 커리어 패스</strong>를 찾아냅니다. 이 보고서에 담긴 분석과 추천 로드맵은 ${userName}님이 한국이라는 낯선 환경 속에서 어떻게 자신만의 고유한 무기를 활용하여 최고의 직무 만족도를 달성할 수 있을지에 대한 가장 현실적이고 주도적인 해답이 될 것입니다.` }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}>
                    </p>
                </section>

                {/* ==========================================
                    Section 2: Deep Dive User Analysis
                ========================================== */}
                <section className="space-y-12 leading-loose text-lg text-slate-800 page-break-before">
                    <h2 className="text-2xl font-black text-slate-900 border-l-4 border-indigo-600 pl-4 mb-12 font-sans">
                        {t('report_ui.section2_title', { defaultValue: 'II. 지원자(Applicant) 심층 성향 분석' })}
                    </h2>

                    {/* NEW RADAR CHART GRID */}
                    {localizedRadarData && localizedRadarData.length > 0 && (
                        <div className="mb-12 bg-white border border-slate-200 p-8 md:p-12 shadow-sm rounded-xl print:shadow-none print:border-slate-300">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 font-sans flex items-center gap-3 border-b border-slate-100 pb-4">
                                <Target className="w-6 h-6 shrink-0 text-indigo-600" /> {t('report_ui.radar_title', { defaultValue: '종합 커리어 흥미도 (RIASEC 다차원 모델)' })}
                            </h3>
                            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                                <div className="w-full lg:w-1/2 h-80 -ml-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={localizedRadarData}>
                                            <PolarGrid stroke="#e2e8f0" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 13, fontWeight: 'bold' }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 115]} ticks={[20, 40, 60, 80, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                            <Radar name="성향 점수" dataKey="A" stroke="#6366f1" strokeWidth={2} fill="#818cf8" fillOpacity={0.4} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                formatter={(value) => [`${value}${t('common.points', { defaultValue: '점' })}`, "Score"]}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="w-full lg:w-1/2 flex items-center justify-center">
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                                            <div className="font-extrabold text-indigo-700 flex items-center gap-2 mb-1">
                                                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded">R</span>{t('report_ui.radar_r', { defaultValue: '현실형 (Realistic)' })}
                                            </div>
                                            <p className="text-slate-600 leading-snug">{t('report_ui.radar_r_desc', { defaultValue: '현장 중심·가시적 결과물 선호 (제조, 기계, 설비, 뿌리산업 최적화)' })}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                                            <div className="font-extrabold text-indigo-700 flex items-center gap-2 mb-1">
                                                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded">I</span>{t('report_ui.radar_i', { defaultValue: '탐구형 (Investigative)' })}
                                            </div>
                                            <p className="text-slate-600 leading-snug">{t('report_ui.radar_i_desc', { defaultValue: '데이터 분석·논리적 접근 선호 (IT, 연구지식, 데이터, 프로그래밍 최적화)' })}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                                            <div className="font-extrabold text-indigo-700 flex items-center gap-2 mb-1">
                                                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded">A</span>{t('report_ui.radar_a', { defaultValue: '예술형 (Artistic)' })}
                                            </div>
                                            <p className="text-slate-600 leading-snug">{t('report_ui.radar_a_desc', { defaultValue: '창의성·사용자(UX) 및 심미성 중시 (디자인, 콘텐츠, 마케팅, 미디어 최적화)' })}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                                            <div className="font-extrabold text-indigo-700 flex items-center gap-2 mb-1">
                                                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded">S</span>{t('report_ui.radar_s', { defaultValue: '사회형 (Social)' })}
                                            </div>
                                            <p className="text-slate-600 leading-snug">{t('report_ui.radar_s_desc', { defaultValue: '이해심·소통 및 협업 역량 우수 (서비스, 교육, 의료지원, 인사/CS 최적화)' })}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                                            <div className="font-extrabold text-indigo-700 flex items-center gap-2 mb-1">
                                                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded">E</span>{t('report_ui.radar_e', { defaultValue: '진취형 (Enterprising)' })}
                                            </div>
                                            <p className="text-slate-600 leading-snug">{t('report_ui.radar_e_desc', { defaultValue: '목표 지향·리더십 및 추진력 발휘 (경영, 무역영업, 글로벌사업 추진 최적화)' })}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                                            <div className="font-extrabold text-indigo-700 flex items-center gap-2 mb-1">
                                                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded">C</span>{t('report_ui.radar_c', { defaultValue: '관습형 (Conventional)' })}
                                            </div>
                                            <p className="text-slate-600 leading-snug">{t('report_ui.radar_c_desc', { defaultValue: '규칙 준수·오차 없는 행정력 강점 (재무회계, 생산관리, 문서지원 최적화)' })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 mb-12 rounded-xl">
                        <h3 className="text-xl font-bold text-indigo-800 mb-6 font-sans flex items-center gap-3">
                            <Bookmark className="w-6 h-6 shrink-0" /> {t('report_ui.factor_interpretation', { defaultValue: '세부 지표(Factor) 분해능 해석' }).replace('세부', '심층 성향 종합 소견').replace('분해능 해석', '')}
                        </h3>
                        {/* Dynamically generated summary prose from backend-prep logic with inline charts */}
                        <div className="space-y-10">
                            {(() => {
                                // Fallback for cached states during dev
                                const opinionData = reportData.comprehensiveOpinion || reportData.summaryText.split('\n\n').map((txt, i) => ({
                                    id: i === 0 ? 'intro' : i === 1 ? 'industry' : i === 2 ? 'competence_culture' : 'roadmap_outro',
                                    content: txt
                                }));

                                return opinionData.map((section, index) => {
                                    // Extract chart data
                                    const industryData = passedState?.dashboard?.scoreBreakdown?.industry;
                                    const styleData = passedState?.dashboard?.scoreBreakdown?.style;
                                    const cultureData = passedState?.dashboard?.scoreBreakdown?.culture;
                                    // const residencyData = passedState?.dashboard?.scoreBreakdown?.residency || { K: 50, G: 50 };

                                    const renderChart = (title, data, labels, colorMatched, colorDefault, matchKey, type) => {
                                        if (!data) return null;
                                        return (
                                            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mt-6">
                                                <div className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">{title}</div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {Object.entries(data)
                                                        .sort(([, a], [, b]) => b - a)
                                                        .map(([key, val]) => (
                                                            <div key={key} className="flex items-center gap-3 text-sm font-medium">
                                                                <span className="w-14 font-bold text-slate-600 text-right">
                                                                    {type === 'industry' ? key : (labels[key] || key)}
                                                                </span>
                                                                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden flex items-center border border-slate-200 relative">
                                                                    <div
                                                                        className={`h-full opacity-90 transition-all duration-1000 ease-out ${key === matchKey || (type === 'industry' && key.charAt(0) === matchKey) ? colorMatched : colorDefault}`}
                                                                        style={{ width: `${Math.max(val, 2)}%` }}>
                                                                    </div>
                                                                </div>
                                                                <span className="w-10 text-right text-slate-800 font-bold text-sm">{val}%</span>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        );
                                    };

                                    return (
                                        <div key={section.id || index} className="space-y-4">
                                            {/* Render Title if it exists */}
                                            {section.title && (
                                                <h4 className="text-lg font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-2">
                                                    {section.title}
                                                </h4>
                                            )}

                                            {/* Contextual Chart Injection natively standardized by ID */}
                                            {section.id === 'vitality' && (
                                                <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-100 shadow-sm mt-4">
                                                    <div className="flex justify-between items-end mb-8">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                                                                <span className="text-2xl">⚡</span>
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t('report_ui.vitality_index', { defaultValue: '종합 커리어 선명도 (Career Clarity Index)' })}</div>
                                                                <div className="text-4xl font-black text-slate-900 mt-1 flex items-baseline gap-1">{passedState?.dashboard?.careerVitalityIndex || 50}<span className="text-base font-bold text-slate-400 ml-1">{t('common.points', { defaultValue: '점' })}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="relative pt-2 pb-6 px-1">
                                                        {/* Phase Labels */}
                                                        <div className="absolute -top-5 left-0 w-full text-[11px] font-bold text-slate-400">
                                                            <div className="absolute left-[20%] -translate-x-1/2">{t('report_ui.phase_redefine', { defaultValue: '재정립기' })}</div>
                                                            <div className="absolute left-[50%] -translate-x-1/2 text-sky-600">{t('report_ui.phase_explore', { defaultValue: '탐색기' })}</div>
                                                            <div className="absolute left-[70%] -translate-x-1/2 text-indigo-500">{t('report_ui.phase_stable', { defaultValue: '안정권' })}</div>
                                                            <div className="absolute left-[90%] -translate-x-1/2 text-indigo-700">{t('report_ui.phase_establish', { defaultValue: '확립기' })}</div>
                                                        </div>

                                                        {/* The Main Progress Bar */}
                                                        <div className="relative w-full h-4 bg-slate-100 rounded-full flex items-center border border-slate-200 z-10">
                                                            <div
                                                                className={`h-full rounded-full opacity-90 transition-all duration-1000 ease-out ${(passedState?.dashboard?.careerVitalityIndex || 50) >= 80 ? 'bg-indigo-600' :
                                                                    (passedState?.dashboard?.careerVitalityIndex || 50) >= 60 ? 'bg-indigo-500' :
                                                                        (passedState?.dashboard?.careerVitalityIndex || 50) >= 40 ? 'bg-sky-500' : 'bg-slate-400'
                                                                    }`}
                                                                style={{ width: `${Math.max(passedState?.dashboard?.careerVitalityIndex || 50, 0)}%` }}>
                                                            </div>
                                                        </div>

                                                        {/* Tick Marks & Numbers below the bar */}
                                                        <div className="absolute top-6 left-0 w-full text-[10px] font-semibold text-slate-400">
                                                            <div className="absolute left-[40%] -translate-x-1/2 flex flex-col items-center">
                                                                <div className="h-2 w-px bg-slate-300 mb-1"></div>
                                                                <span>40</span>
                                                            </div>
                                                            <div className="absolute left-[60%] -translate-x-1/2 flex flex-col items-center">
                                                                <div className="h-2 w-px bg-slate-300 mb-1"></div>
                                                                <span>60</span>
                                                            </div>
                                                            <div className="absolute left-[80%] -translate-x-1/2 flex flex-col items-center">
                                                                <div className="h-2 w-px bg-slate-300 mb-1"></div>
                                                                <span>80</span>
                                                            </div>
                                                        </div>

                                                        {/* Current Score Indicator Node */}
                                                        <div
                                                            className="absolute top-4 -translate-y-1/2 -ml-2.5 w-5 h-5 bg-white border-[3px] border-indigo-600 rounded-full shadow-sm z-20 transition-all duration-1000 ease-out"
                                                            style={{ left: `${Math.max(passedState?.dashboard?.careerVitalityIndex || 50, 0)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}

                                            {section.id === 'industry' && (
                                                renderChart(
                                                    t('report_ui.industry_pref', { defaultValue: '타겟 산업군 선호도 (Industry)' }),
                                                    industryData,
                                                    {},
                                                    'bg-indigo-600', 'bg-slate-300', reportData.kvtiCode.charAt(0), 'industry'
                                                )
                                            )}

                                            {section.id === 'style' && (
                                                <div className="space-y-4">
                                                    {renderChart(
                                                        t('report_ui.work_style', { defaultValue: '세부 업무 스타일 (Work Style)' }),
                                                        styleData,
                                                        { 'A': t('report_ui.style_a', { defaultValue: '분석(A)' }), 'C': t('report_ui.style_c', { defaultValue: '창의(C)' }), 'P': t('report_ui.style_p', { defaultValue: '현장(P)' }), 'E': t('report_ui.style_e', { defaultValue: '리더(E)' }) },
                                                        'bg-rose-500', 'bg-slate-300', reportData.kvtiCode.charAt(1), 'style'
                                                    )}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-sm">
                                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-rose-200 transition-colors">
                                                            <div className="font-extrabold text-rose-700 flex items-center gap-2 mb-1">
                                                                <span className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded">A</span>{t('report_ui.style_a', { defaultValue: '분석형 (Analyst)' })}
                                                            </div>
                                                            <p className="text-slate-600 leading-snug">{t('report_ui.style_a_desc', { defaultValue: '데이터 기반으로 치밀하고 꼼꼼하게 문제를 해결하는 스타일' })}</p>
                                                        </div>
                                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-rose-200 transition-colors">
                                                            <div className="font-extrabold text-rose-700 flex items-center gap-2 mb-1">
                                                                <span className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded">C</span>{t('report_ui.style_c', { defaultValue: '창의형 (Creator)' })}
                                                            </div>
                                                            <p className="text-slate-600 leading-snug">{t('report_ui.style_c_desc', { defaultValue: '새로운 아이디어를 기획하고 독창적인 결과물을 만드는 스타일' })}</p>
                                                        </div>
                                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-rose-200 transition-colors">
                                                            <div className="font-extrabold text-rose-700 flex items-center gap-2 mb-1">
                                                                <span className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded">P</span>{t('report_ui.style_p', { defaultValue: '현장형 (Practical)' })}
                                                            </div>
                                                            <p className="text-slate-600 leading-snug">{t('report_ui.style_p_desc', { defaultValue: '직접 몸으로 부딪히며 현장의 실무를 빠르고 정확하게 처리하는 스타일' })}</p>
                                                        </div>
                                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-rose-200 transition-colors">
                                                            <div className="font-extrabold text-rose-700 flex items-center gap-2 mb-1">
                                                                <span className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded">E</span>{t('report_ui.style_e', { defaultValue: '리더형 (Execution)' })}
                                                            </div>
                                                            <p className="text-slate-600 leading-snug">{t('report_ui.style_e_desc', { defaultValue: '타인을 설득하고 프로젝트를 주도적으로 이끌어가는 실행 중심 스타일' })}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {section.id === 'culture' && (
                                                <div className="mt-4">
                                                    {renderChart(
                                                        t('report_ui.culture_fit', { defaultValue: '조직 문화 적합성 (Culture Fit)' }),
                                                        cultureData,
                                                        { 'H': '수직(H)', 'F': '수평(F)' },
                                                        'bg-emerald-500', 'bg-slate-300', reportData.kvtiCode.charAt(2), 'culture'
                                                    )}
                                                </div>
                                            )}

                                            {/* Text Rendered AFTER the visual data */}
                                            <p className="text-slate-800 font-medium leading-loose text-justify whitespace-pre-line mt-6">
                                                {section.content}
                                            </p>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-6 font-sans">
                        {t('report_ui.factor_interpretation', { defaultValue: '세부 지표(Factor) 분해능 해석' })}
                    </h3>

                    <div className="space-y-10">
                        {reportData.factorDetails.map((factor, idx) => (
                            <div key={idx} className="border-b border-slate-200 pb-8 last:border-0">
                                <h4 className="flex items-baseline gap-3 text-lg font-bold text-slate-900 mb-4 font-sans">
                                    <span className="text-3xl font-black text-indigo-600">{factor.letter}</span>
                                    <span>{factor.axisName}: <span className="text-indigo-700">[{factor.title}]</span>형</span>
                                </h4>
                                <p className="text-justify leading-relaxed whitespace-pre-wrap">
                                    {factor.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ==========================================
                    Section 3: Job & Visa Details
                ========================================== */}
                <section className="space-y-16 leading-loose text-lg text-slate-800 page-break-before">
                    <h2 className="text-2xl font-black text-slate-900 border-l-4 border-indigo-600 pl-4 mb-16 font-sans">
                        {t('report_ui.section3_title', { defaultValue: 'III. 매칭 완료: 성향 기반 최적 진로 및 대표 직무 가이드' })}
                    </h2>

                    <p className="text-justify mb-16" dangerouslySetInnerHTML={{ __html: t('report_ui.section3_p1', { defaultValue: '앞서 진행된 성향 분석 모형을 알고리즘으로 매칭하여, 응답자의 성향 및 가치관과 가장 잘 부합하는 상위 3개의 전략적 접근 직군을 도출하였습니다. 본 가이드는 현실적인 취업 비자(E-7 등) 취득 모델을 기준으로 작성되었으나, 개인의 역량과 조건에 따라 창업(D-8) 및 장기 체류(F-시리즈) 등 다각도의 진로 확장성을 내포하고 있습니다. 아래 각 항목은 해당 직군에 진입하기 위한 <strong>법무부 공식 사증 심사 기준의 예시</strong>와, 잠재력을 극대화하기 위해 미리 계획해야 할 <strong>실전 코어 역량 가이드라인</strong>입니다.' }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}>
                    </p>

                    <div className="space-y-24">
                        {reportData.topJobs.map((job, idx) => (
                            <div key={idx} className="relative">

                                {/* Subheader Title */}
                                <div className="mb-10 font-sans">
                                    <div className="flex items-center gap-4 mb-4">
                                        {idx === 0 && (
                                            <span className="bg-indigo-600 text-white font-bold px-4 py-1 text-sm tracking-wider uppercase">
                                                {t('report_ui.top_priority', { defaultValue: '1순위 최우선 타겟 직무' })}
                                            </span>
                                        )}
                                        <span className="text-indigo-700 font-bold border border-indigo-300 px-3 py-1 text-sm bg-indigo-50">
                                            {job.visaType} (Code {job.code})
                                        </span>
                                        <span className="text-slate-500 font-bold px-3 py-1 text-sm bg-slate-100 hidden sm:inline-block">
                                            {t('report_ui.job_readiness', { defaultValue: '성향 직무 적합도' })} {job.readiness}%
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 leading-tight">
                                        {idx + 1}. {job.title_ko}
                                        {job.title_en && (
                                            <span className="block text-xl font-normal text-slate-500 mt-2 font-serif">{job.title_en}</span>
                                        )}
                                    </h3>
                                </div>

                                {/* NEW: Special Visa Strategy Callout */}
                                {job.specialNote && (
                                    <div className="mb-10 bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm flex items-start gap-4">
                                        <div className="bg-amber-100 text-amber-600 p-3 rounded-full shrink-0">
                                            <span className="text-xl">💡</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-amber-900 mb-2 font-sans">{t('report_ui.special_guide', { defaultValue: '유학생 특별 진입 전략 가이드' })}</h4>
                                            <p className="text-amber-800 font-medium text-justify leading-relaxed">
                                                {job.specialNote}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Text Body */}
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 font-sans">
                                            <Briefcase className="w-5 h-5 text-indigo-600" /> {t('report_ui.job_def', { visaType: job.visaType.split(' ')[0], defaultValue: `[1] 특정활동(${job.visaType.split(' ')[0]}) 분야 직무 정의` })}
                                        </h4>
                                        <p className="indent-4 text-justify bg-slate-50 p-6 border-l-2 border-slate-300 font-medium">
                                            {job.lawDefinition}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 font-sans mt-10">
                                            <FileCheck className="w-5 h-5 text-indigo-600" /> {t('report_ui.visa_reqs', { defaultValue: '[2] 출입국관리법 심사 및 발급 요건 제한' })}
                                        </h4>
                                        <ul className="list-disc pl-8 space-y-4 text-justify marker:text-indigo-600">
                                            <li>
                                                <strong>{t('report_ui.req_edu', { defaultValue: '학위 및 전공 특례 요구사항:' })}</strong> {job.visaRequirements.education}
                                            </li>
                                            <li>
                                                <strong>{t('report_ui.req_salary', { defaultValue: '안심 임금 수준 제약(GNI 연동):' })}</strong> {job.visaRequirements.salary}
                                            </li>
                                            <li>
                                                <strong>{t('report_ui.req_employer', { defaultValue: '고용 기업의 국민고용보호 심사 장벽:' })}</strong> {job.visaRequirements.employer}
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Existing Competencies List with Integrated DB Fields */}
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 font-sans mt-10">
                                            <Target className="w-5 h-5 text-indigo-600" /> {t('report_ui.core_comp', { defaultValue: '[3] 비자취득 및 관련 산업 취업을 위한 전략적 핵심 역량 (Core Competency)' })}
                                        </h4>
                                        <ul className="mb-8 space-y-6">
                                            {/* 1. Base hardcoded competencies from generator */}
                                            {job.requiredCompetencies.map((reqTxt, i) => (
                                                <li key={i} className="flex items-start gap-4">
                                                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                                                    <div className="text-justify font-sans text-slate-700">
                                                        {reqTxt}
                                                    </div>
                                                </li>
                                            ))}

                                            {/* 2. Formal Text Integration of Database Fields */}
                                            {job.certifications && job.certifications.length > 0 && (
                                                <li className="flex items-start gap-4">
                                                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                                                    <div className="text-justify font-sans text-slate-700">
                                                        <strong>{t('report_ui.rec_cert', { defaultValue: '권장 자격 및 면허 요건:' })}</strong> {job.certifications.join(', ')} {t('report_ui.rec_cert_desc', { defaultValue: '등의 직무 관련 전문 자격 취득을 통해 역량을 공식화하는 것이 강력히 권장됩니다.' })}
                                                    </div>
                                                </li>
                                            )}
                                            {job.tools && job.tools.length > 0 && (
                                                <li className="flex items-start gap-4">
                                                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                                                    <div className="text-justify font-sans text-slate-700">
                                                        <strong>{t('report_ui.rec_tools', { defaultValue: '실무 기술 스택 및 활용 툴:' })}</strong> {job.tools.join(', ')} {t('report_ui.rec_tools_desc', { defaultValue: '등의 핵심 소프트웨어 및 장비 운용 능력을 필수적으로 갖추어야 합니다.' })}
                                                    </div>
                                                </li>
                                            )}
                                            {job.portfolio && job.portfolio.length > 0 && (
                                                <li className="flex items-start gap-4">
                                                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                                                    <div className="text-justify font-sans text-slate-700">
                                                        <strong>{t('report_ui.rec_port', { defaultValue: '실전 포트폴리오 구축 방향성:' })}</strong> {job.portfolio.join(', ')} {t('report_ui.rec_port_desc', { defaultValue: '등과 같은 구체적이고 실증적인 실무 프로젝트 결과물을 선제적으로 구축하여 객관적 증빙 자료로 활용해야 합니다.' })}
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* NEW: [4] Actionable Timeline Integrated into Job Guide */}
                                    {(() => {
                                        // Safely extract roadmap steps for the current job index
                                        const rawRoadmapData = reportDataFull?.roadmap || [];
                                        const parsedRoadmaps = Array.isArray(rawRoadmapData) && rawRoadmapData.length > 0 && rawRoadmapData[0].steps
                                            ? rawRoadmapData
                                            : [{ title: '추천 직무', steps: rawRoadmapData }];

                                        // If we don't have enough roadmaps, default to the first one safely
                                        const currentRoadmap = parsedRoadmaps[idx] || parsedRoadmaps[0];

                                        if (!currentRoadmap || !currentRoadmap.steps || currentRoadmap.steps.length === 0) return null;

                                        return (
                                            <div>
                                                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-sans mt-12 border-t border-slate-200 pt-8">
                                                    <Target className="w-5 h-5 text-indigo-600" /> {t('report_ui.action_timeline', { defaultValue: '[4] 단계별 비자 서바이벌 통합 로드맵 (Actionable Timeline)' })}
                                                </h4>
                                                <div className="space-y-6">
                                                    {currentRoadmap.steps.map((step, sIdx) => {
                                                        const cleanTitle = step.stage.replace(/Step \d+\.\s*/, '').trim();
                                                        return (
                                                            <div key={sIdx} className="bg-slate-50 border border-slate-200 p-5 rounded-lg flex flex-col gap-3">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="bg-indigo-600 text-white font-bold px-3 py-1 rounded text-xs tracking-widest uppercase">
                                                                        {t('common.phase_prefix', { defaultValue: 'Phase' })} {sIdx + 1}
                                                                    </span>
                                                                    <h5 className="font-bold text-slate-800 text-md">{cleanTitle}</h5>
                                                                </div>

                                                                {/* Formatted Text List of Tasks */}
                                                                {step.action_items && step.action_items.length > 0 && (
                                                                    <ul className="list-disc pl-10 space-y-2 marker:text-indigo-400">
                                                                        {step.action_items.map((item, iIdx) => {
                                                                            const isUrgent = item.priority === 'High';
                                                                            return (
                                                                                <li key={iIdx} className="text-slate-700 font-sans text-sm leading-relaxed">
                                                                                    {isUrgent && <strong className="text-rose-600 mr-1">[핵심/필수]</strong>}
                                                                                    <span dangerouslySetInnerHTML={{ __html: item.task }} />
                                                                                </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        );
                                                    })}

                                                    {/* Red Flag Warning Box */}
                                                    <blockquote className="mt-6 border-l-4 border-rose-500 bg-rose-50 p-4 text-rose-900 rounded-r-lg font-sans">
                                                        <strong className="block mb-1 flex items-center gap-2">
                                                            <span className="text-lg">🚨</span> {t('report_ui.red_flag', { defaultValue: '법무부 체류 자격 박탈 (Red Flag) 사전 경고' })}
                                                        </strong>
                                                        <span className="text-sm leading-relaxed">
                                                            {t('report_ui.red_flag_desc', { defaultValue: '진로 준비 중 단 100만 원 미만의 가벼운 범칙금(무단횡단, 전동킥보드 불법운행, 불법 아르바이트 등) 납부 기록이 발생하더라도, 향후 F-2-7 거주 비자 전환 시 치명적인 감점 요소로 작용하여 한국 내 장기 정주가 원천적으로 차단될 수 있습니다. 엄격한 법규 준수는 커리어 설계의 최우선 기본 스펙입니다.' })}
                                                        </span>
                                                    </blockquote>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>

                                {idx !== reportData.topJobs.length - 1 && (
                                    <div className="w-full text-center my-16 opacity-30">
                                        * * * * *
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ==========================================
                    Section 5: Conclusion
                ========================================== */}
                <section className="space-y-8 leading-loose text-lg text-slate-800 page-break-before pb-24">
                    <h2 className="text-2xl font-black text-slate-900 border-l-4 border-indigo-600 pl-4 mb-12 font-sans">
                        {t('report_ui.section4_title', { defaultValue: 'VI. 결론 및 향후 과제: 주도적 커리어 로드맵 수립' })}
                    </h2>

                    <p className="indent-8 text-justify">
                        {t('report_ui.section4_p1', { defaultValue: '본 진단 보고서에서 제시한 전략과 직무 추천은 성공을 위한 첫 번째 청사진(Blueprint)에 불과합니다. 취업과 비자 취득이라는 최종 목표를 달성하기 위해서는 규정된 법적 요건과 자신의 개인적 성향을 완벽하게 융합시키는 집중화된 커리어 스펙 구축이 최우선되어야 합니다.' })}
                    </p>

                    <p className="indent-8 text-justify mt-6" dangerouslySetInnerHTML={{ __html: t('report_ui.section4_p2', { userName: userName, defaultValue: `당사는 ${userName}님의 성공적인 정착을 지원하기 위하여, 본 진단 결과를 토대로 한 <strong>'개인 맞춤형 시계열 로드맵 구축 시스템(Comprehensive Timeline Builder)'</strong>을 향후 정비하여 제공할 예정입니다. 1학년 1학기부터 상시 퀘스트 기반으로 제공될 이 시스템을 통해 체계적인 한국 생활 설계를 완성하시기 바랍니다.` }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}>
                    </p>

                    <div className="mt-24 pt-12 border-t border-slate-300 text-center font-sans">
                        <p className="text-xl font-bold text-slate-900 mb-2">KVTI AI Analysis Engine</p>
                        <p className="text-slate-500 uppercase tracking-widest text-sm mb-8">End of Assessment Report</p>

                        <div className="inline-block p-4 border-4 border-double border-slate-300">
                            <span className="font-serif italic text-2xl font-bold text-slate-400">{t('report_ui.verified_confidential', { defaultValue: 'Verified Confidential' })}</span>
                        </div>
                    </div>
                </section>

                {/* ==========================================
                    Section 5: Appendix: Questionnaire Responses
                ========================================== */}
                <section className="space-y-8 leading-loose text-lg text-slate-800 page-break-before pb-32">
                    <h2 className="text-2xl font-black text-slate-900 border-l-4 border-indigo-600 pl-4 mb-8 font-sans flex items-center gap-3">
                        <ClipboardList className="w-8 h-8 text-indigo-600" />
                        {t('report_ui.section5_title', { defaultValue: '부록: 심층 진단 원본 응답 데이터 (Appendix)' })}
                    </h2>
                    <p className="text-justify mb-8 text-base">
                        {t('report_ui.section5_p1', { defaultValue: '본 종합 진단 결과는 지원자가 입력한 아래의 설문 데이터를 기초로 도출되었습니다. 각 문항에 대한 응답은 E-7 비자 적합도 및 최적 직무 매칭 알고리즘의 핵심 변수로 활용되었습니다.' })}
                    </p>

                    <div className="space-y-12">
                        {Object.entries(kvtiQuestions).map(([sectionKey, questions]) => {
                            const sectionTitles = {
                                part1_riasec: t('report_ui.q_sec1', { defaultValue: "1. 직무 성향 및 흥미 (RIASEC)" }),
                                part2_competency: t('report_ui.q_sec2', { defaultValue: "2. 핵심 역량 및 준비도 (Competency)" }),
                                part3_job_pref: t('report_ui.q_sec3', { defaultValue: "3. 선호 직무 분류 (Job Preference)" }),
                                part4_industry_pref: t('report_ui.q_sec4', { defaultValue: "4. 선호 산업 분야 (Industry Preference)" }),
                                part5_org_culture: t('report_ui.q_sec5', { defaultValue: "5. 조직 문화 적합성 (Organizational Culture)" }),
                                part6_residency: t('report_ui.q_sec6', { defaultValue: "6. 한국 정주 의지 및 정착 계획 (Residency)" })
                            };

                            const validQuestions = questions.filter(q => q && q.id && q.id !== "ID" && q.type !== "코드" && !q.question?.includes("개발자 가이드") && !(q.question === null && q.type === 'select'));

                            if (validQuestions.length === 0) return null;

                            return (
                                <div key={sectionKey} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 shrink-inside-avoid">
                                    <h3 className="text-[1.1rem] font-bold text-indigo-900 mb-6 font-sans border-b border-indigo-100 pb-3">
                                        {sectionTitles[sectionKey] || sectionKey}
                                    </h3>
                                    <div className="space-y-2">
                                        {validQuestions.map((q, qIdx) => {
                                            const ansValue = rawAnswers[q.id];
                                            let displayAnswer = t('report_ui.q_no_response', { defaultValue: "미응답" });
                                            let answerClass = "text-slate-400 font-normal";

                                            if (ansValue !== undefined) {
                                                if (q.options && q.options.length > 0) {
                                                    const selectedOpt = q.options.find(opt => String(opt.value) === String(ansValue));
                                                    displayAnswer = selectedOpt ? selectedOpt.label : ansValue;
                                                    answerClass = "text-indigo-700 font-bold bg-indigo-100/50 px-3 py-1 rounded-md text-sm";
                                                } else {
                                                    // Likert scale 1-5
                                                    displayAnswer = `${ansValue}점`;
                                                    answerClass = ansValue >= 4 ? "text-emerald-700 font-bold bg-emerald-100 px-3 py-1 rounded-md text-sm"
                                                        : ansValue <= 2 ? "text-rose-700 font-bold bg-rose-100 px-3 py-1 rounded-md text-sm"
                                                            : "text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-md text-sm";
                                                }
                                            }

                                            return (
                                                <div key={q.id} className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 py-3 border-b border-slate-200/50 last:border-0 hover:bg-white transition-colors px-2 rounded-lg">
                                                    <div className="flex-1 text-[15px] text-slate-700 leading-snug">
                                                        <span className="text-slate-400 text-sm font-mono mr-3 font-bold">Q{qIdx + 1}.</span>
                                                        {q.question ? q.question.replace(/^\[.*?\]\s*/, '') : '-'}
                                                    </div>
                                                    <div className="shrink-0 lg:max-w-xs text-right self-end lg:self-center">
                                                        <span className={`inline-block ${answerClass}`}>{displayAnswer}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

            </main>
        </div >
    );
}
