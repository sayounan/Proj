document.addEventListener('DOMContentLoaded', function() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('currency').textContent = data.currency;
        })
        .catch(() => {
            document.getElementById('currency').textContent = 'USD';
        });
});

document.getElementById('budgetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const currency = document.getElementById('currency').textContent;
    addBudgetEntry(title, amount, description, currency);
    document.getElementById('title').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
});

function addBudgetEntry(title, amount, description, currency) {
    const entryDiv = document.createElement('div');
    entryDiv.textContent = `${title}: ${amount.toFixed(2)} ${currency} : ${description}`;
    document.getElementById('budgetList').appendChild(entryDiv);
}
