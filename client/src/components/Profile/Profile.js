import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: "",
          displayName: "",
          role: 0
        };
    }

    componentDidMount() {
        const token = localStorage.userToken;
        const decoded = jwt_decode(token);
        this.setState({
           email: decoded.identity.email,
           displayName: decoded.identity.displayName,
           role: Number.parseInt(decoded.identity.role)
        });
    }

    render() {
        return(
            <div className={"container"}>
                <p>{this.state.email}</p>
                <p>{this.state.displayName}</p>
                <p>{this.state.role}</p>
            </div>
        )
    }
}

export default Profile;