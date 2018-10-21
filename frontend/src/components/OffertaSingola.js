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
    const { offer } = this.props;

    var hotStatus = classNames({
      'is-hot': offer.heatCount > 100,
      'is-cold': offer.heatCount < -100
    });

    return(
      <NavLink to={"/offer/" + offer.id } style={{ textDecoration: 'none', color: 'unset' }}>
        <div className={"carta-offerta " + hotStatus}>
          <div className="immagine-offerta">
            <div
              style= {{backgroundImage: 'url(' + offer.downloadURL + ')'}}
              className="img-circle" />
          </div>

          <div className = 'main-content'>
            <Typography className="titolo-offerta">
              {offer.title}
            </Typography>
            <Typography className="luogo-offerta">
              {offer.vendor}
            </Typography>
          </div>

          <div className='right-info'>
            <div className="prezzi">
              <span className="originale"> {offer.originalAmount}€</span>
              <span className="scontato"> {offer.discountedAmount}€</span>
            </div>
            <div className='heat-count'>
              {offer.heatCount}°
            </div>
          </div>
        </div>
      </NavLink>
    )

  }
}

export default connect(null, actions)(OffertaSingola);
