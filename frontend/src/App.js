import React, { Component } from "react";
import Header from "./components/commons/Header";
import Footer from "./components/commons/Footer"
import OffersList from "./components/OffersList";
import UserProfile from "./components/UserProfile";
import SignUpPage from "./components/signUp/SignUpPage";
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
              <Route exact path="/" component={OffersList} />
              <Route path="/page/:pageNumber" component={OffersList} />
              <Route path="/offer/:offerId" component={OfferPage} />
              <Route path="/userProfile/:userId" component={UserProfile} />
              <Route path="/signUp" component={SignUpPage} />
            </div>
            <Footer />
          </React.Fragment>
        </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
