import { createApp } from 'vue'
import App from './App.vue'

// Globals
import { saveLocal, getLocal } from './admin/localstorage.js';
import __ from './languages/index.js';
import tipDelay from './utils/tipDelay.js'
import { id, freshId } from './utils/globals.js';//global functions

import initializeAnimation from './utils/animate.js';


const app = createApp(App) // createApp must be stored in a variable



// Add global functions (like your old app.config.globalProperties)
app.config.globalProperties.$saveLocal = saveLocal
app.config.globalProperties.$getLocal = getLocal
app.config.globalProperties.$isActive = (current, index) =>
  current === index ? 'isActive' : '';
app.config.globalProperties.$domain = window.location.origin;//todo!!! replace ${site} with domain everywhere
app.config.globalProperties.$__ = __;
app.config.globalProperties.$id = id;//generate random id
app.config.globalProperties.$freshId = freshId; //return an object with fresh id
// app.config.globalProperties.$resetSectionsEl = resetSectionsEl;

//directive 
app.directive('tt', tipDelay)


// (Optional) Global components
// import AdminBar from './admin/AdminBar.vue'
// app.component('admin-bar', AdminBar)

// Mount
app.mount('#app');
initializeAnimation();


