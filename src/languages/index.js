// import { en } from './en.js';
import { ru } from './ru.js';

const languages = { ru };

export default function _(v) {
    let langCode = navigator.language.slice(0, 2); // get 'en' from 'en-US'
    let currentLang = languages[langCode];

    
    if (currentLang[v]) {
        return currentLang[v];
    } else {
      return v;
        console.warn(`%cCREATE in file ${currentLang} - "${v}"`, 'background:#283593; color: #fff; padding:3px;font-weight:bold;');
    }
}

// test
