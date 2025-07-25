// import { en } from './en.js';
import { ru } from './ru.js';

const languages = { ru };

export default function _(v) {
    let langCode = navigator.language.slice(0, 2); // get 'en' from 'en-US'
    let currentLang = languages[langCode];
       
    if (currentLang[v]) {
        return currentLang[v];
    } else {
    console.warn(`%c localization Value "${v}" not Exist`, 'background:#b2ebf2;color:#000; padding:3px 7px;');
      return v;
    }
}

// test
