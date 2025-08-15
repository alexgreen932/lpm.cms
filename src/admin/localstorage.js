//todo save orinitive to, just without stringify, parce 

export function saveLocal(data, key) {
    
    // console.log('Localstorage saving ', data);
    //     console.log('typeof dat: ', typeof dat);
    // if (typeof data !=='object') {    
    //     console.error(`%c Saving data ${data} is not an object`, 'color: #00f', );
    //     return;
    // }
    localStorage.setItem(key, JSON.stringify(data));
    console.log('saved succesfuly!!!');
}

export function getLocal(defaultData, key) {
            console.log('saved started');
    const saved = localStorage.getItem(key);
        if (saved) {
            console.log('saved found');
            defaultData = JSON.parse(saved);  
            console.log('saved asigned');  
        }
}

// old -----

// export function saveLocal(data, key) {
    
//     console.log('Localstorage saving ', data);
//     try {
//         localStorage.setItem(key, JSON.stringify(data));

//         console.log('%c saved locally', 'color: #733d00', data);
//     } catch (e) {
//         console.error("Save to localStorage failed:", e);
//     }
// }

// export function getLocal(defaultData, key) {
//     try {
//         const saved = localStorage.getItem(key);
//         if (saved) {
//             const parsed = JSON.parse(saved);
//             // Merge saved data into defaultData (keeps reactivity)
//             Object.assign(defaultData, parsed);
//                     console.log('%c get locally', 'color: #733d00', key);
//         }
//     } catch (e) {
//         console.error("Load from localStorage failed:", e);
//     }
// }
