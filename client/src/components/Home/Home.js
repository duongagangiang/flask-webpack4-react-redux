import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UserDispatchActions} from "../../reducers/User";
import PropTypes from 'prop-types';
import './Home.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.props.getUsers();
    }

    static propTypes = {
        getUsers: PropTypes.func,
        users: PropTypes.array
    }

    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th class="col-xs-3">#</th>
                        <th class="col-xs-6">Email</th>
                        <th class="col-xs-3">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.users && this.props.users.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td class="col-xs-3">{user.id}</td>
                                <td class="col-xs-6">{user.email}</td>
                                <td class="col-xs-3">{user.display_name}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        currentUser: state.currentUser,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () =>
            dispatch(UserDispatchActions.getUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);