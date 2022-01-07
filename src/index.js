import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {allUsersReducer, chatReducer, userProfileReducer} from "./config/store/reducers";


const reducer = combineReducers({
    userProfileReducer,
    allUsersReducer,
    chatReducer
})

const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

