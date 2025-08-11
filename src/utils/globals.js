export function resetSectionsEl() {
    this.ops = {
        //can be add more currently i need reset 3 bellow
        page_id: null,
        current_section: null,
        current_el: null,
        //   page: 'pages',
        //   show_bar: false,
        //   show_bar: false,
        //   show_sec: false,
        //   edit_page: true,
    }

};

function id() {
    const key = Math.random()
        .toString(16)
        .slice(2);
    // console.log('key: ', key);
    // console.log('e: ', e);
    // if(e == key) return;
    return key;
};

export {id};//for using separatly

export function freshId(item) {
    // Create a fresh copy of item
    let cloneMe = JSON.parse(JSON.stringify(item));

    delete cloneMe.id;
    cloneMe.id = id();

    return cloneMe;
};
