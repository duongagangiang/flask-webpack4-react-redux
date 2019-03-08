import axios from 'axios';

export default function restApi(endPoint, method = "GET", body=null) {
    return axios({
        method: method,
        url: endPoint,
        data: body
    }).catch(error => console.log(error));
}
