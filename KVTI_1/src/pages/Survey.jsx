import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Survey() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // State for multiple rating questions
  const [ratings, setRatings] = useState({
    q1: 0, // Overall satisfaction
    q2: 0, // Result accuracy/matching quality
    q3: 0, // Usefulness of the strategy roadmap
    q4: 0, // UI/UX experience
  });

  const [hoverRatings, setHoverRatings] = useState({
    q1: 0, q2: 0, q3: 0, q4: 0
  });

  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check if all rating questions are answered
  const isFormValid = Object.values(ratings).every(r => r > 0);

  const handleRatingChange = (qIndex, value) => {
    setRatings(prev => ({ ...prev, [qIndex]: value }));
  };

  const handleHoverChange = (qIndex, value) => {
    setHoverRatings(prev => ({ ...prev, [qIndex]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    console.log("Survey Submitted:", { ratings, feedback });
    setIsSubmitted(true);

    // Auto-redirect to home after 3 seconds
    setTimeout(() => {
      localStorage.removeItem('kvti_base_profile');
      localStorage.removeItem('kvti_answers');
      navigate('/');
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-kvti-bg text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-emerald-900/20 rounded-full blur-[120px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="z-10 text-center max-w-md w-full bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-3xl"
        >
          <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-3xl font-black mb-4 text-emerald-400">{t('survey_ui.survey_complete_title')}</h2>
          <p className="text-slate-300 leading-relaxed mb-8">
            {t('survey_ui.survey_complete_desc_1')}<br />{t('survey_ui.survey_complete_desc_2')}
          </p>
          <p className="text-sm text-slate-500">{t('survey_ui.survey_complete_redirect')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kvti-bg text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-kvti-primary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/5 hover:bg-white/10 backdrop-blur-md px-4 py-2 rounded-full transition-all text-slate-300 hover:text-white border border-white/10 shadow-lg text-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {t('survey_ui.return_btn')}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-xl"
      >
        <div className="mb-10 text-center">
          <span className="text-kvti-primary text-sm font-bold tracking-[0.2em] uppercase mb-2 block">
            {t('survey_ui.feedback_subtitle')}
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {t('survey_ui.page_title')}
          </h1>
          <p className="text-slate-400 mt-4 leading-relaxed">
            {t('survey_ui.page_desc_1')}<br />{t('survey_ui.page_desc_2')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl space-y-10">

          {/* Question 1: Overall Satisfaction */}
          <div>
            <label className="block text-slate-300 font-bold mb-4 text-center md:text-left text-lg">
              {t('survey_ui.q1')}
            </label>
            <div className="flex justify-center md:justify-start gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => handleHoverChange('q1', star)}
                  onMouseLeave={() => handleHoverChange('q1', 0)}
                  onClick={() => handleRatingChange('q1', star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={(hoverRatings.q1 || ratings.q1) >= star ? '#f59e0b' : 'currentColor'}
                    className={`w-9 h-9 ${(hoverRatings.q1 || ratings.q1) >= star ? 'text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-slate-600'}`}
                  >
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Accuracy */}
          <div className="pt-6 border-t border-white/5">
            <label className="block text-slate-300 font-bold mb-4 text-center md:text-left text-lg">
              {t('survey_ui.q2')}
            </label>
            <div className="flex justify-center md:justify-start gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => handleHoverChange('q2', star)}
                  onMouseLeave={() => handleHoverChange('q2', 0)}
                  onClick={() => handleRatingChange('q2', star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={(hoverRatings.q2 || ratings.q2) >= star ? '#6366f1' : 'currentColor'}
                    className={`w-9 h-9 ${(hoverRatings.q2 || ratings.q2) >= star ? 'text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'text-slate-600'}`}
                  >
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Usefulness */}
          <div className="pt-6 border-t border-white/5">
            <label className="block text-slate-300 font-bold mb-4 text-center md:text-left text-lg">
              {t('survey_ui.q3')}
            </label>
            <div className="flex justify-center md:justify-start gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => handleHoverChange('q3', star)}
                  onMouseLeave={() => handleHoverChange('q3', 0)}
                  onClick={() => handleRatingChange('q3', star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={(hoverRatings.q3 || ratings.q3) >= star ? '#10b981' : 'currentColor'}
                    className={`w-9 h-9 ${(hoverRatings.q3 || ratings.q3) >= star ? 'text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-slate-600'}`}
                  >
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: UI/UX */}
          <div className="pt-6 border-t border-white/5">
            <label className="block text-slate-300 font-bold mb-4 text-center md:text-left text-lg">
              {t('survey_ui.q4')}
            </label>
            <div className="flex justify-center md:justify-start gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => handleHoverChange('q4', star)}
                  onMouseLeave={() => handleHoverChange('q4', 0)}
                  onClick={() => handleRatingChange('q4', star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={(hoverRatings.q4 || ratings.q4) >= star ? '#f43f5e' : 'currentColor'}
                    className={`w-9 h-9 ${(hoverRatings.q4 || ratings.q4) >= star ? 'text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'text-slate-600'}`}
                  >
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Textarea */}
          <div className="pt-6 border-t border-white/5">
            <label className="block text-slate-300 font-bold mb-3 text-lg" htmlFor="feedback">
              {t('survey_ui.q5')}
            </label>
            <textarea
              id="feedback"
              className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-kvti-primary focus:ring-1 focus:ring-kvti-primary resize-none transition-all"
              rows={4}
              placeholder={t('survey_ui.textarea_placeholder')}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-5 text-lg rounded-xl font-bold tracking-wide transition-all shadow-lg mt-4 ${isFormValid
              ? 'bg-kvti-primary text-slate-900 hover:bg-white hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:-translate-y-1'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
          >
            {isFormValid ? t('survey_ui.submit_btn_valid') : t('survey_ui.submit_btn_invalid')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
