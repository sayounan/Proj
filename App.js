/*
Created by Sari I. Younan
02/05/2024 19:13:18
test.js
*/

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);  // Check what data is returned
            if(data && data.currency) {
                document.getElementById('currency').textContent = data.currency;
            } else {
                document.getElementById('currency').textContent = 'USD';  // Fallback if no currency data
            }
        })
        .catch((error) => {
            console.error('Error fetching currency:', error);
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
