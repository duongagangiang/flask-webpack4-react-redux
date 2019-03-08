import React, {Component} from 'react';

class Post extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        arr: [
            {
                "id": 123456,
                "name": "example",
                "fullName": "example.com"
            },
            {
                "id": 123457,
                "name": "abc",
                "fullName": "abc.example.com"
            },
            {
                "id": 123654,
                "name": "japan",
                "fullName": "japan.gateway.com"
            },
            {
                "id": 125463,
                "name": "gateway",
                "fullName": "gateway.com"
            },
            {
                "id": 123652,
                "name": "singapore",
                "fullName": "singapore.vn"
            }
        ]
    }

    render() {
        const {arr} = this.state;
        return (
            <div>
                <ul>
                    {arr.map((item, i) => {
                        return (
                            <li key={i}>
                                <span className={"text-info"}>{item.fullName}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default Post;