import React, {Component} from 'react';
import Navigation from './Navigation/Navigation';
import {BrowserRouter as Router} from 'react-router-dom';
import Main from './Main/Main';
import './App.css';
import {connect} from 'react-redux';
import {actGetCurrentUser, getProfile} from "../actions";
import jwt_decode from "jwt-decode";
import VerticalMenu from "./VerticalMenu/VerticalMenu";
import {UserDispatchActions} from "../reducers/User";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
          role: 0
        };
    }
    componentDidMount() {
        if (localStorage.getItem('token')) {
            const token = localStorage.userToken;
            const decoded = jwt_decode(token);
            this.setState({
               role: Number.parseInt(decoded.identity.role),
            });
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
    }

    render() {
        const user = (<div id="main-app"><Navigation/><Main/></div>);
        const admin = (<div id="main-app"><VerticalMenu/></div>)
        return (
            <Router>
                {this.state.role != 1 ? user : admin}
            </Router>
        );
    };
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, null)(App);
