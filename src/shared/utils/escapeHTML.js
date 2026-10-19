export const esc = (value) => {
    const escape_HTML = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt',
        '"': '&quot;',
        "'": '&#39;'
    }
    return String(value).replace(/[&<>"']/g, (char) => escape_HTML[char]);
}