import * as XLSX from 'xlsx';
export function parseExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                // Skip header row and convert to WellDataRow format
                const rows = jsonData.slice(1).map((row) => ({
                    depth: parseFloat(row[0]) || 0,
                    dt: parseFloat(row[1]) || 0,
                    gr: parseFloat(row[2]) || 0,
                    rock_type: row[3] || 'Unknown',
                    formation: row[4] || 'Unknown',
                    rop: parseFloat(row[5]) || 0,
                })).filter(row => row.depth > 0);
                resolve(rows);
            }
            catch (error) {
                reject(new Error('Failed to parse Excel file'));
            }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsArrayBuffer(file);
    });
}
export function parseCSVFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                const lines = text.split('\n');
                // Skip header row
                const rows = lines.slice(1).map(line => {
                    const cols = line.split(',');
                    return {
                        depth: parseFloat(cols[0]) || 0,
                        dt: parseFloat(cols[1]) || 0,
                        gr: parseFloat(cols[2]) || 0,
                        rock_type: cols[3]?.trim() || 'Unknown',
                        formation: cols[4]?.trim() || 'Unknown',
                        rop: parseFloat(cols[5]) || 0,
                    };
                }).filter(row => row.depth > 0);
                resolve(rows);
            }
            catch (error) {
                reject(new Error('Failed to parse CSV file'));
            }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}
export function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    }
    catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}
export function loadFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    catch (error) {
        console.error('Failed to load from localStorage:', error);
        return null;
    }
}
