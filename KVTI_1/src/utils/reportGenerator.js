import { generateReportData as generateReportDataKo } from './reportGenerator_ko.js';
import { generateReportData as generateReportDataEn } from './reportGenerator_en.js';

/**
 * generateReportData (Router)
 * Evaluates the passed locale and routes to the appropriate language generator file.
 * 
 * @param {string} resultCode The 3-letter KVTI code
 * @param {Object} passedState Full state object from the frontend
 * @param {string} locale Evaluates 'ko' or 'en'
 */
export function generateReportData(resultCode, passedState = null, locale = 'ko') {
    if (locale === 'en') {
        return generateReportDataEn(resultCode, passedState);
    }
    return generateReportDataKo(resultCode, passedState);
}
