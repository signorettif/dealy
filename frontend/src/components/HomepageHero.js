// This component renders the actual task. It shows what the actual task is and contains a button. When the button is clickd, the task is completed and removed. This component sues the completeToDo action, which is linked through the connect method

import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import Emoji from "./commons/Emoji"
import { offersRef } from "../config/firebase";

import "../styles/homepageHero.scss"

class HomepageHero extends Component {

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
export default HomepageHero;
