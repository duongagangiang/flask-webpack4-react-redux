import React, {Component} from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {login} from "../../actions";
import {UserActions} from "../../reducers/User";
import jwt_decode from "jwt-decode";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.setUserLogin = this.setUserLogin.bind(this);
    }

    static propTypes = {
        updateCurrentUser: PropTypes.func
    }

    handleEmail(e) {
        this.setState({email: e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    }

    setUserLogin(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        return login(user)
               .then(res => {
                   if(!res.error) {
                       this.props.history.push("/");
                       const token = res.token;
                       const decoded = jwt_decode(token);
                       const currentUser = {
                           email: decoded.identity.email,
                           displayName: decoded.identity.displayName,
                           role: Number.parseInt(decoded.identity.role)
                       };
                       this.props.updateCurrentUser(currentUser);
                   }
               });
    }

    render() {
        return (
            <div className={"container"}>
                <form id="form-login" onSubmit={this.setUserLogin}>
                    <div class="form-group" method="post">
                        <label for="inputUsername">Username</label>
                        <input type="email"
                               className="form-control" 
                               id="inputEmail"
                               aria-describedby="emailHelp"
                               name="email"
                               placeholder="Enter email"
                               value={this.state.email}
                               onChange={this.handleEmail}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your infomation with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="inputPassword">Password</label>
                        <input type="password" 
                               className="form-control" 
                               id="inputPassword"
                               name="password"
                               placeholder="Password"
                               value={this.state.password}
                               onChange={this.handlePassword}/>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-submit">Submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentUser: (currentUser) =>
            dispatch(UserActions.actUpdateCurrentUser(currentUser))
    }

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));