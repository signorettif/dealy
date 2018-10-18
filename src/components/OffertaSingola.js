import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import _ from "lodash";
import * as actions from "../actions";

// Style
import { Typography } from '@material-ui/core';
import "../styles/offertaSingola.scss"

class OffertaSingola extends Component {

  render() {
    const { offerId, offer } = this.props;

    var hotStatus = classNames({
      'isHot': offer.heatCount > 2,
      'isCold': offer.heatCount < 2
    });

    return(
      <NavLink to={"/offer/" + offerId } style={{ textDecoration: 'none', color: 'unset' }}>
        <div className="carta-offerta" fullWidth>
          <div className={"heat-count-circle " + hotStatus}>
            {offer.heatCount}
          </div>
          <Typography variant="body2" className="titolo-offerta">
            {offer.title}
          </Typography>
          <div className="prezzi">
            <span className="originale" visibility={(offer.originalAmount=="") ? "visible" : "hidden"}> {offer.originalAmount} € </span>
            <span className="scontato"> {offer.discountedAmount} € </span>
          </div>

        </div>
      </NavLink>
    )

  }
}

export default connect(null, actions)(OffertaSingola);
