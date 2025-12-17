// Theme Toggle Logic
const toggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

toggleBtn.addEventListener('click', () => {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
    toggleBtn.innerText = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
});

// CSV Processing Logic
document.getElementById('csv-file').onchange = function(e) {
    const file = e.target.files[0];
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            const data = results.data.filter(row => Object.values(row).some(v => v !== null));
            document.getElementById('results').classList.remove('hidden');
            
            // 1. Update Stats
            document.getElementById('stat-row-count').innerText = data.length.toLocaleString();
            
            const firstNumCol = Object.keys(data[0]).find(key => typeof data[0][key] === 'number');
            const values = data.map(d => d[firstNumCol]).filter(v => !isNaN(v));
            const mean = values.reduce((a, b) => a + b, 0) / values.length;
            document.getElementById('stat-mean').innerText = mean.toFixed(2);

            // 2. Render Visualization
            renderChart(values.slice(0, 30), firstNumCol);
        }
    });
};

function renderChart(data, label) {
    const ctx = document.getElementById('dataChart').getContext('2d');
    if (window.myChart) window.myChart.destroy(); // Reset chart on new upload
    
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map((_, i) => i + 1),
            datasets: [{
                label: `Trend: ${label}`,
                data: data,
                borderColor: '#0984e3',
                backgroundColor: 'rgba(9, 132, 227, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}