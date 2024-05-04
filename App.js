document.getElementById('budgetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    addBudgetEntry(title, amount, description);
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
});

function addBudgetEntry(title, amount, description) {
    const entryDiv = document.createElement('div');
    entryDiv.textContent = `${title}: $${amount.toFixed(2)}: ${description}`;
    document.getElementById('budgetList').appendChild(entryDiv);
}
