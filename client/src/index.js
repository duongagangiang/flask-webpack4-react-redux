import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import myReducer from './reducers/index';
import thunk from 'redux-thunk';

const store = createStore(
    myReducer,
    applyMiddleware(thunk)
);
const root = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <App {...(root.dataset)}/>
    </Provider>, root
);