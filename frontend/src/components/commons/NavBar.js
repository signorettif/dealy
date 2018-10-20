import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import _ from "lodash";
import Emoji from "./Emoji"

// Style
import { Typography } from '@material-ui/core';
import "../../styles/navBar.scss"

export default class NavBar extends Component {

  render() {

    return(
      <div className="navigation-bar">
        <div className="navbar-container">
          <Typography variant="h6" color="inherit" className="toolbarTitle">
            <NavLink to="/" style={{ textDecoration: 'none', color: 'unset' }}>Dealy</NavLink>
          </Typography>

            <ul className="desktop-navigation">
            </ul>
        </div>

        <footer className="footer">
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            {"Realizzato con "}<Emoji symbol="❤️"/>{" dal team di Dealy."}<br/>{"Copyright ©2018, tutti i diritti riservati."}
          </Typography>
        </footer>
      </div>
    )

  }
}
