import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import _ from "lodash";
import Api from '../../Api';
import Store from '../../Store';

// Style
import { IconButton, Typography } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import "../../styles/heatHandler.scss"

export default class HeatHandler extends Component {
  state = {
    userHasHeat: false,
    userHasCold: false,
    userId: this.props.userId,
    offerId: this.props.offerId,
    heatCount: this.props.heatCount
  };

  handleHeat(e, type) {
    e.preventDefault();

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
    } else if (userId) {
      Api.addHeat(offerId, userId, type)
    }
    // console.log('Heat: '+this.state.userHasHeat+', Cold: '+this.state.userHasHeat)
  }

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

  render() {
    console.log(this.state)
    
    const {userId, offerId} = this.state;

    return (
      <div className='heat-count'>
        <IconButton
          classes={{root: "bottone-like up"}}
          onClick={(e) => this.handleHeat(e, 'cold')}
        >
          <KeyboardArrowDown fontSize="small"/>
        </IconButton >
        {this.state.heatCount}°
        <IconButton
          classes={{root: "bottone-like down"}}
          onClick={(e) => this.handleHeat(e, 'heat')}
        >
          <KeyboardArrowUp fontSize="small"/>
        </IconButton>
      </div>
    );
  }
}
