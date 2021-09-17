import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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