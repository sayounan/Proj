import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './login';
import Register from './register';
import { logoutUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';

class Authentication extends Component {

    constructor(props){
        super(props);

        this.state = {
            toggleReg: false
        };
    }

    componentDidMount(){
        if (this.props.loggedIn) {
            this.props.history.push('/sheet');
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            this.props.history.push('/sheet');
        }
    }

    showLogin = () => {
        this.setState({ toggleReg: false });
    }

    showReg = () => {
        this.setState({ toggleReg: true });
    }

    logout = () => {
        this.props.dispatch(logoutUser());
        this.props.history.push('/login');
    }

    render(){
        const userNotLoggedIn = (
            <div>
                <button onClick={this.showLogin}>Login</button>
                <button onClick={this.showReg}>Register</button>
                { this.state.toggleReg ? <Register /> : <Login /> }
            </div>
        );

        const userLoggedIn = (
            <div>Logged in as: {this.props.username}
                <button onClick={this.logout}>Logout</button>
            </div>
        );

        return (
            <div>
                {this.props.loggedIn ? userLoggedIn : userNotLoggedIn}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.auth.loggedIn,
    username: state.auth.username
});

export default withRouter(connect(mapStateToProps)(Authentication));  // Wrap with withRouter
