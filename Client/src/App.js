/*
Created by Sari I. Younan
02/05/2024 19:13:18
test.js
*/

import React from 'react';
// import './App.css';
import Authentication from './components/authentication';
import {HashRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import Login from "./components/login";
import BudgetTracker from "./components/budgetTracker";
import Register from "./components/register";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <HashRouter>
                    <div>
                        <Route exact path="/" render={()=><Login />}/>
                        <Route path="/signin" render={()=><Authentication />}/>
                        <Route path="/signup" render={()=><Register />}/>
                        <Route exact path="/sheet" render={()=><BudgetTracker />}/>
                    </div>
                </HashRouter>
            </Provider>
        </div>
    );
}

export default App;