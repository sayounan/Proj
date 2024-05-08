/*
Created by Sari I. Younan
04/05/2024 18:53:13
budgetTracker.js
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom'; // Import withRouter for navigation
import './styles.css';

class BudgetTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: 'USD',
            entries: []
        };
    }

    componentDidMount() {
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    currency: data.currency || 'USD'
                });
            })
            .catch(() => {
                this.setState({
                    currency: 'USD'
                });
            });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const amount = event.target.amount.value;
        const { currency } = this.state;
        const description = event.target.description.value || 'No description';

        const newEntry = {
            timestamp: new Date().toLocaleString(),
            title: title,
            amount: amount,
            currency: currency,
            description: description
        };

        this.setState(prevState => ({
            entries: [...prevState.entries, newEntry]
        }));

        // Reset form
        event.target.title.value = '';
        event.target.amount.value = '';
        event.target.currency.value = '';
        event.target.description.value = '';
    };

    logout = () => {
        this.props.logoutUser();
        this.props.history.push('/login');
    };

    render() {
        const { currency, entries } = this.state;
        return (
            <div>
                <h1>Budget Tracker</h1>
                <button onClick={this.logout}>Logout</button>
                <form id="budgetForm" onSubmit={this.handleFormSubmit}>
                    <p>Currency: <span id="currency">{currency}</span></p>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" placeholder="Enter Expense" required/>

                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" name="amount" placeholder="Enter amount" required/>

                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" placeholder="Enter description"/>

                    <button type="submit">Add Entry</button>
                </form>

                <div id="budgetTableContainer">
                    <table id="budgetTable">
                        <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {entries.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.timestamp}</td>
                                <td>{entry.title}</td>
                                <td>{entry.amount}</td>
                                <td>{entry.currency}</td>
                                <td>{entry.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, { logoutUser })(BudgetTracker));
