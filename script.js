const toggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Theme Toggle
toggleBtn.addEventListener('click', () => {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
    toggleBtn.innerText = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
});

// CSV Handling
document.getElementById('csv-file').onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            const data = results.data;
            
            // UI transition
            document.getElementById('welcome-screen').classList.add('hidden');
            document.getElementById('results').classList.remove('hidden');
            
            // Set Row Count
            document.getElementById('stat-row-count').innerText = data.length.toLocaleString();
            
            // Find numerical data
            const firstNumCol = Object.keys(data[0]).find(key => typeof data[0][key] === 'number');
            
            if (firstNumCol) {
                const values = data.map(d => d[firstNumCol]).filter(v => !isNaN(v) && v !== null);
                const mean = values.reduce((a, b) => a + b, 0) / values.length;
                document.getElementById('stat-mean').innerText = mean.toFixed(2);
                renderChart(values.slice(0, 50), firstNumCol);
            }

            document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
        }
    });
};

function renderChart(data, label) {
    const ctx = document.getElementById('dataChart').getContext('2d');
    if (window.myChart) window.myChart.destroy();
    
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
