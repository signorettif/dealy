// This component renders the actual task. It shows what the actual task is and contains a button. When the button is clickd, the task is completed and removed. This component sues the completeToDo action, which is linked through the connect method

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Emoji from "./commons/Emoji"

import "../styles/sidebar.scss"

class Sidebar extends Component {

  componentWillMount () {
  }

  componentDidMount () {

  }

  render() {

    return (
      <div id="sidebar">
        <div className="sidebar-element">
          <h1><Emoji symbol="🔥"/> I più caldi di oggi</h1>
          <div className="hot-today">
            <div className="hot-top">
              <span className="left"><i>-</i>100 &deg;<i>+</i></span>
              <span className="right">12 ore fa</span>
            </div>
            <div className="hot-title">
              <img src="/img/offer-placeholder.jpg" />
              <h2>
                Some awesome title goes here
              </h2>
            </div>
            <div className="bottom">qui ci vanno i bottoni</div>
          </div>

          <div className="hot-today">
            <div className="hot-top">
              <span className="left"><i>-</i>100 &deg;<i>+</i></span>
              <span className="right">12 ore fa</span>
            </div>
            <div className="hot-title">
              <img src="/img/offer-placeholder.jpg" />
              <h2>
                Some awesome title goes here
              </h2>
            </div>
            <div className="bottom">qui ci vanno i bottoni</div>
          </div>

          <div className="hot-today">
            <div className="hot-top">
              <span className="left"><i>-</i>100 &deg;<i>+</i></span>
              <span className="right">12 ore fa</span>
            </div>
            <div className="hot-title">
              <img src="/img/offer-placeholder.jpg" />
              <h2>
                Some awesome title goes here
              </h2>
            </div>
            <div className="bottom">qui ci vanno i bottoni</div>
          </div>
        </div>

        <div className="sidebar-element adv-spot">
          hey there
        </div>

      </div>
    );
  }
}

// The connect method takes two arguments: the function which is taking the data from  store and the the object containing actions.
export default connect(null, actions)(Sidebar);
