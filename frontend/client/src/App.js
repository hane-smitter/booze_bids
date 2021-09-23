import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

import Home from "./components/Home";
import Form from './components/Form/Form';
import Faqs from './components/Faqs';
import PastBids from './components/PastBids';
import Detail from './components/Products/Product/Details';

const easyBg = createTheme({
  palette: {
    background: {
      default: "rgb(2520, 250, 250)"
    }
  }
})

const App = () => {
  return (
    <MuiThemeProvider theme={easyBg}>
      <CssBaseline />
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/faqs" component={Faqs} />
        <Route path="/pastbids" component={PastBids} />
        <Route path="/product/create" component={Form} />
        <Route path="/detail" component={Detail} />
      </Switch>
    </Router>
    </MuiThemeProvider>
  );
};

export default App;
