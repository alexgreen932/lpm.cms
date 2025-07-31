import __ from '../languages/index.js';

export const fields_presets = {
    src: { title: __('Image'), key: 'src', type: 'media' },
    bg: { title: __('Background'), key: 'bg', type: 'picker', ops: 'bg' },
    w: { title: __('Container Width'), key: 'w', type: 'select', ops: 'w' },
    jc: { title: __('Justify Content'), key: 'jc', type: 'select', ops: 'jc' },
    ai: { title: __('Align Items'), key: 'ai', type: 'select', ops: 'ai' },
    fs: { title: __('Font Size'), key: 'fs', type: 'range', ops: 'fs' },
    fw: { title: __('Font Weight'), key: 'fw', type: 'select', ops: 'fw' },
    col: { title: __('Color'), key: 'col', type: 'picker', ops: 'col' },
    //content fields
    text: { title: __('Text'), key: 'text', type: 'textarea' },
    tag: { title: __('Tag'), key: 'tag', type: 'select', ops: 'tag' },
    wi: { title: __('Width'), key: 'wi', type: 'select', ops: 'wi' },//w- means - Wisth Item
    pos: { title: __('Position'), key: 'pos', type: 'select', ops: 'pos' },

    //
    show_caption: { title: __('Show Caption'), key: 'show_caption', type: 'checkbox' },
    pos_a: { title: __('Position Absolute'), key: 'pos_a', type: 'checkbox' },
    use_top: { title: __('Use top'), key: 'use_top', type: 'checkbox',showIf:{pos_a:true}},
    top: { title: __('top'), key: 'top', type: 'range' , ops:'abs_pos', showIf:{use_top:true,use_top:true}},
    use_right: { title: __('Use right'), key: 'use_right', type: 'checkbox',showIf:{pos_a:true} },
    right: { title: __('right'), key: 'right', type: 'range' , ops:'abs_pos', showIf:{use_right:true}},
    use_bottom: { title: __('Use bottom'), key: 'use_bottom', type: 'checkbox',showIf:{pos_a:true} },
    bottom: { title: __('bottom'), key: 'bottom', type: 'range' , ops:'abs_pos', showIf:{use_bottom:true}},
    use_left: { title: __('Use left'), key: 'use_left', type: 'checkbox',showIf:{pos_a:true} },
    left: { title: __('left'), key: 'left', type: 'range' , ops:'abs_pos', showIf:{use_left:true}},
}