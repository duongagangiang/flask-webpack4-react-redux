import * as Types from '../constants/ActionTypes';
import restApi from "../utils/restApi";

export const actGetCurrentUser = (currentUser) => {
    return {
        type: Types.LOGIN,
        currentUser
    };
};

export const abortFetch = () => ({
   type: Types.ABORT_FETCH
});
/**
 *
 * @param error : the error thrown
 * @returns {{}}
 */
export const errorFetch = (error) => ({
    type: Types.ERROR_FETCH
});

export const startFetch = () => ({
   type: Types.START_FETCH
});
/**
 *
 * @param payload : the data returned from the fetch
 * @returns {{payload: *, type: string}}
 */
export const updateFetch = (payload) => ({
    type: Types.UPDATE_FETCH,
    payload
});

export const login = (user) => {
    return restApi('login', "POST", user)
           .then(res => {
                localStorage.setItem("userToken", res.data.token);
                return res.data
           })
           .catch(err => {
               console.log(err);
           })
};


export const getProfile = () => ({
    type: Types.GET_PROFILE
});