import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Components
import OffersList from "./OffersList";
import PaginaOfferta from "./PaginaOfferta";

class ModalSwitch extends React.Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );

    return (
      <React.Fragment>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path="/" component={OffersList} />
        </Switch>
        <Route path="/offer/:offerId" component={PaginaOfferta} />
      </React.Fragment>
    )
  }
}

const ModalHome = () => (
  <Router>
    <Route component={ModalSwitch} />
  </Router>
);

export default ModalHome;
