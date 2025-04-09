// Currency formatting
let currency = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'USD'
});

function updateCurrency() {
    currency = new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: document.getElementById('currencySelect').value
    });
    calculate();
}

// Date formatting
function formatDate(date) {
    return new Intl.DateTimeFormat(navigator.language, {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(date);
}

// Chart initialization
let loanChart;
function updateChart(principal, interest) {
    if (loanChart) loanChart.destroy();
    
    const ctx = document.getElementById('loanChart').getContext('2d');
    loanChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ['#24774c', '#3c9d6a']
            }]
        }
    });
}

// Optimization Tips
function generateTips(schedule) {
    const totalInterest = schedule.reduce((acc, curr) => acc + curr.interest, 0);
    const tips = [];
    
    // Tip 1: Maintain EMI to reduce tenure
    const possibleTenureReduction = Math.floor(schedule.length * 0.15);
    tips.push(`Maintaining your current EMI could reduce loan tenure by ~${possibleTenureReduction} months`);
    
    // Tip 2: Early prepayment impact
    tips.push(`A 10% prepayment now could save ${currency.format(totalInterest * 0.2)} in interest`);
    
    // Tip 3: Rate negotiation
    tips.push("0.5% rate reduction could save ~15% in total interest");
    
    return tips;
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Event Adjustment Options
function createEventAdjustment(event) {
    return `
        <div class="event-adjustment">
            <button onclick="adjustEMI(${eventIndex})">Keep EMI</button>
            <button onclick="adjustTenure(${eventIndex})">Keep Tenure</button>
        </div>
    `;
}
