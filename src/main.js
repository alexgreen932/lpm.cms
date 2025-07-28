import { createApp } from 'vue'
import App from './App.vue'

// Globals
import { saveLocal, getLocal } from './admin/localstorage.js';
import __ from './languages/index.js';
import {resetSectionsEl} from './utils/globals.js';


const app = createApp(App) // createApp must be stored in a variable



// Add global functions (like your old app.config.globalProperties)
app.config.globalProperties.$saveLocal = saveLocal
app.config.globalProperties.$getLocal = getLocal
app.config.globalProperties.$isActive = (current, index) =>
  current === index ? 'isActive' : '';
app.config.globalProperties.$domain = window.location.origin;
app.config.globalProperties.$__ = __;
app.config.globalProperties.$resetSectionsEl = resetSectionsEl;


// (Optional) Global components
// import AdminBar from './admin/AdminBar.vue'
// app.component('admin-bar', AdminBar)

// Mount
app.mount('#app')


