/*
Created by Sari I. Younan
04/05/2024 15:13:18
test.js
*/

import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';  // Make sure to install node-fetch if not already installed

const dom = new JSDOM(`
<!DOCTYPE html>
<html lang="">
<body>
<div id="currency"></div>
<form id="budgetForm">
    <input id="title" type="text" />
    <input id="amount" type="number" />
    <input id="description" type="text" />
</form>
<div id="budgetList"></div>
</body>
</html>`);

const { window } = dom;
const { document } = window;

// Simulate DOMContentLoaded event
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
});

function addBudgetEntry(title, amount, description, currency) {
    const entryDiv = document.createElement('div');
    entryDiv.textContent = `${title}: ${amount.toFixed(2)} ${currency} : ${description}`;
    document.getElementById('budgetList').appendChild(entryDiv);
}

fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        const currencyCode = data.currency
        console.log(currencyCode);  // Output full data for debugging
        document.getElementById('currency').textContent = determineCurrency(data);
    })
    .catch(() => {
        document.getElementById('currency').textContent = 'USD';
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

// Optionally, print out the HTML to see what it looks like after manipulation
setTimeout(() => console.log(dom.serialize()), 2000);  // Delay to allow fetch and other async operations to complete
