/*
Created by Sari I. Younan
02/05/2024 19:13:18
test.js
*/

import React from 'react';
// import './App.css';
import Authentication from './authentication';
import {HashRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from "./login";
import BudgetTracker from "./budgetTracker";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <HashRouter>
                    <div>
                        <Route exact path="/" render={()=><Login />}/>
                        <Route path="/signin" render={()=><Authentication />}/>
                        <Route exact path="/sheet" render={()=><BudgetTracker />}/>
                    </div>
                </HashRouter>
            </Provider>
        </div>
    );
}

export default App;