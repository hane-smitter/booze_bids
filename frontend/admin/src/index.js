import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import '@fontsource/roboto';

import reducers from './reducers';
import App from './App';

const initialState = {
  app: {
      products: [],
      bidproducts: [],
      err: [],
      loading: false
  }
};
const store = createStore(reducers, initialState, compose(applyMiddleware(thunk)));

ReactDOM.render(
  (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
