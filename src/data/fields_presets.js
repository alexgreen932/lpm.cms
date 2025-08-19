import __ from '../languages/index.js';

export const fields_presets = {
    //section
    jc: { title: __('Justify Content'), key: 'jc', type: 'select', ops: 'jc' },
    ai: { title: __('Align Items'), key: 'ai', type: 'select', ops: 'ai' },
    bs: { title: __('Shadow'), key: 'bs', type: 'select', ops: 'bs' },
    m: { title: __('Margin'), key: 'm', type: 'select', ops: 'm' },
    a: { title: __('Group Animation'), tip: __('Animation is applying for all elements of section, you can also add it for every separately, in elements'), key: 'a', type: 'picker', ops: 'a' },

    bp: { title: __('Image Position'), key: 'bp', type: 'select', ops: 'bp', showIf: { bg_type: ['img'] } },
    ba: { title: __('Image Attachment'), key: 'ba', type: 'select', ops: 'ba', showIf: { bg_type: ['img'] } },
    //todo!!! replace with "fb"
    blur: { title: __('Image Blur'), key: 'blur', type: 'range', ops: 'blur' },
    fb: { title: __('Image Blur'), key: 'fb', type: 'range', ops: 'blur', showIf: { bg_type: ['img'] } },
    //todo!!! replace with "o"
    opacity: { title: __('Image Opacity'), tip: __('Useful for creating contrast backgroumd - for example set background image Black and opacity 5(0.5)'), key: 'opacity', type: 'range', ops: 'opacity' },
    o: { title: __('Image Opacity'), tip: __('Useful for creating contrast backgroumd - for example set background image Black and opacity 5(0.5)'), key: 'o', type: 'range', ops: 'opacity', showIf: { bg_type: ['img'] }  },
    img: { title: __('Image(optionaly)'), key: 'img', type: 'media', showIf: { bg_type: ['img'] }  },

    bg_type: { title: __('Background Type'), key: 'bg_type', type: 'select', ops: 'bg_type' },

    bg0: { title: __('Background'), key: 'bg0', type: 'picker', ops:'bg', showIf: { bg_type: ['bg'] }},
    
    grad_dir: { title: __('Gradient Direction'), key: 'grad_dir', type: 'select', ops: 'grad_dir', showIf: { bg_type: ['gr'] } },
    bg1: { title: __('Background Primary'), key: 'bg1', type: 'input', ops:'color', showIf: { bg_type: ['gr'] }},
    bg2: { title: __('Background Seconday'), key: 'bg2', type: 'input', ops:'color', showIf: { bg_type: ['gr'] } },

    //existed
    tip: { title: __('tip'), key: 'tip', type: 'tip' },
    bg: { title: __('Background'), key: 'bg', type: 'picker', ops: 'bg' },
    col: { title: __('Color'), key: 'col', type: 'picker', ops: 'col' },
    i_col: { title: __('Icon Color'), key: 'i_col', type: 'picker', ops: 'col' },
    title: { title: __('Title(optionaly)'), key: 'title', type: 'input' },
    icon: { title: __('Icon(optionaly)'), key: 'icon', type: 'picker', ops: 'icons' },
    ja: { title: __('Animate'), tip: __('You can animate the element individually, but also you can add animation in section settings – in this case elements will play animation one by one with 250ms delay'), key: 'ja', type: 'picker', ops: 'ja' },
    jag: { title: __('Animate'), tip: __('Group animate plays animation one by one with 250ms delay'), key: 'jag', type: 'picker', ops: 'jag' },
    button: { title: __('Button'), tip: __('If no button, but link exist whole element will be a link'), key: 'button', type: 'checkbox', ops: 'icons' },
    url: { title: __('Link(optionaly)'), key: 'url', type: 'input' },
    target: { title: __('Open in'), key: 'target', type: 'select', ops: 'target', showIf: { url: true } },
    link_text: { title: __('Link Text'), key: 'link_text', type: 'input', showIf: { url: true, button: true } },

    
    fd: { title: __('Direction'), key: 'fd', type: 'select', ops: 'fd' },//unknown rm if not used
    dir_main: { title: __('Position Content/Media'), key: 'dir_main', type: 'select', ops: 'fd' },
    dir_title: { title: __('Heading Position'), key: 'dir_title', type: 'select', ops: 'fd' },
    dir_conent: { title: __('Text/Buttons Position'), key: 'dir_conent', type: 'select', ops: 'fd' },


    w: { title: __('Container Width'), key: 'w', type: 'select', ops: 'w' },
    wi: { title: __('Width'), tip: __('Width of element, but if you want all element same width you can set "Child Width in section settings"'), key: 'wi', type: 'select', ops: 'wi' },
    wc: { title: __('Child Elements Width'), tip: __('Makes child elements of block width"'), key: 'wc', type: 'select', ops: 'wc' },

    symbol_mode: { title: __('Symbol Mode'), key: 'symbol_mode', type: 'select', ops: 'symbol_mode' },
    icon_place: { title: __('Where to display icon'), key: 'icon_place', type: 'select', ops: 'icon_place' },

    html: { title: __('Enter HTML code'), key: 'html', type: 'textarea', ops: 'big' },
    src: { title: __('Image'), key: 'src', type: 'media' },
    media: { title: __('Add Media'), key: 'media', type: 'media' },
    link_style: { title: __('Button Background'), key: 'link_style', type: 'picker', ops: 'bg' },

    jc: { title: __('Justify Content'), key: 'jc', type: 'select', ops: 'jc' },
    ai: { title: __('Align Items'), key: 'ai', type: 'select', ops: 'ai' },
    g: { title: __('Gap Between'), key: 'g', type: 'select', ops: 'g' },


    fs: { title: __('Font Size'), key: 'fs', type: 'range', ops: 'fs' },
    i_fs: { title: __('Icon Size'), key: 'i_fs', type: 'range', ops: 'fs' },
    fs_h: { title: __('Title Size'), key: 'fs_h', type: 'range', ops: 'fs' },

    br: { title: __('Border Radius'), key: 'br', type: 'range', ops: 'br' },
    fw: { title: __('Font Weight'), key: 'fw', type: 'select', ops: 'fw' },
    p: { title: __('Padding'), key: 'p', type: 'select', ops: 'p' },
    p_card: { title: __('Padding Whole Card'), key: 'p_card:', type: 'select', ops: 'p' },
    link_color: { title: __('Link Color'), key: 'link_color', type: 'picker', ops: 'col' },
    //content fields
    text: { title: __('Text'), key: 'text', type: 'textarea' },
    tag: { title: __('Tag'), key: 'tag', type: 'select', ops: 'tag' },//w- means - Wisth Item
    pos: { title: __('Position'), key: 'pos', type: 'select', ops: 'pos' },

    'classes': {
        'wi': '',
        'bs': '',
        'bg': 'bg-white',
        'link_style': 'but-blue',
        'dir_main': '',
        'dir_title': '',
        'dir_conent': '',
        'p': 'p-1',
        'pc': '',
        'br': '',
        'fs': 'fs-10',
        'br': 'br-5',
        'separator': __('Button Style'),
        'style_but1': 'but-blue',
        'style_but2': 'but-blue',
        'link_rad': 'br-5',
        'ratio': 'ratio-auto',
        'hover_effect': '',
        'ja': '',
    },
    'el': {
        'title': 'Media Box',
        'an_h': '',
        'text': '',
        'an_t': '',
        'an_m': '',
        'icon': '',
        'an_i': '',
        'button1': 'Demo',
        'url': '',
        'an_b1': '',
        'button2': 'Download',
        'url2': '',
        'an_b2': '',
        'url': '',
    },

    //
    show_caption: { title: __('Show Caption'), key: 'show_caption', type: 'checkbox' },
    pos_a: { title: __('Position Absolute'), key: 'pos_a', type: 'checkbox' },
    use_top: { title: __('Use top'), key: 'use_top', type: 'checkbox', showIf: { pos_a: true } },
    top: { title: __('top'), key: 'top', type: 'range', ops: 'abs_pos', showIf: { use_top: true, use_top: true } },
    use_right: { title: __('Use right'), key: 'use_right', type: 'checkbox', showIf: { pos_a: true } },
    right: { title: __('right'), key: 'right', type: 'range', ops: 'abs_pos', showIf: { use_right: true } },
    use_bottom: { title: __('Use bottom'), key: 'use_bottom', type: 'checkbox', showIf: { pos_a: true } },
    bottom: { title: __('bottom'), key: 'bottom', type: 'range', ops: 'abs_pos', showIf: { use_bottom: true } },
    use_left: { title: __('Use left'), key: 'use_left', type: 'checkbox', showIf: { pos_a: true } },
    left: { title: __('left'), key: 'left', type: 'range', ops: 'abs_pos', showIf: { use_left: true } },
}