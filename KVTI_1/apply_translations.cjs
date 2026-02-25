const fs = require('fs');

try {
    let content = fs.readFileSync('src/components/BaseProfileForm.jsx', 'utf-8');

    // Replace all options
    content = content.replace(/<option value=\"([^\"]+)\">([^<]+)<\/option>/g, (match, val, label) => {
        if (label.includes('t(')) return match;
        // Skip keys that we already translated
        if (['0', '1', '2', '3', '4', '5', '6', 'none', 'basic', 'business', 'native', '1학년', '2학년', '3학년', '4학년', '석박사', '졸업'].includes(val)) {
            return match;
        }
        if (val === '') return match;

        return `<option value="${val}">{t(\`profile_data.${val}\`)}</option>`;
    });

    // Replace optgroups
    content = content.replace(/<optgroup (?:key=\{[^\}]+\} )?label=\"([^\"]+)\">/g, (match, label) => {
        if (label.includes('t(')) return match;
        const keyPart = match.includes('key=') ? match.match(/key=\{[^\}]+\} /)[0] : '';
        return `<optgroup ${keyPart}label={t(\`profile_data.${label}\`)}>`;
    });

    // Specifically handle the univ map
    content = content.replace(/<option key=\{univ\} value=\{univ\}>\{univ\}<\/option>/g,
        "<option key={univ} value={univ}>{t(`profile_data.${univ}`)}</option>");

    fs.writeFileSync('src/components/BaseProfileForm.jsx', content);
    console.log('Successfully replaced options!');
} catch (e) {
    console.error(e);
    process.exit(1);
}
