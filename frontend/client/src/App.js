import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Home from "./components/Home";
import Form from './components/Form/Form';
import Faqs from './components/Faqs';
import PastBids from './components/PastBids';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/faqs" component={Faqs} />
        <Route path="/pastbids" component={PastBids} />
        <Route path="/product/create" component={Form} />
      </Switch>
    </Router>
  );
};

export default App;
