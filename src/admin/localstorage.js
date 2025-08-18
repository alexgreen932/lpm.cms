//todo save orinitive to, just without stringify, parce 

export function saveLocal(data, key) {
    
    // 
    //     
    // if (typeof data !=='object') {    
    //     
    //     return;
    // }
    localStorage.setItem(key, JSON.stringify(data));
    
}

export function getLocal(defaultData, key) {
            
    const saved = localStorage.getItem(key);
        if (saved) {
            
            defaultData = JSON.parse(saved);  
              
        }
}

// old -----

// export function saveLocal(data, key) {
    
//     
//     try {
//         localStorage.setItem(key, JSON.stringify(data));

//         
//     } catch (e) {
//         
//     }
// }

// export function getLocal(defaultData, key) {
//     try {
//         const saved = localStorage.getItem(key);
//         if (saved) {
//             const parsed = JSON.parse(saved);
//             // Merge saved data into defaultData (keeps reactivity)
//             Object.assign(defaultData, parsed);
//                     
//         }
//     } catch (e) {
//         
//     }
// }
