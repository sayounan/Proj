/*
Created by Sari I. Younan
04/05/2024 18:57:47
budgetActions.js
*/

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            document.getElementById('currency').textContent = data.currency || 'USD';
        })
        .catch(error => {
            console.error('Error fetching currency:', error);
            document.getElementById('currency').textContent = 'USD';
        });

    const budgetForm = document.getElementById('budgetForm');
    if (budgetForm) {
        budgetForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const description = document.getElementById('description').value || 'No description';

            //fetch('localhost:8080/add-entry', {
            fetch('https://proj-f7nj.onrender.com/add-entry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, amount, description })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    addBudgetEntry(title, amount, description);
                    document.getElementById('title').value = '';
                    document.getElementById('amount').value = '';
                    document.getElementById('description').value = '';
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }
});

function addBudgetEntry(title, amount, description) {
    const table = document.getElementById('budgetTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    const timestamp = new Date().toLocaleString();
    const cellsText = [timestamp, title, amount.toFixed(2), description];
    cellsText.forEach(text => {
        const cell = row.insertCell();
        cell.textContent = text;
    });
}