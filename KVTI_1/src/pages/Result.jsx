import { useMemo } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardTop from "../components/DashboardTop";
import RoadmapTimeline from "../components/RoadmapTimeline";
import { calculateKvtiResult } from '../utils/kvtiLogic';

function Result() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'ko';

  const result = useMemo(() => {
    if (location.state?.answers) {
      return calculateKvtiResult(
        location.state.answers,
        location.state.diagnosticGrade,
        location.state.phase0Data,
        lang
      );
    }
    return location.state?.result;
  }, [location.state, lang]);

  if (!result) {
    return (
      <div className="min-h-screen bg-kvti-bg text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-4 text-slate-300">
            {t('result.no_data')}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-kvti-primary underline"
          >
            {t('result.home_btn')}
          </button>
        </div>
      </div>
    );
  }

  const { diagnosis, roadmap } = result;

  return (
    <div className="min-h-screen bg-kvti-bg text-white p-4 md:p-8 overflow-y-auto font-sans">
      <div className="max-w-5xl mx-auto space-y-16 pt-12 pb-24">
        {/* Navigation Header */}
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={() => {
              localStorage.removeItem('kvti_base_profile');
              localStorage.removeItem('kvti_answers');
              navigate("/");
            }}
            className="bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all text-white border border-white/10 shadow-lg text-sm font-medium"
          >
            {t('result.start_over')}
          </button>
        </div>

        {/* Phase 3: POSITIVE FRAMING DASHBOARD */}
        <DashboardTop dashboardData={result} />

        {/* Phase 4: GAMIFIED ACTION ROADMAP */}
        <RoadmapTimeline
          roadmapData={roadmap}
          d10Simulation={diagnosis.d10_sim}
          userProfile={diagnosis.user_profile}
        />

        {/* Footer */}
        <div className="text-center pt-10 border-t border-white/5 flex flex-col items-center gap-4">
          <button
            onClick={() => navigate("/survey")}
            className="px-10 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-105 transition-all tracking-wide w-full max-w-sm"
          >
            {t('result.survey_btn')}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('kvti_base_profile');
              localStorage.removeItem('kvti_answers');
              navigate("/");
            }}
            className="px-10 py-4 rounded-full bg-kvti-primary hover:bg-white text-slate-900 font-black shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:scale-105 transition-all tracking-wide w-full max-w-sm"
          >
            {t('result.restart_btn')}
          </button>
          <p className="mt-4 text-xs text-slate-600 whitespace-pre-line">
            {t('result.footer_text')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Result;
