/*
Created by Sari I. Younan
04/05/2024 18:53:13
budgetTracker.js
*/

import React, { useState } from 'react';
import './styles.css';  // Assuming styles.css is in the src folder

function BudgetTracker() {
    const [currency, setCurrency] = useState('USD');
    const [entries, setEntries] = useState([]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const amount = event.target.amount.value;
        const description = event.target.description.value || 'No description';

        const newEntry = {
            timestamp: new Date().toLocaleString(),
            title,
            amount,
            description
        };

        setEntries([...entries, newEntry]);

        // Reset form
        event.target.title.value = '';
        event.target.amount.value = '';
        event.target.description.value = '';
    };

    return (
        <div>
            <h1>Budget Tracker</h1>
            <form id="budgetForm" onSubmit={handleFormSubmit}>
                <p>Currency: <span id="currency">{currency}</span></p>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Enter title" required />

                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" name="amount" placeholder="Enter amount" required />

                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" placeholder="Enter description" />

                <button type="submit">Add Entry</button>
            </form>

            <div id="budgetTableContainer">
                <table id="budgetTable">
                    <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {entries.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.timestamp}</td>
                            <td>{entry.title}</td>
                            <td>{entry.amount}</td>
                            <td>{entry.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BudgetTracker;
