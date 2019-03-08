import {UserTypes} from "./index";
const initialState = {};

const CurrentUserReducer = (state = initialState, action) => {
    switch(action.type) {
        case UserTypes.UPDATE_USER:
            return action.user;
        default:
            return state;
    }
};

export default CurrentUserReducer;