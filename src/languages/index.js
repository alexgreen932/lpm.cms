import { ru } from './ru.js';//todo temp for dev

// define available languages
const languages = { ru };

//an object, just for collecting not existion language strings(key of object)
const dev_language = ru;

export {dev_language};//for displayng if textarea to copy

export default function _(v) {
    // get 'en' from 'en-US'
    const langCode = (navigator.language || 'en').slice(0, 2);

    // fallback to English if language missing
    const currentLang = languages[langCode] || {};

    // return translation or fallback to key
    if (currentLang[v]) {
        return currentLang[v];
    } else {
        dev_language[v] = '';
        return v;
    }
}

