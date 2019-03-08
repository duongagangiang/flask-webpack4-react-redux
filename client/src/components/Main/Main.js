import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Auth/Login';
import Register from '../Register/Register';
import './Main.css';
import Profile from "../Profile/Profile";
import Post from "../Post/Post";

export default class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}></Route>
                <div className={"container"}>
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/register" component={Register}></Route>
                    <Route exact path="/profile" component={Profile}></Route>
                    <Route exact path="/post" component={Post}></Route>
                </div>
            </div>
        );
    }
} 