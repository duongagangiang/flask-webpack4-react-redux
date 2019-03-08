import * as Types from '../constants/ActionTypes';
const initialState = {};

const currentUser = (state = initialState, action) => {
    switch(action.type) {
        case Types.GET_PROFILE:
            return {...action.token};
        default:
            return {...state};
    }
};

export default currentUser;