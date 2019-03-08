import {combineReducers} from 'redux';
import CurrentUserReducer from './User/actions';
import profile from '../reducers/profile';
import UsersReducer from "./User/users";

const myReducer = combineReducers({
    currentUser: CurrentUserReducer,
    profile,
    users: UsersReducer
});

export default myReducer;