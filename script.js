let currentData = []; // Global state to hold the dataset
let selectedColumn = "";
const htmlEl = document.documentElement;

// --- 1. Theme Toggle ---
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
    toggleBtn.innerText = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
});

// --- 2. Core Statistical Functions (AI/ML Logic) ---

// Z-Score Anomaly Detection: Z = (x - mean) / stdDev
function detectAnomalies(values) {
    if (values.length < 2) return [];
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const stdDev = Math.sqrt(values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / values.length);
    
    // Returns count of values where Z-score > 2 (95% confidence interval)
    return values.filter(v => Math.abs((v - mean) / stdDev) > 2).length;
}

function calculateHealth(data) {
    const totalCells = data.length * Object.keys(data[0]).length;
    let nullCount = 0;
    data.forEach(row => {
        Object.values(row).forEach(val => { if (val === null || val === "") nullCount++; });
    });
    const score = ((totalCells - nullCount) / totalCells) * 100;
    return score.toFixed(1) + "%";
}

// --- 3. CSV Handling & Parsing ---
document.getElementById('csv-file').onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            currentData = results.data;
            initStudio();
        }
    });
};

// --- 4. Studio Initialization ---
function initStudio() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');

    // Populate Column Selector with numeric keys only
    const numCols = Object.keys(currentData[0]).filter(key => typeof currentData[0][key] === 'number');
    const selector = document.getElementById('column-select');
    selector.innerHTML = numCols.map(col => `<option value="${col}">${col}</option>`).join('');
    
    selectedColumn = numCols[0];
    refreshUI();
}

function refreshUI() {
    if (!currentData.length) return;

    // Update Top Cards
    document.getElementById('stat-row-count').innerText = currentData.length.toLocaleString();
    document.getElementById('stat-health').innerText = calculateHealth(currentData);

    const values = currentData.map(d => d[selectedColumn]).filter(v => !isNaN(v) && v !== null);
    document.getElementById('stat-anomalies').innerText = detectAnomalies(values);

    renderChart(values.slice(0, 100), selectedColumn); // Display first 100 points for speed
}

// --- 5. Data Operations (Cleaning) ---

// Change column
document.getElementById('column-select').onchange = (e) => {
    selectedColumn = e.target.value;
    refreshUI();
};

// Remove Nulls
document.getElementById('btn-clean').onclick = () => {
    currentData = currentData.filter(row => row[selectedColumn] !== null && row[selectedColumn] !== "");
    refreshUI();
    alert("Null values removed from current column.");
};

// Remove Duplicates
document.getElementById('btn-dedupe').onclick = () => {
    const initialCount = currentData.length;
    const seen = new Set();
    currentData = currentData.filter(item => {
        const k = JSON.stringify(item);
        return seen.has(k) ? false : seen.add(k);
    });
    refreshUI();
    alert(`Removed ${initialCount - currentData.length} duplicate rows.`);
};

// Export CSV
document.getElementById('btn-download').onclick = () => {
    const csv = Papa.unparse(currentData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "cleaned_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// --- 6. Chart Rendering ---
function renderChart(data, label) {
    const ctx = document.getElementById('dataChart').getContext('2d');
    if (window.myChart) window.myChart.destroy();
    
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map((_, i) => i + 1),
            datasets: [{
                label: label,
                data: data,
                borderColor: '#0984e3',
                backgroundColor: 'rgba(9, 132, 227, 0.05)',
                borderWidth: 2,
                pointRadius: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}
