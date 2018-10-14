import React, { Component } from "react";
import Header from "./components/commons/Header"
import OffersList from "./components/OffersList";
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
          <React.Fragment>
            <Header />
            <div className="container">
              <Route exact path="/" component={SignIn} />
              <Route path="/app" component={requireAuth(OffersList)} />
              <Route path="/new-offer" component={InsertOffer} />
              <Route path="/offer/:offerId" component={OfferPage} />
            </div>
          </React.Fragment>
        </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
