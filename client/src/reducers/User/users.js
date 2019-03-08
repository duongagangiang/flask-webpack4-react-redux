import {UserTypes} from "./index";
const initialState = [];

const UsersReducer = (state = initialState, action) => {
    switch(action.type) {
        case UserTypes.GET_USERS:
            return action.users;
        default:
            return state;
    }
};

export default UsersReducer;