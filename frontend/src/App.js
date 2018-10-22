import React, { Component } from "react";
import Navigation from "./components/commons/Navigation";
import OffersList from "./components/OffersList";
import UserProfile from "./components/UserProfile";
import SignAllPage from "./components/SignAllPage";
import PaginaOfferta from "./components/PaginaOfferta";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./actions";

class App extends Component {

  componentWillMount() {
    this.props.fetchUser();
  };

  render(){
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navigation />
          <div className="right-panel">
          <Switch>
            <Route exact path="/" component={OffersList} />
            <Route path="/offer/:offerId" component={PaginaOfferta} />
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
