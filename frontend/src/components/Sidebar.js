// This component renders the actual task. It shows what the actual task is and contains a button. When the button is clickd, the task is completed and removed. This component sues the completeToDo action, which is linked through the connect method

import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import Emoji from "./commons/Emoji"
import { offersRef } from "../config/firebase";
import Api from "../Api";


import "../styles/sidebar.scss"

class Sidebar extends Component {

  constructor () {
    super()
    this.state = {
      sidebarData: []
    }
  }

  handleUpdate(elem, val) {
    var obj  = {}
    obj[elem] = val
    this.setState(obj)
  }

  renderSidebarOffers = () => {
    const { sidebarData } = this.state;

    var now = new Date().getTime();

    //Sorts array from highest to lowest heatCount (hence the -)
    const SidebarOffers = sidebarData.map((value, key) => {

      var timeDifference = now - value.createdAt;

      return(
        <div className="hot-today" key={value.key}>
          <div className="hot-top">
            <span className="left"><i>-</i>{value.heatCount} &deg;<i>+</i></span>
            <span className="right">{value.created_at}</span>
          </div>
          <div className="hot-title">
            <img src="/img/offer-placeholder.jpg" />
            <h2>
              <a href={"./offer/" + value.id}>{value.title}</a>
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
    Api.getLastDayOffers('heatCount').then(response => {
      this.handleUpdate('sidebarData', response)
    })
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
