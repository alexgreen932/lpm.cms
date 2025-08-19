
// import toolbar from './toolbar.js';
import {fields_presets} from '../data/fields_presets.js';

export default {
  dataString(v) {
    return JSON.stringify(v);
    // return JSON.stringify(v ?? {}, null, 2);
  },
  hoverTip(v) {
    setTimeout(() => {

    }, 1000);
  },
  // classes(e) {
  //   return Object.values(e).filter(Boolean);
  // },
  classes(e, exclude = null) {
    // Return empty array if not an object
    if (!e || typeof e !== 'object') return [];

    // Convert exclude to array (supports comma separated strings)
    let excludedKeys = [];
    if (typeof exclude === 'string') {
      excludedKeys = exclude.split(',').map(k => k.trim());
    } else if (Array.isArray(exclude)) {
      excludedKeys = exclude;
    }

    // Pick source: nested classes key or the object itself
    const source = (e.classes && typeof e.classes === 'object') ? e.classes : e;

    return Object.entries(source)
      .filter(([key, value]) => !excludedKeys.includes(key) && Boolean(value))
      .map(([, value]) => value);
  },
  reset() {
    this.ops.current_section = 99;
    this.ops.current_el = 99;
    this.ops.edit_meta = false;
  },
  reset_full() {
    this.ops.page_index = 999;
    this.ops.current_section = 99;
    this.ops.current_el = 99;
    this.ops.edit_meta = false;
  },
  saveLocal() { this.$saveLocal(this.ops, 'state_ops') },
  openAdmin() {
    this.ops.current_menu = 99;
    let front = document.getElementById('pade');
    front.style.display = 'none';
  },
  closeAdmin() {
    this.ops.current_menu = 99;
    let front = document.getElementById('pade');
    front.style.display = 'flex';
  },
  showSidebar(e) {//todo rm


    if (this.ops.current_menu == e) {
      this.ops.current_menu = 99;
    } else {
      this.ops.current_menu = e;
    }
    this.isBar();
    this.isSidebar();

  },
  isSidebar() {

    let page = document.getElementById('app');
    let front = document.getElementById('page');

    if (this.ops.current_menu && this.ops.current_menu !== 99) {
      page.classList.remove('isBar');
      page.classList.add('isSidebar');
      front.classList.add('j-hidden');
    } else {
      page.classList.remove('isSidebar');
      front.classList.add('j-hidden');
    }
  },
  isBar() {

    let page = document.getElementById('app');
    let front = document.getElementById('page');
    if (this.ops.current_menu == 99) {
      page.classList.remove('isSidebar');
      page.classList.add('isBar');
      front.classList.add('j-hidden');
    } else {
      page.classList.add('isBar');
      front.classList.add('j-hidden');

    }
  },
  renderFields(obj) {
    let fields = [];

    //get existing keys
    let keys = Object.keys(obj);
    

    keys.forEach((e) => {
      //key exist in fields_preset
      if (e in fields_presets) {
        let field = fields_presets[e];
        fields.push(field);
      }
    })

    return fields;
  },
};
