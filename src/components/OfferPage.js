import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { authRef, provider, offersRef } from "../config/firebase";
import * as actions from "../actions";

import {Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import "../styles/offers.scss"

class OfferPage extends Component {

  componentDidMount() {
    const {offerId} = this.props.match.params;
    const { getOfferById } = this.props;
    console.log(getOfferById(offerId))
  }

  render() {
const {offerId} = this.props.match.params;

    return(
      <h3>{offerId}</h3>
    )

  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(OfferPage)
