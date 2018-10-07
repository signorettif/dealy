import React, { Component } from "react";
import OffersList from "./components/OffersList";
import HomePage from "./components/HomePage";
import InsertOffer from "./components/InsertOffer";
import SignIn from "./components/SignIn";
import requireAuth from "./components/auth/requireAuth";
import OfferPage from "./components/OfferPage";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./actions";

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={SignIn} />
          <Route path="/app" component={requireAuth(OffersList)} />
          <Route path="/home" component={HomePage} />
          <Route path="/new-offer" component={InsertOffer} />
          <Route path="/offer/:offerId" component={OfferPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
