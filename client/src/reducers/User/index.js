import RestAPI from '../../utils/restApi';

export const UserTypes = {
    UPDATE_USER: 'User@UPDATE_USER',
    GET_USERS: 'User@GET_USERS'
};

export const UserActions = {
    actUpdateCurrentUser: (user) => ({
        type: UserTypes.UPDATE_USER,
        user
    }),
    actGetUsers: (users) => ({
        type: UserTypes.GET_USERS,
        users
    })
};

export const UserDispatchActions = {
    getUsers: () =>
        dispatch => RestAPI('/get-users')
            .then(res => {
                dispatch(UserActions.actGetUsers(res.data));
            })
}
