import React, { Component } from "react";
import Navigation from "./components/commons/Navigation";
import UserProfile from "./components/UserProfile";
import SignAllPage from "./components/SignAllPage";
import ModalHome from "./components/ModalHome";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./actions";

class App extends Component {

  componentWillMount() {
    this.props.fetchUser();
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navigation />
          <div className="right-panel">
            <Switch>
              <Route exact path="/" component={ModalHome} />
              <Route exact path="/offer/:offerId" component={ModalHome} />
              <Route exact path="/user/:userId" component={UserProfile} />
              <Route exact path="/session/new" component={SignAllPage} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
