import { createApp } from 'vue'
import App from './App.vue'

// Your globals
import { saveLocal, getLocal } from './admin/localstorage.js'

const app = createApp(App) // createApp must be stored in a variable

// Add global functions (like your old app.config.globalProperties)
app.config.globalProperties.$saveLocal = saveLocal
app.config.globalProperties.$getLocal = getLocal

// (Optional) Global components
// import AdminBar from './admin/AdminBar.vue'
// app.component('admin-bar', AdminBar)

// Mount
app.mount('#app')


