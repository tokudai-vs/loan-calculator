// Currency formatting using CDN polyfill if needed
const currencyFormatter = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'INR' // Default currency
});

// Initialize Chart.js from CDN
let loanChart;
function initChart() {
    const ctx = document.getElementById('loanChart').getContext('2d');
    loanChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [0, 0],
                backgroundColor: [var(--primary), var(--secondary)]
}]
        }
    });
}

// Date formatting using Luxon CDN
const DateTime = luxon.DateTime;
function formatDate(date) {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL);
}

// Initialize currency dropdown
function initCurrencies() {
    const currencies = {
        'INR': 'Indian Rupee',
        'USD': 'US Dollar',
        'EUR': 'Euro',
        'GBP': 'British Pound'
    };

    const select = document.getElementById('currencySelect');
    select.innerHTML = Object.entries(currencies)
        .map(([code, name]) => `<option value="${code}">${code} - ${name}</option>`)
        .join('');

    // Set default based on locale
    select.value = Intl.DateTimeFormat().resolvedOptions().timeZone.startsWith('Asia') ? 'INR' : 'USD';
}

// Rest of your JavaScript code