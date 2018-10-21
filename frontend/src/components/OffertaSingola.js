import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import _ from "lodash";
import * as actions from "../actions";
import Api from '../Api';
import Store from '../Store';

// Style
import { Typography } from '@material-ui/core';
import "../styles/offertaSingola.scss"

class OffertaSingola extends Component {
  state = {
    userHasHeat: false,
    userHasCold: false
  };

  componentWillMount() {
    Api.hasHeat(this.props.offer.id, Store.getUser().id, 'heat').then(response => {
      console.log(response.data)
    })
  }

  render() {
    const { offer } = this.props;


    var hotStatus = classNames({
      'is-hot': offer.heatCount > 100,
      'is-cold': offer.heatCount < -100
    });

    return(
      <NavLink to={"/offer/" + offer.id } style={{ textDecoration: 'none', color: 'unset' }}>
        <div className={"carta-offerta " + hotStatus}>
          {(offer.downloadURL) ?
            <div className="immagine-offerta">
              <div style= {{backgroundImage: 'url(' + offer.downloadURL + ')'}} className="img-circle" />
            </div>
          : null}
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
              {(offer.originalAmount) ? <span className="originale"> {offer.originalAmount}€</span> : null}
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
