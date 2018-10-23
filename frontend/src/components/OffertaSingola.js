import React, { Component } from "react";
import { withRouter } from "react-router";
import classNames from 'classnames/bind';
import HeatHandler from './commons/HeatHandler';
import _ from "lodash";
import * as actions from "../actions";
import Api from '../Api';
import Store from '../Store';

// Style
import { IconButton, Typography } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import "../styles/offertaSingola.scss"

class OffertaSingola extends Component {
  state = {
    userId: this.props.user.id,
    offerId: this.props.offer.id
  };

  render() {
    const { offer } = this.props;

    //Class to algorithmically assign the heat status to the offer
    var hotStatus = classNames({
      'is-hot': offer.heatCount > 100,
      'is-cold': offer.heatCount < -100
    });

    return(
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
              {(offer.originalAmount) ? <p className="originale"> {offer.originalAmount}€</p> : null}
              <p className="scontato"> {offer.discountedAmount}€</p>
            </div>
            <HeatHandler offerId={offer.id} userId={this.state.userId} heatCount={offer.heatCount}/>
          </div>
        </div>
    )
  }
}

export default withRouter(OffertaSingola)
