export const ops = {
   current: null,//main current icon men
  current: 'pages',//todo dev
  current_page: 'homepage',//??
  page_id: null,//based on index
  current_section: null,
  current_el: null,
  page: 'pages',
  show_bar: false,
  show_sec: false,
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
        edit: false,
        add: false,
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

//temp
export const style = {
  page: {
    edit: false,
    add: false,
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
    edit: false,
    add: false,
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
    edit: false,
    add: false,
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
  show_bar: false,
  show_sec: false,
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
        edit: false,
        add: false,
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
