import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { E7_DB as E7_DB_KO } from '../data/persona_data';
import { E7_DB as E7_DB_EN } from '../data/persona_data_en';

export default function AnalysisSummary({ dashboardData }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isEn = i18n.language === 'en';
    const E7_DB = isEn ? E7_DB_EN : E7_DB_KO;

    if (!dashboardData) return null;
    const { dashboard, diagnosis, baseProfile } = dashboardData;
    const userName = baseProfile?.name || "Guest";

    const sortedInd = dashboard.scoreBreakdown?.industry ? Object.entries(dashboard.scoreBreakdown.industry).sort((a, b) => b[1] - a[1]) : [['BIZ', 50], ['IT', 25]];
    const topIndustry = sortedInd[0];
    const secondIndustry = sortedInd[1];
    const topIndName = t(`result.ind_map.${topIndustry[0]}`);
    const secondIndName = t(`result.ind_map.${secondIndustry[0]}`);
    const topMatchScore = dashboard.mdjm_raw_results?.[0] ? Math.round(dashboard.mdjm_raw_results[0].similarity * 100) : 85;

    const sortedStyle = dashboard.scoreBreakdown?.style ? Object.entries(dashboard.scoreBreakdown.style).sort((a, b) => b[1] - a[1]) : [['A', 40], ['C', 30]];
    const topStyle = sortedStyle[0];
    const secondStyle = sortedStyle[1];

    const topStyleName = t(`result.style_map.${topStyle[0]}`);
    const secondStyleName = t(`result.style_map.${secondStyle[0]}`);

    const isFlexible = diagnosis.culture_fit?.risk_factors?.length > 0;
    const cultureScores = dashboard.scoreBreakdown?.culture || { H: 50, F: 50 };
    const topCultureVal = isFlexible ? cultureScores.F : cultureScores.H;

    const recommendedJobNames = dashboard.recommended_jobs
        ? dashboard.recommended_jobs.map(j => E7_DB[j.code]?.name_ko || j.code).join(', ')
        : dashboard.job_code;

    return (
        <div className="card bg-slate-800/80 border border-white/10 p-8 rounded-3xl mt-12 shadow-xl backdrop-blur-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">📋</span> {t('result.summary_title')}
                </h2>
                <button
                    onClick={() => navigate('/report', { state: { result: dashboardData } })}
                    className="bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-sm px-5 py-2.5 rounded-xl transition-colors border border-white/10 flex items-center gap-2 shadow-sm whitespace-nowrap"
                >
                    <FileText className="w-4 h-4" /> {t('result.view_report')}
                </button>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm md:text-base">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <h3 className="text-kvti-primary font-bold text-lg mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-kvti-primary/20 flex items-center justify-center text-xs">1</span>
                        {t('result.sum_point1')}
                    </h3>
                    <p>
                        <Trans i18nKey="result.sum_p1_text"
                            values={{
                                name: userName,
                                persona: dashboard.persona_title,
                                cvi: dashboard.careerVitalityIndex,
                                topStyleName: topStyleName,
                                topStyleVal: topStyle[1],
                                secondStyleName: secondStyleName,
                                secondStyleVal: secondStyle[1],
                                topIndName: topIndName,
                                topIndVal: topIndustry[1],
                                secondIndName: secondIndName,
                                secondIndVal: secondIndustry[1],
                                jobs: recommendedJobNames
                            }}
                            components={{ strong: <strong className="text-white font-bold" /> }}
                        />
                    </p>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <h3 className="text-blue-400 font-bold text-lg mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs">2</span>
                        {t('result.sum_point2')}
                    </h3>
                    <p>
                        {diagnosis.competence?.korean >= 4 ? t('result.sum_p2_text_high') : t('result.sum_p2_text_low')}
                        {' '}
                        <Trans i18nKey="result.sum_p2_text_common"
                            values={{ name: userName, score: topMatchScore }}
                            components={{ strong: <strong className="text-blue-200" /> }}
                        />
                    </p>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <h3 className="text-pink-400 font-bold text-lg mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-xs">3</span>
                        {t('result.sum_point3')}
                    </h3>
                    {isFlexible ? (
                        <p>
                            <Trans i18nKey="result.sum_p3_flexible"
                                values={{ name: userName, val: Math.round(topCultureVal) }}
                                components={{ strong: <strong className="text-pink-200" /> }}
                            />
                        </p>
                    ) : (
                        <p>
                            <Trans i18nKey="result.sum_p3_hierarchical"
                                values={{ val: Math.round(topCultureVal) }}
                                components={{ strong: <strong className="text-pink-200" /> }}
                            />
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
