import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function BaseProfileForm({ onSubmit }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        age: 23,
        nationality: '',
        region: '서울',
        university: '',
        major: '',
        grade: '3학년',
        topik: '0',
        kiip: '0',
        secondaryLanguages: [{ lang: '', level: 'none' }, { lang: '', level: 'none' }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'region') {
            // Reset university when region changes
            setFormData(prev => ({ ...prev, [name]: value, university: '' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSecondaryLanguageChange = (index, field, value) => {
        const newLangs = [...formData.secondaryLanguages];
        newLangs[index] = { ...newLangs[index], [field]: value };
        setFormData(prev => ({ ...prev, secondaryLanguages: newLangs }));
    };

    const addSecondaryLanguage = () => {
        setFormData(prev => ({ ...prev, secondaryLanguages: [...prev.secondaryLanguages, { lang: '', level: 'none' }] }));
    };

    const removeSecondaryLanguage = (index) => {
        if (formData.secondaryLanguages.length <= 1) return;
        const newLangs = formData.secondaryLanguages.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, secondaryLanguages: newLangs }));
    };

    const universitiesByRegion = {
        '서울': {
            '4년제 대학교': ['서울대학교', '연세대학교', '고려대학교', '서강대학교', '성균관대학교', '한양대학교', '중앙대학교', '경희대학교', '한국외국어대학교', '서울시립대학교', '이화여자대학교', '건국대학교', '동국대학교', '홍익대학교', '국민대학교', '숭실대학교', '세종대학교', '단국대학교', '명지대학교', '상명대학교', '가톨릭대학교', '덕성여자대학교', '동덕여자대학교', '서울과학기술대학교', '서울여자대학교', '성신여자대학교', '한성대학교', '서경대학교', '삼육대학교', '성공회대학교', '추계예술대학교', '광운대학교', '서울교육대학교', '한국예술종합학교', '한국체육대학교', '감리교신학대학교', '장로회신학대학교', '총신대학교', '강서대학교(KC대)', '한국성서대학교', '서울한영대학교', '서울기독대학교', '디지털서울문화예술대학교', '사이버한국외국어대학교', '서울디지털대학교', '서울사이버대학교', '기타 4년제 대학교'],
            '2~3년제 전문대학': ['명지전문대학', '동양미래대학교', '인덕대학교', '서일대학교', '배화여자대학교', '숭의여자대학교', '한양여자대학교', '서울여자간호대학교', '삼육보건대학교', '백석예술대학교', '정화예술대학교', '국제예술대학교', '기타 2~3년제 전문대학']
        },
        '경기/인천': {
            '4년제 대학교': ['인하대학교', '인천대학교', '가천대학교', '경기대학교', '아주대학교', '단국대학교(죽전)', '성균관대학교(자연과학캠퍼스)', '한양대학교(ERICA)', '경희대학교(국제)', '한국항공대학교', '한국외국어대학교(글로벌)', '동국대학교(바이오메디)', '강남대학교', '수원대학교', '용인대학교', '한신대학교', '협성대학교', '안양대학교', '성결대학교', '평택대학교', '한경국립대학교', '신한대학교', '을지대학교', '차의과학대학교', '루터대학교', '대진대학교', '인천가톨릭대학교', '중부대학교(고양)', '청운대학교(인천)', '한세대학교', '화성의과학대학교(신경대)', '아세아연합신학대학교', '예원예술대학교(양주)', '중앙승가대학교', '서울신학대학교', '서울장신대학교', '경인교육대학교', '기타 4년제 대학교'],
            '2~3년제 전문대학': ['인하공업전문대학', '부천대학교', '동남보건대학교', '경기과학기술대학교', '오산대학교', '수원과학대학교', '경인여자대학교', '재능대학교', '연성대학교', '대림대학교', '신구대학교', '동서울대학교', '유한대학교', '장안대학교', '안산대학교', '여주대학교', '청강문화산업대학교', '한국관광대학교', '한국복지대학교', '경민대학교', '서정대학교', '두원공과대학교', '농협대학교', '용인예술과학대학교', '계원예술대학교', '서울예술대학교', '동아방송예술대학교', '김포대학교', '수원여자대학교', '용인송담대학교', '웅지세무대학교', '인천재능대학교', '기타 2~3년제 전문대학']
        },
        '부산/경남': {
            '4년제 대학교': ['부산대학교', '부경대학교', '한국해양대학교', '동아대학교', '동의대학교', '경성대학교', '신라대학교', '인제대학교', '영산대학교', '동서대학교', '부산가톨릭대학교', '부산외국어대학교', '고신대학교', '경상국립대학교', '창원대학교', '경남대학교', '울산대학교', '울산과학기술원(UNIST)', '창신대학교', '가야대학교', '한국국제대학교', '부산교육대학교', '진주교육대학교', '기타 4년제 대학교'],
            '2~3년제 전문대학': ['부산과학기술대학교', '경남정보대학교', '동의과학대학교', '대동대학교', '마산대학교', '연암공과대학교', '동주대학교', '부산여자대학교', '거제대학교', '김해대학교', '진주보건대학교', '창원문성대학교', '춘해보건대학교', '동원과학기술대학교', '한국승강기대학교', '울산과학대학교', '기타 2~3년제 전문대학']
        },
        '대구/경북': {
            '4년제 대학교': ['경북대학교', '영남대학교', '계명대학교', '대구대학교', '대구가톨릭대학교', '국립안동대학교', '금오공과대학교', '경운대학교', '경일대학교', '동국대학교(WISE)', '김천대학교', '대구한의대학교', '위덕대학교', '포항공과대학교(POSTECH)', '한동대학교', '대구경북과학기술원(DGIST)', '영남신학대학교', '대신대학교', '대구교육대학교', '기타 4년제 대학교'],
            '2~3년제 전문대학': ['영진전문대학교', '대구보건대학교', '대구과학대학교', '계명문화대학교', '경북전문대학교', '구미대학교', '수성대학교', '안동과학대학교', '호산대학교', '선린대학교', '포항대학교', '대경대학교', '문경대학교', '가톨릭상지대학교', '대구공업대학교', '영남이공대학교', '기타 2~3년제 전문대학']
        },
        '광주/전라': {
            '4년제 대학교': ['전남대학교', '조선대학교', '광주대학교', '호남대학교', '전북대학교', '우석대학교', '원광대학교', '전주대학교', '국립목포대학교', '국립순천대학교', '국립군산대학교', '광주과학기술원(GIST)', '동신대학교', '남부대학교', '초당대학교', '광주가톨릭대학교', '국립목포해양대학교', '한국에너지공과대학교(KENTECH)', '광주여자대학교', '전주교육대학교', '광주교육대학교', '호원대학교', '예수대학교', '한일장신대학교', '광주신학대학교', '기타 4년제 대학교'],
            '2~3년제 전문대학': ['광주보건대학교', '조선이공대학교', '기독간호대학교', '원광보건대학교', '전주비전대학교', '동강대학교', '서영대학교', '순천제일대학교', '동아보건대학교', '전남과학대학교', '광양보건대학교', '전북과학대학교', '군장대학교', '백제예술대학교', '기타 2~3년제 전문대학']
        },
        '대전/충청': {
            '4년제 대학교': ['충남대학교', '국립한밭대학교', '한남대학교', '목원대학교', '배재대학교', '우송대학교', '충북대학교', '청주대학교', '한국기술교육대학교(KOREATECH)', '순천향대학교', '백석대학교', '선문대학교', '호서대학교', '남서울대학교', '건양대학교', '대전대학교', '국립공주대학교', '세명대학교', '유원대학교', '한국교통대학교', '카이스트(KAIST)', '건국대학교(글로컬)', '고려대학교(세종)', '홍익대학교(세종)', '극동대학교', '서원대학교', '단국대학교(천안)', '상명대학교(천안)', '나사렛대학교', '꽃동네대학교', '금강대학교', '중원대학교', '청주교육대학교', '공주교육대학교', '침례신학대학교', '기타 4년제 대학교'],
            '2~3년제 전문대학': ['대전보건대학교', '우송정보대학', '대덕대학교', '충청대학교', '백석문화대학교', '신성대학교', '연암대학교', '대전과학기술대학교', '아주자동차대학교', '한국영상대학교', '혜전대학교', '충북도립대학교', '충남도립대학교', '대원대학교', '기타 2~3년제 전문대학']
        },
        '강원/제주': {
            '4년제 대학교': ['강원대학교', '한림대학교', '연세대학교(미래캠퍼스)', '상지대학교', '국립강릉원주대학교', '제주대학교', '제주국제대학교', '가톨릭관동대학교', '경동대학교', '한라대학교', '춘천교육대학교', '기타 4년제 대학교'],
            '2~3년제 전문대학': ['한림성심대학교', '강원도립대학교', '제주한라대학교', '제주관광대학교', '한국골프대학교', '송호대학교', '세경대학교', '송곡대학교', '기타 2~3년제 전문대학']
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        if (!formData.name || !formData.nationality || !formData.university || !formData.major) {
            alert(t('profile_form.alert_required'));
            return;
        }
        onSubmit(formData);
    };

    const inputClasses = "w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors";
    const labelClasses = "block text-sm font-semibold text-slate-300 mb-2";

    return (
        <div className="min-h-screen bg-kvti-bg text-white flex flex-col justify-center items-center p-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>

            <div className="max-w-2xl w-full z-10">
                <div className="text-center mb-10">
                    <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-4 border border-white/10">{t('profile_form.phase')}</span>
                    <h1 className="text-3xl md:text-4xl font-black mb-4">{t('profile_form.title')}</h1>
                    <p className="text-slate-400">
                        {t('profile_form.subtitle_1')}<br />{t('profile_form.subtitle_2')}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#1a1c29]/80 backdrop-blur-md border border-slate-700/50 p-8 md:p-10 rounded-3xl shadow-2xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className={labelClasses}>{t('profile_form.name')} <span className="text-rose-400">*</span></label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClasses} placeholder={t('profile_form.name_placeholder')} required />
                        </div>
                        {/* Age */}
                        <div>
                            <label className={labelClasses}>{t('profile_form.age')} <span className="text-rose-400">*</span></label>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} className={inputClasses} min="18" max="60" required />
                        </div>
                        {/* Nationality */}
                        <div>
                            <label className={labelClasses}>{t('profile_form.nationality')} <span className="text-rose-400">*</span></label>
                            <select name="nationality" value={formData.nationality} onChange={handleChange} className={inputClasses} required>
                                <option value="" disabled>{t('profile_form.nationality_placeholder')}</option>
                                <option value="Afghanistan">{t(`profile_data.Afghanistan`)}</option>
                                <option value="Albania">{t(`profile_data.Albania`)}</option>
                                <option value="Algeria">{t(`profile_data.Algeria`)}</option>
                                <option value="Andorra">{t(`profile_data.Andorra`)}</option>
                                <option value="Angola">{t(`profile_data.Angola`)}</option>
                                <option value="Antigua and Barbuda">{t(`profile_data.Antigua and Barbuda`)}</option>
                                <option value="Argentina">{t(`profile_data.Argentina`)}</option>
                                <option value="Armenia">{t(`profile_data.Armenia`)}</option>
                                <option value="Australia">{t(`profile_data.Australia`)}</option>
                                <option value="Austria">{t(`profile_data.Austria`)}</option>
                                <option value="Azerbaijan">{t(`profile_data.Azerbaijan`)}</option>
                                <option value="Bahamas">{t(`profile_data.Bahamas`)}</option>
                                <option value="Bahrain">{t(`profile_data.Bahrain`)}</option>
                                <option value="Bangladesh">{t(`profile_data.Bangladesh`)}</option>
                                <option value="Barbados">{t(`profile_data.Barbados`)}</option>
                                <option value="Belarus">{t(`profile_data.Belarus`)}</option>
                                <option value="Belgium">{t(`profile_data.Belgium`)}</option>
                                <option value="Belize">{t(`profile_data.Belize`)}</option>
                                <option value="Benin">{t(`profile_data.Benin`)}</option>
                                <option value="Bhutan">{t(`profile_data.Bhutan`)}</option>
                                <option value="Bolivia">{t(`profile_data.Bolivia`)}</option>
                                <option value="Bosnia and Herzegovina">{t(`profile_data.Bosnia and Herzegovina`)}</option>
                                <option value="Botswana">{t(`profile_data.Botswana`)}</option>
                                <option value="Brazil">{t(`profile_data.Brazil`)}</option>
                                <option value="Brunei">{t(`profile_data.Brunei`)}</option>
                                <option value="Bulgaria">{t(`profile_data.Bulgaria`)}</option>
                                <option value="Burkina Faso">{t(`profile_data.Burkina Faso`)}</option>
                                <option value="Burundi">{t(`profile_data.Burundi`)}</option>
                                <option value="Cabo Verde">{t(`profile_data.Cabo Verde`)}</option>
                                <option value="Cambodia">{t(`profile_data.Cambodia`)}</option>
                                <option value="Cameroon">{t(`profile_data.Cameroon`)}</option>
                                <option value="Canada">{t(`profile_data.Canada`)}</option>
                                <option value="Central African Republic">{t(`profile_data.Central African Republic`)}</option>
                                <option value="Chad">{t(`profile_data.Chad`)}</option>
                                <option value="Chile">{t(`profile_data.Chile`)}</option>
                                <option value="China">{t(`profile_data.China`)}</option>
                                <option value="Colombia">{t(`profile_data.Colombia`)}</option>
                                <option value="Comoros">{t(`profile_data.Comoros`)}</option>
                                <option value="Congo, Democratic Republic of the">{t(`profile_data.Congo, Democratic Republic of the`)}</option>
                                <option value="Congo, Republic of the">{t(`profile_data.Congo, Republic of the`)}</option>
                                <option value="Costa Rica">{t(`profile_data.Costa Rica`)}</option>
                                <option value="Croatia">{t(`profile_data.Croatia`)}</option>
                                <option value="Cuba">{t(`profile_data.Cuba`)}</option>
                                <option value="Cyprus">{t(`profile_data.Cyprus`)}</option>
                                <option value="Czechia">{t(`profile_data.Czechia`)}</option>
                                <option value="Denmark">{t(`profile_data.Denmark`)}</option>
                                <option value="Djibouti">{t(`profile_data.Djibouti`)}</option>
                                <option value="Dominica">{t(`profile_data.Dominica`)}</option>
                                <option value="Dominican Republic">{t(`profile_data.Dominican Republic`)}</option>
                                <option value="Ecuador">{t(`profile_data.Ecuador`)}</option>
                                <option value="Egypt">{t(`profile_data.Egypt`)}</option>
                                <option value="El Salvador">{t(`profile_data.El Salvador`)}</option>
                                <option value="Equatorial Guinea">{t(`profile_data.Equatorial Guinea`)}</option>
                                <option value="Eritrea">{t(`profile_data.Eritrea`)}</option>
                                <option value="Estonia">{t(`profile_data.Estonia`)}</option>
                                <option value="Eswatini">{t(`profile_data.Eswatini`)}</option>
                                <option value="Ethiopia">{t(`profile_data.Ethiopia`)}</option>
                                <option value="Fiji">{t(`profile_data.Fiji`)}</option>
                                <option value="Finland">{t(`profile_data.Finland`)}</option>
                                <option value="France">{t(`profile_data.France`)}</option>
                                <option value="Gabon">{t(`profile_data.Gabon`)}</option>
                                <option value="Gambia">{t(`profile_data.Gambia`)}</option>
                                <option value="Georgia">{t(`profile_data.Georgia`)}</option>
                                <option value="Germany">{t(`profile_data.Germany`)}</option>
                                <option value="Ghana">{t(`profile_data.Ghana`)}</option>
                                <option value="Greece">{t(`profile_data.Greece`)}</option>
                                <option value="Grenada">{t(`profile_data.Grenada`)}</option>
                                <option value="Guatemala">{t(`profile_data.Guatemala`)}</option>
                                <option value="Guinea">{t(`profile_data.Guinea`)}</option>
                                <option value="Guinea-Bissau">{t(`profile_data.Guinea-Bissau`)}</option>
                                <option value="Guyana">{t(`profile_data.Guyana`)}</option>
                                <option value="Haiti">{t(`profile_data.Haiti`)}</option>
                                <option value="Honduras">{t(`profile_data.Honduras`)}</option>
                                <option value="Hungary">{t(`profile_data.Hungary`)}</option>
                                <option value="Iceland">{t(`profile_data.Iceland`)}</option>
                                <option value="India">{t(`profile_data.India`)}</option>
                                <option value="Indonesia">{t(`profile_data.Indonesia`)}</option>
                                <option value="Iran">{t(`profile_data.Iran`)}</option>
                                <option value="Iraq">{t(`profile_data.Iraq`)}</option>
                                <option value="Ireland">{t(`profile_data.Ireland`)}</option>
                                <option value="Israel">{t(`profile_data.Israel`)}</option>
                                <option value="Italy">{t(`profile_data.Italy`)}</option>
                                <option value="Jamaica">{t(`profile_data.Jamaica`)}</option>
                                <option value="Japan">{t(`profile_data.Japan`)}</option>
                                <option value="Jordan">{t(`profile_data.Jordan`)}</option>
                                <option value="Kazakhstan">{t(`profile_data.Kazakhstan`)}</option>
                                <option value="Kenya">{t(`profile_data.Kenya`)}</option>
                                <option value="Kiribati">{t(`profile_data.Kiribati`)}</option>
                                <option value="Korea, North">{t(`profile_data.Korea, North`)}</option>
                                <option value="Kuwait">{t(`profile_data.Kuwait`)}</option>
                                <option value="Kyrgyzstan">{t(`profile_data.Kyrgyzstan`)}</option>
                                <option value="Laos">{t(`profile_data.Laos`)}</option>
                                <option value="Latvia">{t(`profile_data.Latvia`)}</option>
                                <option value="Lebanon">{t(`profile_data.Lebanon`)}</option>
                                <option value="Lesotho">{t(`profile_data.Lesotho`)}</option>
                                <option value="Liberia">{t(`profile_data.Liberia`)}</option>
                                <option value="Libya">{t(`profile_data.Libya`)}</option>
                                <option value="Liechtenstein">{t(`profile_data.Liechtenstein`)}</option>
                                <option value="Lithuania">{t(`profile_data.Lithuania`)}</option>
                                <option value="Luxembourg">{t(`profile_data.Luxembourg`)}</option>
                                <option value="Madagascar">{t(`profile_data.Madagascar`)}</option>
                                <option value="Malawi">{t(`profile_data.Malawi`)}</option>
                                <option value="Malaysia">{t(`profile_data.Malaysia`)}</option>
                                <option value="Maldives">{t(`profile_data.Maldives`)}</option>
                                <option value="Mali">{t(`profile_data.Mali`)}</option>
                                <option value="Malta">{t(`profile_data.Malta`)}</option>
                                <option value="Marshall Islands">{t(`profile_data.Marshall Islands`)}</option>
                                <option value="Mauritania">{t(`profile_data.Mauritania`)}</option>
                                <option value="Mauritius">{t(`profile_data.Mauritius`)}</option>
                                <option value="Mexico">{t(`profile_data.Mexico`)}</option>
                                <option value="Micronesia">{t(`profile_data.Micronesia`)}</option>
                                <option value="Moldova">{t(`profile_data.Moldova`)}</option>
                                <option value="Monaco">{t(`profile_data.Monaco`)}</option>
                                <option value="Mongolia">{t(`profile_data.Mongolia`)}</option>
                                <option value="Montenegro">{t(`profile_data.Montenegro`)}</option>
                                <option value="Morocco">{t(`profile_data.Morocco`)}</option>
                                <option value="Mozambique">{t(`profile_data.Mozambique`)}</option>
                                <option value="Myanmar">{t(`profile_data.Myanmar`)}</option>
                                <option value="Namibia">{t(`profile_data.Namibia`)}</option>
                                <option value="Nauru">{t(`profile_data.Nauru`)}</option>
                                <option value="Nepal">{t(`profile_data.Nepal`)}</option>
                                <option value="Netherlands">{t(`profile_data.Netherlands`)}</option>
                                <option value="New Zealand">{t(`profile_data.New Zealand`)}</option>
                                <option value="Nicaragua">{t(`profile_data.Nicaragua`)}</option>
                                <option value="Niger">{t(`profile_data.Niger`)}</option>
                                <option value="Nigeria">{t(`profile_data.Nigeria`)}</option>
                                <option value="North Macedonia">{t(`profile_data.North Macedonia`)}</option>
                                <option value="Norway">{t(`profile_data.Norway`)}</option>
                                <option value="Oman">{t(`profile_data.Oman`)}</option>
                                <option value="Pakistan">{t(`profile_data.Pakistan`)}</option>
                                <option value="Palau">{t(`profile_data.Palau`)}</option>
                                <option value="Palestine">{t(`profile_data.Palestine`)}</option>
                                <option value="Panama">{t(`profile_data.Panama`)}</option>
                                <option value="Papua New Guinea">{t(`profile_data.Papua New Guinea`)}</option>
                                <option value="Paraguay">{t(`profile_data.Paraguay`)}</option>
                                <option value="Peru">{t(`profile_data.Peru`)}</option>
                                <option value="Philippines">{t(`profile_data.Philippines`)}</option>
                                <option value="Poland">{t(`profile_data.Poland`)}</option>
                                <option value="Portugal">{t(`profile_data.Portugal`)}</option>
                                <option value="Qatar">{t(`profile_data.Qatar`)}</option>
                                <option value="Romania">{t(`profile_data.Romania`)}</option>
                                <option value="Russia">{t(`profile_data.Russia`)}</option>
                                <option value="Rwanda">{t(`profile_data.Rwanda`)}</option>
                                <option value="Saint Kitts and Nevis">{t(`profile_data.Saint Kitts and Nevis`)}</option>
                                <option value="Saint Lucia">{t(`profile_data.Saint Lucia`)}</option>
                                <option value="Saint Vincent and the Grenadines">{t(`profile_data.Saint Vincent and the Grenadines`)}</option>
                                <option value="Samoa">{t(`profile_data.Samoa`)}</option>
                                <option value="San Marino">{t(`profile_data.San Marino`)}</option>
                                <option value="Sao Tome and Principe">{t(`profile_data.Sao Tome and Principe`)}</option>
                                <option value="Saudi Arabia">{t(`profile_data.Saudi Arabia`)}</option>
                                <option value="Senegal">{t(`profile_data.Senegal`)}</option>
                                <option value="Serbia">{t(`profile_data.Serbia`)}</option>
                                <option value="Seychelles">{t(`profile_data.Seychelles`)}</option>
                                <option value="Sierra Leone">{t(`profile_data.Sierra Leone`)}</option>
                                <option value="Singapore">{t(`profile_data.Singapore`)}</option>
                                <option value="Slovakia">{t(`profile_data.Slovakia`)}</option>
                                <option value="Slovenia">{t(`profile_data.Slovenia`)}</option>
                                <option value="Solomon Islands">{t(`profile_data.Solomon Islands`)}</option>
                                <option value="Somalia">{t(`profile_data.Somalia`)}</option>
                                <option value="South Africa">{t(`profile_data.South Africa`)}</option>
                                <option value="South Sudan">{t(`profile_data.South Sudan`)}</option>
                                <option value="Spain">{t(`profile_data.Spain`)}</option>
                                <option value="Sri Lanka">{t(`profile_data.Sri Lanka`)}</option>
                                <option value="Sudan">{t(`profile_data.Sudan`)}</option>
                                <option value="Suriname">{t(`profile_data.Suriname`)}</option>
                                <option value="Sweden">{t(`profile_data.Sweden`)}</option>
                                <option value="Switzerland">{t(`profile_data.Switzerland`)}</option>
                                <option value="Syria">{t(`profile_data.Syria`)}</option>
                                <option value="Taiwan">{t(`profile_data.Taiwan`)}</option>
                                <option value="Tajikistan">{t(`profile_data.Tajikistan`)}</option>
                                <option value="Tanzania">{t(`profile_data.Tanzania`)}</option>
                                <option value="Thailand">{t(`profile_data.Thailand`)}</option>
                                <option value="Timor-Leste">{t(`profile_data.Timor-Leste`)}</option>
                                <option value="Togo">{t(`profile_data.Togo`)}</option>
                                <option value="Tonga">{t(`profile_data.Tonga`)}</option>
                                <option value="Trinidad and Tobago">{t(`profile_data.Trinidad and Tobago`)}</option>
                                <option value="Tunisia">{t(`profile_data.Tunisia`)}</option>
                                <option value="Turkey">{t(`profile_data.Turkey`)}</option>
                                <option value="Turkmenistan">{t(`profile_data.Turkmenistan`)}</option>
                                <option value="Tuvalu">{t(`profile_data.Tuvalu`)}</option>
                                <option value="Uganda">{t(`profile_data.Uganda`)}</option>
                                <option value="Ukraine">{t(`profile_data.Ukraine`)}</option>
                                <option value="United Arab Emirates">{t(`profile_data.United Arab Emirates`)}</option>
                                <option value="United Kingdom">{t(`profile_data.United Kingdom`)}</option>
                                <option value="United States">{t(`profile_data.United States`)}</option>
                                <option value="Uruguay">{t(`profile_data.Uruguay`)}</option>
                                <option value="Uzbekistan">{t(`profile_data.Uzbekistan`)}</option>
                                <option value="Vanuatu">{t(`profile_data.Vanuatu`)}</option>
                                <option value="Vatican City">{t(`profile_data.Vatican City`)}</option>
                                <option value="Venezuela">{t(`profile_data.Venezuela`)}</option>
                                <option value="Vietnam">{t(`profile_data.Vietnam`)}</option>
                                <option value="Yemen">{t(`profile_data.Yemen`)}</option>
                                <option value="Zambia">{t(`profile_data.Zambia`)}</option>
                                <option value="Zimbabwe">{t(`profile_data.Zimbabwe`)}</option>
                                <option value="Other">{t(`profile_data.Other`)}</option>
                            </select>
                        </div>
                        {/* Region */}
                        {/* Region */}
                        <div>
                            <label className={labelClasses}>{t('profile_form.region')} <span className="text-rose-400">*</span></label>
                            <select name="region" value={formData.region} onChange={handleChange} className={inputClasses}>
                                <option value="서울">{t(`profile_data.서울`)}</option>
                                <option value="경기/인천">{t(`profile_data.경기/인천`)}</option>
                                <option value="부산/경남">{t(`profile_data.부산/경남`)}</option>
                                <option value="대구/경북">{t(`profile_data.대구/경북`)}</option>
                                <option value="광주/전라">{t(`profile_data.광주/전라`)}</option>
                                <option value="대전/충청">{t(`profile_data.대전/충청`)}</option>
                                <option value="강원/제주">{t(`profile_data.강원/제주`)}</option>
                            </select>
                        </div>
                        {/* University */}
                        <div>
                            <label className={labelClasses}>{t('profile_form.university')} <span className="text-rose-400">*</span></label>
                            <select name="university" value={formData.university} onChange={handleChange} className={inputClasses} required>
                                <option value="" disabled>{t('profile_form.university_placeholder')}</option>
                                {universitiesByRegion[formData.region] && Object.entries(universitiesByRegion[formData.region]).map(([groupName, unvs]) => (
                                    <optgroup key={groupName} label={t(`profile_data.${groupName}`)}>
                                        {unvs.map(univ => (
                                            <option key={univ} value={univ}>{t(`profile_data.${univ}`)}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                            <p className="text-xs text-slate-500 mt-2 ml-1">{t('profile_form.university_desc')}</p>
                        </div>
                        {/* Major */}
                        <div>
                            <label className={labelClasses}>{t('profile_form.major')} <span className="text-rose-400">*</span></label>
                            <select name="major" value={formData.major} onChange={handleChange} className={inputClasses} required>
                                <option value="" disabled>{t('profile_form.major_placeholder')}</option>
                                <optgroup label={t(`profile_data.인문사회계열 (Humanities & Social Sciences)`)}>
                                    <option value="국어국문학">{t(`profile_data.국어국문학`)}</option>
                                    <option value="한국어교육학">{t(`profile_data.한국어교육학`)}</option>
                                    <option value="영어영문학">{t(`profile_data.영어영문학`)}</option>
                                    <option value="중어중문학">{t(`profile_data.중어중문학`)}</option>
                                    <option value="일어일문학">{t(`profile_data.일어일문학`)}</option>
                                    <option value="경영학">{t(`profile_data.경영학`)}</option>
                                    <option value="경제학">{t(`profile_data.경제학`)}</option>
                                    <option value="국제통상학">{t(`profile_data.국제통상학`)}</option>
                                    <option value="회계세무학">{t(`profile_data.회계세무학`)}</option>
                                    <option value="행정학">{t(`profile_data.행정학`)}</option>
                                    <option value="정치외교학">{t(`profile_data.정치외교학`)}</option>
                                    <option value="사회학">{t(`profile_data.사회학`)}</option>
                                    <option value="사회복지학">{t(`profile_data.사회복지학`)}</option>
                                    <option value="미디어커뮤니케이션학">{t(`profile_data.미디어커뮤니케이션학`)}</option>
                                    <option value="광고홍보학">{t(`profile_data.광고홍보학`)}</option>
                                    <option value="관광경영학">{t(`profile_data.관광경영학`)}</option>
                                    <option value="호텔경영학">{t(`profile_data.호텔경영학`)}</option>
                                    <option value="항공서비스학">{t(`profile_data.항공서비스학`)}</option>
                                    <option value="외식경영학">{t(`profile_data.외식경영학`)}</option>
                                    <option value="비서사무행정">{t(`profile_data.비서사무행정`)}</option>
                                    <option value="유아교육학">{t(`profile_data.유아교육학`)}</option>
                                    <option value="사학">{t(`profile_data.사학`)}</option>
                                    <option value="철학">{t(`profile_data.철학`)}</option>
                                    <option value="심리학">{t(`profile_data.심리학`)}</option>
                                    <option value="문헌정보학">{t(`profile_data.문헌정보학`)}</option>
                                    <option value="교육학">{t(`profile_data.교육학`)}</option>
                                    <option value="국제학부">{t(`profile_data.국제학부`)}</option>
                                    <option value="법학">{t(`profile_data.법학`)}</option>
                                    <option value="기타 인문사회">{t(`profile_data.기타 인문사회`)}</option>
                                </optgroup>
                                <optgroup label={t(`profile_data.이공계열 (STEM)`)}>
                                    <option value="컴퓨터공학">{t(`profile_data.컴퓨터공학`)}</option>
                                    <option value="소프트웨어공학">{t(`profile_data.소프트웨어공학`)}</option>
                                    <option value="정보보안학">{t(`profile_data.정보보안학`)}</option>
                                    <option value="인공지능학">{t(`profile_data.인공지능학`)}</option>
                                    <option value="전자공학">{t(`profile_data.전자공학`)}</option>
                                    <option value="전기공학">{t(`profile_data.전기공학`)}</option>
                                    <option value="정보통신공학">{t(`profile_data.정보통신공학`)}</option>
                                    <option value="기계공학">{t(`profile_data.기계공학`)}</option>
                                    <option value="자동차공학">{t(`profile_data.자동차공학`)}</option>
                                    <option value="항공우주공학">{t(`profile_data.항공우주공학`)}</option>
                                    <option value="화학공학">{t(`profile_data.화학공학`)}</option>
                                    <option value="신소재공학">{t(`profile_data.신소재공학`)}</option>
                                    <option value="생명공학">{t(`profile_data.생명공학`)}</option>
                                    <option value="환경공학">{t(`profile_data.환경공학`)}</option>
                                    <option value="건축공학">{t(`profile_data.건축공학`)}</option>
                                    <option value="토목공학">{t(`profile_data.토목공학`)}</option>
                                    <option value="도시공학">{t(`profile_data.도시공학`)}</option>
                                    <option value="산업공학">{t(`profile_data.산업공학`)}</option>
                                    <option value="스마트팩토리학">{t(`profile_data.스마트팩토리학`)}</option>
                                    <option value="해양조선공학">{t(`profile_data.해양조선공학`)}</option>
                                    <option value="게임영상공학">{t(`profile_data.게임영상공학`)}</option>
                                    <option value="부사관경찰">{t(`profile_data.부사관경찰`)}</option>
                                    <option value="기타 이공계">{t(`profile_data.기타 이공계`)}</option>
                                </optgroup>
                                <optgroup label={t(`profile_data.자연과학계열 (Natural Sciences)`)}>
                                    <option value="수학">{t(`profile_data.수학`)}</option>
                                    <option value="통계학">{t(`profile_data.통계학`)}</option>
                                    <option value="물리학">{t(`profile_data.물리학`)}</option>
                                    <option value="천문학">{t(`profile_data.천문학`)}</option>
                                    <option value="화학">{t(`profile_data.화학`)}</option>
                                    <option value="생명과학">{t(`profile_data.생명과학`)}</option>
                                    <option value="식품영양학">{t(`profile_data.식품영양학`)}</option>
                                    <option value="조리과학">{t(`profile_data.조리과학`)}</option>
                                    <option value="농생명과학">{t(`profile_data.농생명과학`)}</option>
                                    <option value="반려동물학">{t(`profile_data.반려동물학`)}</option>
                                    <option value="지질지구과학">{t(`profile_data.지질지구과학`)}</option>
                                    <option value="향장화장품학">{t(`profile_data.향장화장품학`)}</option>
                                    <option value="기타 자연과학">{t(`profile_data.기타 자연과학`)}</option>
                                </optgroup>
                                <optgroup label={t(`profile_data.예체능 및 의약보건계열 (Arts, Physical & Health)`)}>
                                    <option value="시각디자인">{t(`profile_data.시각디자인`)}</option>
                                    <option value="산업디자인">{t(`profile_data.산업디자인`)}</option>
                                    <option value="영상디자인">{t(`profile_data.영상디자인`)}</option>
                                    <option value="패션디자인">{t(`profile_data.패션디자인`)}</option>
                                    <option value="사진만화애니">{t(`profile_data.사진만화애니`)}</option>
                                    <option value="순수예술">{t(`profile_data.순수예술`)}</option>
                                    <option value="실용음악">{t(`profile_data.실용음악`)}</option>
                                    <option value="무용연극영화">{t(`profile_data.무용연극영화`)}</option>
                                    <option value="방송엔터테인먼트">{t(`profile_data.방송엔터테인먼트`)}</option>
                                    <option value="미용뷰티">{t(`profile_data.미용뷰티`)}</option>
                                    <option value="헤어메이크업">{t(`profile_data.헤어메이크업`)}</option>
                                    <option value="체육학">{t(`profile_data.체육학`)}</option>
                                    <option value="경호무도학">{t(`profile_data.경호무도학`)}</option>
                                    <option value="보건행정학">{t(`profile_data.보건행정학`)}</option>
                                    <option value="간호학">{t(`profile_data.간호학`)}</option>
                                    <option value="물리치료학">{t(`profile_data.물리치료학`)}</option>
                                    <option value="재활작업치료">{t(`profile_data.재활작업치료`)}</option>
                                    <option value="치위생학">{t(`profile_data.치위생학`)}</option>
                                    <option value="의약학">{t(`profile_data.의약학`)}</option>
                                    <option value="기타 예체능보건">{t(`profile_data.기타 예체능보건`)}</option>
                                </optgroup>
                            </select>
                            <p className="text-xs text-rose-400/80 mt-2 ml-1">{t('profile_form.major_desc')}</p>
                        </div>
                        {/* Grade */}
                        <div className="md:col-span-2">
                            <label className={labelClasses}>{t('profile_form.grade')} <span className="text-rose-400">*</span></label>
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                                {[
                                    { val: '1학년', key: 'grade_1' },
                                    { val: '2학년', key: 'grade_2' },
                                    { val: '3학년', key: 'grade_3' },
                                    { val: '4학년', key: 'grade_4' },
                                    { val: '석박사', key: 'grade_master' },
                                    { val: '졸업', key: 'grade_grad' }
                                ].map((g) => (
                                    <label key={g.val} className={`cursor-pointer text-center py-3 rounded-xl border transition-all ${formData.grade === g.val ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                                        <input type="radio" name="grade" value={g.val} checked={formData.grade === g.val} onChange={handleChange} className="hidden" />
                                        {t(`profile_form.${g.key}`)}
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* Language Specs (New for Phase 1) */}
                        <div className="md:col-span-2 pt-4 border-t border-slate-700/50 mt-2">
                            <h3 className="text-lg font-bold text-cyan-400 mb-4">{t('profile_form.language_spec')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className={labelClasses}>{t('profile_form.topik')}</label>
                                    <select name="topik" value={formData.topik} onChange={handleChange} className={inputClasses}>
                                        <option value="0">{t('profile_form.topik_0')}</option>
                                        <option value="1">{t('profile_form.topik_1')}</option>
                                        <option value="2">{t('profile_form.topik_2')}</option>
                                        <option value="3">{t('profile_form.topik_3')}</option>
                                        <option value="4">{t('profile_form.topik_4')}</option>
                                        <option value="5">{t('profile_form.topik_5')}</option>
                                        <option value="6">{t('profile_form.topik_6')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClasses}>{t('profile_form.kiip')}</label>
                                    <select name="kiip" value={formData.kiip} onChange={handleChange} className={inputClasses}>
                                        <option value="0">{t('profile_form.kiip_0')}</option>
                                        <option value="1">{t('profile_form.kiip_1')}</option>
                                        <option value="2">{t('profile_form.kiip_2')}</option>
                                        <option value="3">{t('profile_form.kiip_3')}</option>
                                        <option value="4">{t('profile_form.kiip_4')}</option>
                                        <option value="5">{t('profile_form.kiip_5')}</option>
                                    </select>
                                </div>
                                <div className="col-span-1 md:col-span-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className={labelClasses}>{t('profile_form.secondary_lang')}</label>
                                        <button
                                            type="button"
                                            onClick={addSecondaryLanguage}
                                            className="text-xs bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/40 px-3 py-1 rounded-full border border-cyan-500/50 transition-colors flex items-center gap-1"
                                        >
                                            <span>➕</span> {t('profile_form.add_lang')}
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {formData.secondaryLanguages.map((item, idx) => (
                                            <div key={idx} className="flex gap-2 items-center">
                                                <div className="flex-1 grid grid-cols-2 gap-2">
                                                    <select
                                                        value={item.lang}
                                                        onChange={(e) => handleSecondaryLanguageChange(idx, 'lang', e.target.value)}
                                                        className={inputClasses}
                                                    >
                                                        <option value="" disabled>{t('profile_form.lang_placeholder')}</option>
                                                        <option value="영어">{t(`profile_data.영어`)}</option>
                                                        <option value="중국어">{t(`profile_data.중국어`)}</option>
                                                        <option value="일본어">{t(`profile_data.일본어`)}</option>
                                                        <option value="베트남어">{t(`profile_data.베트남어`)}</option>
                                                        <option value="프랑스어">{t(`profile_data.프랑스어`)}</option>
                                                        <option value="스페인어">{t(`profile_data.스페인어`)}</option>
                                                        <option value="독일어">{t(`profile_data.독일어`)}</option>
                                                        <option value="러시아어">{t(`profile_data.러시아어`)}</option>
                                                        <option value="포르투갈어">{t(`profile_data.포르투갈어`)}</option>
                                                        <option value="이탈리아어">{t(`profile_data.이탈리아어`)}</option>
                                                        <option value="몽골어">{t(`profile_data.몽골어`)}</option>
                                                        <option value="우즈베크어">{t(`profile_data.우즈베크어`)}</option>
                                                        <option value="카자흐어">{t(`profile_data.카자흐어`)}</option>
                                                        <option value="인도네시아어">{t(`profile_data.인도네시아어`)}</option>
                                                        <option value="태국어">{t(`profile_data.태국어`)}</option>
                                                        <option value="미얀마어">{t(`profile_data.미얀마어`)}</option>
                                                        <option value="캄보디아어">{t(`profile_data.캄보디아어`)}</option>
                                                        <option value="네팔어">{t(`profile_data.네팔어`)}</option>
                                                        <option value="힌디어">{t(`profile_data.힌디어`)}</option>
                                                        <option value="아랍어">{t(`profile_data.아랍어`)}</option>
                                                        <option value="튀르키예어">{t(`profile_data.튀르키예어`)}</option>
                                                        <option value="기타">{t(`profile_data.기타`)}</option>
                                                    </select>
                                                    <select
                                                        value={item.level}
                                                        onChange={(e) => handleSecondaryLanguageChange(idx, 'level', e.target.value)}
                                                        className={inputClasses}
                                                    >
                                                        <option value="none">{t('profile_form.level_placeholder')}</option>
                                                        <option value="basic">{t('profile_form.level_basic')}</option>
                                                        <option value="business">{t('profile_form.level_business')}</option>
                                                        <option value="native">{t('profile_form.level_native')}</option>
                                                    </select>
                                                </div>
                                                {formData.secondaryLanguages.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSecondaryLanguage(idx)}
                                                        className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-400/10 rounded-lg transition-colors border border-transparent hover:border-rose-400/30"
                                                        title={t('profile_form.delete')}
                                                    >
                                                        ✖
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all transform hover:scale-[1.02]">
                            {t('profile_form.submit')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
