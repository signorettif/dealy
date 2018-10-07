import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { authRef, provider, offersRef } from "../config/firebase";
import * as actions from "../actions";
import OfferItem from "./OfferItem";
import {Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import "../styles/offers.scss"

class OfferPage extends Component {

  componentWillMount() {
    const {offerId} = this.props.match.params;
    this.props.getOfferById(offerId)  
  }


  componentDidMount() {    

  }

  render() {
    const {offerId} = this.props.match.params;
    const { data } = this.props;

    return(
      <h3>{offerId} <br />
      {data.description}
      </h3>
    )

  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(OfferPage)
