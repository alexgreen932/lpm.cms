//todo save orinitive to, just without stringify, parce 

export function saveLocal(data, key) {
    
    console.log('Localstorage saving ', data);
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error("Save to localStorage failed:", e);
    }
}

export function getLocal(defaultData, key) {
    try {
        const saved = localStorage.getItem(key);
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge saved data into defaultData (keeps reactivity)
            Object.assign(defaultData, parsed);
        }
    } catch (e) {
        console.error("Load from localStorage failed:", e);
    }
}
