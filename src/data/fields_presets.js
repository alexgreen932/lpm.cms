import __ from '../languages/index.js';

export const fields_presets = {
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
}