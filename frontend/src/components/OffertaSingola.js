import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import _ from "lodash";
import * as actions from "../actions";
import Api from '../Api';
import Store from '../Store';

// Style
import { Button, Typography } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import "../styles/offertaSingola.scss"

class OffertaSingola extends Component {
  state = {
    userHasHeat: false,
    userHasCold: false,
    userId: this.props.user.id,
    offerId: this.props.offer.id
  };

  componentWillMount() {
    const {userId} = this.state
    const {offerId} = this.state

    if(userId){
      Api.hasHeat(offerId, userId, 'heat').then(response => {
        this.setState({userHasHeat: response.data});
      })

      Api.hasHeat(offerId, userId, 'cold').then(response => {
        this.setState({userHasCold: response.data});
      })
    }
  }

  handleHeat = type => {
    const {userId} = this.state
    const {offerId} = this.state

    // console.log('Heat: '+this.state.userHasHeat+', Cold: '+this.state.userHasCold)
    
    if(this.state.userHasHeat && userId && (type=='cold')){
      Api.deleteHeat(offerId, userId, 'heat').then(() =>{
        this.setState({userHasHeat: false, userHasCold: true});
        Api.addHeat(offerId, userId, type)
      })
    } else if (this.state.userHasCold && userId && (type=='heat')) {
      Api.deleteHeat(offerId, userId, 'cold').then(() =>{
        this.setState({userHasCold: false, userHasHeat: true});
        Api.addHeat(offerId, userId, type);
      })
    }else if (userId) {
      Api.addHeat(offerId, userId, type)
    }

    // console.log('Heat: '+this.state.userHasHeat+', Cold: '+this.state.userHasHeat)
  }

  render() {
    const { offer } = this.props;

    //Class to algorithmically assign the heat status to the offer
    var hotStatus = classNames({
      'is-hot': offer.heatCount > 100,
      'is-cold': offer.heatCount < -100
    });

    return(
      <div className="bottoni-farlocco">
        <div className="bottoni-container">
          <Button
            className="{classes.floatButton}"
            onClick={() => this.handleHeat('heat')}
          >
            <KeyboardArrowUp />
          </Button>
          <Button
            className="{classes.floatButton}"
            onClick={() => this.handleHeat('cold')}
          >
            <KeyboardArrowDown />
          </Button>
        </div>

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
      </div>
    )

  }
}

export default connect(null, actions)(OffertaSingola);
