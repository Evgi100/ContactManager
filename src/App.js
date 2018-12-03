import React, { Component } from "react";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Contacts from "./components/Contacts";
import Header from "./components/Header";
import About from "./components/About";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

import NotFound from "./components/NotFound";

import { Provider } from "./context";

import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="app">
            {" "}
            <Header branding="Contact manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
