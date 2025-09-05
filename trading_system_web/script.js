// Mock forex data
const forexData = {
    "EUR/USD": { price: 1.0854, change: 0.0012 },
    "GBP/USD": { price: 1.2658, change: -0.0008 },
    "USD/JPY": { price: 151.23, change: 0.35 },
    "AUD/USD": { price: 0.6589, change: 0.0021 }
};

let chart = null;

// Initialize chart
function initChart() {
    const chartContainer = document.getElementById('chart-container');
    if (!chartContainer) return;
    
    const ctx = chartContainer.getContext('2d');
    if (!ctx) return;
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Price History',
                data: [1.05, 1.08, 1.07, 1.09, 1.10],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Update prices in real-time
function updatePrices() {
    const pairSelect = document.querySelector('select');
    const currentPair = pairSelect.value;
    const pairData = forexData[currentPair];
    
    document.querySelector('input[type="number"]').value = pairData.price.toFixed(4);
    
    if (chart) {
        // Add new data point and remove oldest
        chart.data.labels.push(new Date().toLocaleTimeString());
        chart.data.datasets[0].data.push(
            chart.data.datasets[0].data.slice(-1)[0] + (Math.random() * 0.02 - 0.01)
        );
        
        if (chart.data.labels.length > 20) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }
        
        chart.update();
    }

    setTimeout(updatePrices, 2000);
}

// Trading functionality
function setupTrading() {
    document.querySelector('.bg-green-500').addEventListener('click', () => {
        const pair = document.querySelector('select').value;
        const amount = document.querySelector('input').value;
        alert(`Buy order placed for ${amount} ${pair}`);
    });

    document.querySelector('.bg-red-500').addEventListener('click', () => {
        const pair = document.querySelector('select').value;
        const amount = document.querySelector('input').value;
        alert(`Sell order placed for ${amount} ${pair}`);
    });
}

// Navigation function
function navigateToTrading() {
    window.location.href = 'index.html';
}

// Initialize application
function init() {
    // Check if we're on home page
    const tradeButton = document.getElementById('tradeButton');
    if (tradeButton) {
        tradeButton.addEventListener('click', navigateToTrading);
        return;
    }

    // Otherwise initialize trading page
    initChart();
    setupTrading();
    updatePrices();
    
    window.addEventListener('resize', () => {
        if (chart) {
            chart.resize();
        }
    });
}

// Start application
document.addEventListener('DOMContentLoaded', init);
