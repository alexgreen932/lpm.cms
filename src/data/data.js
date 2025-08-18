import __ from '../languages/index.js';

export const ops = {
  // current: null,//main current icon men
  // current: 'pages',//todo dev
  current_menu: 99,//by default
  // current_menu: 101,//todo change current to current_menu for clearness
  current_menu: 'pages',//dev pages
  current_menu: 'theme',//dev pages
  // current_menu: 'patterns',//dev pages
  // current_menu: 'add',//dev add elem
  current_page: 'homepage',//curremtly loaded
  // current_page: 99,//curremtly loaded
  page_index: 999,
  current_part:null,//adds to parts
  current_section: 99,//curremtly editewd section
  current_el: 99,//curremtly editewd element
  current_edit: null,//what edit - section/element
  page_settings: false,
  page: 'pages',
  show_bar: 99,
  show_sec: 99,
  edit_page: true,
  preview: false,
  pattern_slug: null,
  editable: true,//??
  theme_part: 'Page',
  //pattern, save, edit, new
  save_as_pattern: false,
  pattern: {
    title: '',
    slug: '',
    description: '',
    data: {},
  },
  sample_data:false,
  current_page_data: { sections: [] }, //page which loaded and currently edited
  theme: {page:{},header:{sec:{}},footer:{sec:{}}}

};

export const theme = {page:{},header:{sec:{}},footer:{sec:{}}};

// export const theme = {
//   "title": "Default",
//   "slug": "default",
//   "page": {
//     "bg_type": "",
//     "grad_dir": "to bottom",
//     "bg0": "",
//     "bg1": "#2f1818",
//     "bg2": "#7b6565",
//     "col": "",
//     "p": "",
//     "img": "media/communication.jpg",
//     "o": null,
//     "fb": null,
//     "ba": null,
//     "bp": null
//   },
//   "header": {
//     "sec": {
//       "p_sec": "",
//       "bg_type": "img",
//       "grad_dir": "to bottom",
//       "bg0": "",
//       "bg1": "#000",
//       "bg2": "#777",
//       "col": "tx-gray-d3",
//       "img": "media/communication.jpg",
//       "o": null,
//       "fb": null,
//       "ba": null,
//       "bp": null
//     },
//     "sections": [
//       {
//         "title": "Header Main",
//         "sec": {
//           "bg": "",
//           "col": "tx-gray-d3",
//           "p_sec": ""
//         },
//         "cont": {
//           "w": "w-container",
//           "bg": "",
//           "br": "br-14",
//           "p": "p-1",
//           "jc": "jc-c",
//           "ai": "ai-s",
//           "g": "g-1",
//           "fd": "fd-c",
//           "bs": "",
//           "a": ""
//         },
//         "content": [
//           {
//             "type": "paragraph",
//             "classes": {
//               "fs": "",
//               "col": ""
//             },
//             "el": {
//               "text": "Header"
//             }
//           }
//         ]
//       }
//     ]
//   }
// };

//temp
export const menu = [
  {
    title: 'Close',
    slug: 99,
    icon: 'fa-solid fa-xmark',
    cls: 'tx-white',
  },
  {
    title: 'Pages',
    slug: 'pages',
    icon: 'fa-solid fa-images',
    cls: 'tx-blue-l2',
  },
  {
    title: 'Patterns',
    slug: 'patterns',
    icon: 'fa-solid fa-calendar-days',
    cls: 'tx-red-l2',
  },
  {
    title: 'Theme',
    slug: 'theme',
    icon: 'fa-solid fa-paintbrush',
    cls: 'tx-red-l2',
  },
];
// with localization
// export const menu = [
//     {
//       title: __('Close'),
//       slug: 99,
//       icon: 'fa-solid fa-xmark',
//       cls: 'tx-white',
//     },
//     {
//       title: __('Pages'),
//       slug: 'pages',
//       icon: 'fa-solid fa-images',
//       cls: 'tx-blue-l2',
//     },
//     {
//       title: __('Patterns'),
//       slug: 'patterns',
//       icon: 'fa-solid fa-calendar-days',
//       cls: 'tx-red-l2',
//     },
//     {
//       title: __('Style'),
//       slug: 'style',
//       icon: 'fa-solid fa-paintbrush',
//       cls: 'tx-red-l2',
//     },
//   ];

export const menu2 = [
  {
    title: 'Hide Bar',
    slug: 101,
    icon: 'fa-solid fa-arrows-to-eye',
    cls: 'tx-red-l2',
  },
  {
    title: 'Setting',
    slug: 'setting',
    icon: 'fa-solid fa-gear',
    cls: 'tx-white',
  },
  {
    title: 'Logout',
    slug: 'logout',
    icon: 'fa-solid fa-right-from-bracket',
    cls: 'tx-blue-l2',
  },
];

//rm
export const style = {
  page: {
    edit: 99,
    add: 99,
    bg_type: 'solid',
    bg: '',
    bg2: 'bg-blue-grey',
    col: 'tx-black',
    p: 'p-1',
    img: null,
    ib: null,
    i0: null,
  },
  header: {
    edit: 99,
    add: 99,
    w: 'w-container',
    bg_type: 'solid',
    bg: 'bg-blue-grey-d3',
    bg2: 'bg-blue-grey',
    col: 'tx-white',
    p: 'p-1',
    img: null,
    ib: null, //image-blur
    i0: null, //image-opacity
    jc: 'jc-c',
    ai: 'ai-c',
    g: 'g-1',
    fd: 'fd-c',
    content: [
    ],
  },
  footer: {
    edit: 99,
    add: 99,
    w: 'w-container',
    bg_type: 'solid',
    bg: 'bg-blue-grey-d3',
    bg2: 'bg-blue-grey',
    col: 'tx-white',
    p: 'p-1',
    img: null,
    ib: null, //image-blur
    i0: null, //image-opacity
    jc: 'jc-c',
    ai: 'ai-c',
    g: 'g-1',
    fd: 'fd-c',
    content: [
    ],
  },
};


export const sample = {
  current: null,
  page: 'pages',
  show_bar: 99,
  show_sec: 99,
  edit_page: true,
  menu: [
    {
      title: 'Close',
      slug: 99,
      icon: 'fa-solid fa-xmark',
      cls: 'tx-white',
    },
    {
      title: 'Pages',
      slug: 'pages',
      icon: 'fa-solid fa-file-lines',
      cls: 'tx-blue-l2',
    },
    {
      title: 'Style',
      slug: 'style',
      icon: 'fa-regular fa-image',
      cls: 'tx-red-l2',
    },
  ],
  homepage: {//temp
    title: 'Welcome to Our Site',
    description: 'The best system to create Landing Page and not only. Light, Powerful, Modern.',
    page_style: {
      color: null,
      background: null,
      background_image: null,
      image_blur: null,
      image_opacity: null,
    },
    sections: [
      {
        edit: 99,
        add: 99,
        w: 'w-container',
        bg: 'bg-white',
        p: 'p-1',
        img: null,
        ib: null, //image-blur
        i0: null, //image-opacity
        col: 'tx-gray-d3',
        jc: 'jc-c',
        ai: 'ai-c',
        g: 'g-1',
        fd: 'fd-c',
        content: [
          {
            type: 'heading',
            text: 'Wilcome to LPM',
            fs: 'fs-20',
            tag: 'h1',
            col: null,
            ai: null,
            effect: null,
            anim: null,
          },
          {
            type: 'para',
            text: 'Edit section, you can change its properties and content type',
            fs: 'fs-20',
            tag: 'h1',
            col: null,
            ai: null,
            fw: null,
            anim: null,
          },
        ],
        // content: ,
      },
    ]
  },
};
