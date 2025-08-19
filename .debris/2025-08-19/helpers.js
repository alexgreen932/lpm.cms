/**
 * Fetch and parse JSON from a file path.
 * @param {string} path - File path or URL
 * @returns {Promise<Object|null>} - Parsed object or null on error
 */
export async function fetchFile(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to fetch: ${path}`);
        
        const data = await response.json();
        return typeof data === "object" ? data : null;
    } catch (err) {
        console.warn("Fetch error:", err.message);
        return null;
    }
}
