// This component renders the actual task. It shows what the actual task is and contains a button. When the button is clickd, the task is completed and removed. This component sues the completeToDo action, which is linked through the connect method

import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import Emoji from "./commons/Emoji"
import { offersRef } from "../config/firebase";


import "../styles/sidebar.scss"

class Sidebar extends Component {

  constructor () {
    super()
    this.state = {
      sidebarData: []
    }
  }

  msToTime = (duration) => {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    switch(true){
      case (minutes < 60):
        return (minutes + " minuti fa")
        break;
      case (minutes < 120):
        return (hours + " ora fa")
        break;
      default:
        return (hours + " ore fa")
        break;
    }
  }

  getOffers = (date) => {
    offersRef.orderByChild('createdAt').startAt(date)
    .on("value", snapshot => {
      this.setState({'sidebarData': snapshot.val()});
    });
  }

  renderSidebarOffers = () => {
    const { sidebarData } = this.state;
    var orderedArray = [];

    console.log(orderedArray);

    var now = new Date().getTime();

    const SidebarOffers = _.map(sidebarData, (value, key) => {
      var timeDifference = now - value.createdAt;
      return(
        <div className="hot-today">
          <div className="hot-top">
            <span className="left"><i>-</i>{value.heatCount} &deg;<i>+</i></span>
            <span className="right">{this.msToTime(timeDifference)}</span>
          </div>
          <div className="hot-title">
            <img src="/img/offer-placeholder.jpg" />
            <h2>
              <a href={value.link}>{value.title}</a>
            </h2>
          </div>
        </div>
      )
    });

    if (!_.isEmpty(SidebarOffers)) {
      return SidebarOffers;
    }

    return (
      null
    );
  }

  componentWillMount () {
    var yesterday = new Date(new Date().setDate(new Date().getDate()-1)).getTime();
    this.getOffers(yesterday);
  }

  componentDidMount () {

  }

  render() {

    return (
      <div id="sidebar">
        <div className="sidebar-element">
          <h1><Emoji symbol="🔥"/> I più caldi di oggi</h1>
          {this.renderSidebarOffers()}
        </div>

        <div className="sidebar-element adv-spot">
          <span>HEY THERE, I AM AN AD</span>
        </div>

      </div>
    );
  }
}

// The connect method takes two arguments: the function which is taking the sidebarData from  store and the the object containing actions.
export default connect(null, actions)(Sidebar);
