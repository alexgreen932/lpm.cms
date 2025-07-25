import { ru } from './ru.js';

// define available languages
const languages = { ru };

export default function _(v) {
    // get 'en' from 'en-US'
    const langCode = (navigator.language || 'en').slice(0, 2);

    // fallback to English if language missing
    const currentLang = languages[langCode] || {};

    // return translation or fallback to key
    if (currentLang[v]) {
        return currentLang[v];
    } else {
        console.warn(
            `%c localization Value "${v}" not Exist`,
            'background:#b2ebf2;color:#000; padding:3px 7px;'
        );
        return v;
    }
}
