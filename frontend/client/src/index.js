import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import '@fontsource/roboto';

import reducers from './reducers';

import App from './App';
const initialState = {
    app: {
        products: [],
        categories: [],
        loading: false,
        err: []
    }
};
const store = createStore(reducers, initialState, compose(applyMiddleware(thunk)));

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('root')
);