import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import {Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import "../styles/offers.scss"

class OfferPage extends Component {

  componentWillMount() {
    console.log(this.props.match.params.offerId)
  }

  render() {


    return (
    <div></div>

    );

  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(OfferPage);
