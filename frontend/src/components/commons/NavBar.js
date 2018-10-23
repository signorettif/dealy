import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import _ from "lodash";
import Emoji from "./Emoji"

// Style
import { Typography,MenuItem, Button, IconButton, Menu } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import "../../styles/navBar.scss"

export default class NavBar extends Component {

  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);


    if (true) {
        this.loginMenu =
        <ul>
          <li className="sidebar-item"><NavLink
            to="/user/fjf"
            style={{ textDecoration: 'none', color: 'unset' }}
          >
            Il mio profilo
          </NavLink></li>
          <li className="sidebar-item"><NavLink
            onClick = {(event) => {this.props.signOut()}}
            to="/session/new"
            style={{ textDecoration: 'none', color: 'unset' }}
          >
            Esci
          </NavLink></li>
        </ul>
      } else {
        this.loginMenu =
        <ul>
          <li className="sidebar-item"><NavLink
            to="/session/new"
            style={{ textDecoration: 'none', color: 'unset' }}
          >
            Login
          </NavLink></li>
        </ul>
    }

    return(
      <div className="navigation-bar">

        <Typography className="logo">
          <NavLink to="/" style={{ textDecoration: 'none', color: 'unset' }}>Dealy</NavLink>
        </Typography>


        <div className="sidebar-section">
          <Typography className="section-heading">
            Offerte
          </Typography>

          <ul>
            <li className="sidebar-item active">Più recenti</li>
            <li className="sidebar-item">Più calde</li>
            <li className="sidebar-item">Trending</li>
            <li className="sidebar-item">Raccomandate per te</li>
          </ul>
        </div>

        <div className="sidebar-section">
          <Typography variant="h6" className="section-heading">
            Account
          </Typography>

          <ul>
            {this.loginMenu}
          </ul>
        </div>

        <footer className="footer">
          <Typography align="center" color="textSecondary">
            {"Realizzato con "}<Emoji symbol="❤️"/>{" dal team di Dealy."}<br/>{"Copyright ©2018, tutti i diritti riservati."}
          </Typography>
        </footer>
      </div>
    )

  }
}
