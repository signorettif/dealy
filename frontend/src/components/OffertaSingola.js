import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
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
    userHasHeat: false,
    userHasCold: false,
    userId: ((this.props.user) ? this.props.user.id : null),
    offerId: this.props.offer.id,
    heat: this.props.offer.heatCount
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

  handleHeat(e, type) {

    e.preventDefault();

    const {userId} = this.state
    const {offerId} = this.state
    const {heat} = this.state

    // console.log('Heat: '+this.state.userHasHeat+', Cold: '+this.state.userHasCold)

    if(this.state.userHasHeat && userId && (type=='cold')){
      Api.deleteHeat(offerId, userId, 'heat').then(() =>{
        Api.addHeat(offerId, userId, type).then(response => {
          this.setState({userHasHeat: false, userHasCold: true, heat: response.data});
        }) 
      })
    } else if (this.state.userHasCold && userId && (type=='heat')) {
      Api.deleteHeat(offerId, userId, 'cold').then(() =>{
        Api.addHeat(offerId, userId, type).then(response => {
          this.setState({userHasHeat: true, userHasCold: false, heat: response.data});
        }) 
      })
    }else if (userId) {
      const isHot = (type=='heat') ? true : false;

      Api.addHeat(offerId, userId, type).then(response => {
        this.setState({userHasHeat: isHot, userHasCold: !isHot, heat: response.data});
      }) 
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
              {(offer.originalAmount) ? <p className="originale"> {offer.originalAmount}€</p> : null}
              <p className="scontato"> {offer.discountedAmount}€</p>
            </div>
            <div className='heat-count'>
              <IconButton
                classes={{root: "bottone-like up"}}
                onClick={(e) => this.handleHeat(e, 'cold')}
              >
                <KeyboardArrowDown fontSize="small"/>
              </IconButton >
              {this.state.heat}°
              <IconButton
                classes={{root: "bottone-like down"}}
                onClick={(e) => this.handleHeat(e, 'heat')}
              >
                <KeyboardArrowUp fontSize="small"/>
              </IconButton>
            </div>
          </div>
        </div>
      </NavLink>
    )

  }
}

export default connect(null, actions)(OffertaSingola);
