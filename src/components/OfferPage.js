import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import _ from "lodash";
import * as actions from "../actions";

import { Paper, Typography } from '@material-ui/core';
import "../styles/offers.scss"

class OfferPage extends Component {

  componentWillMount() {
    const {offerId} = this.props.match.params;
    this.props.getOfferById(offerId)
  }


  componentDidMount() {

  }

  render() {
    const { data } = this.props;

    return(
          <Paper>
            <Typography variant="'h1'">
              {data.title}
              {data.description}
              {data.discountedAmount}
              {data.originalAmount}
            </Typography>
        </Paper>
    )

  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default compose(
  connect(mapStateToProps, actions)
)(OfferPage)
