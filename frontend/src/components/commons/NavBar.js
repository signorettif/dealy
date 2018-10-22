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
        this.loginButton =
        <div>
          <IconButton
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={(event) => {this.props.history.push('/user/fef'); this.handleClose()}}>
              <NavLink to="/userProfile/fjf" style={{ textDecoration: 'none', color: 'unset' }}>
                Il mio profilo
              </NavLink>
            </MenuItem>
            <MenuItem onClick={(event) => {this.props.signOut(); this.handleClose()}}>Sign out</MenuItem>
          </Menu>
        </div>
      } else {
        this.loginButton =
        <Button color="primary">
          <NavLink to="/session/new" style={{ textDecoration: 'none', color: 'unset' }}>
            Accedi
          </NavLink>
        </Button>
    }

    return(
      <div className="navigation-bar">

        <Typography className="logo">
          <NavLink to="/" style={{ textDecoration: 'none', color: 'unset' }}>Dealy</NavLink>
        </Typography>


        <div className="sidebar-section">
          <Typography className="section-heading">
            Ordina per
          </Typography>

          <ul>
            <li className="sidebar-item active">Più recenti</li>
            <li className="sidebar-item">Più caldi</li>
            <li className="sidebar-item">Trending</li>
            <li className="sidebar-item">Raccomandati per te</li>
          </ul>
        </div>

        <div className="sidebar-section">
          <Typography variant="h6" className="section-heading">
            Account
          </Typography>

          <ul>
            <li className="sidebar-item"><NavLink to="/session/new" style={{ textDecoration: 'none', color: 'unset' }}>
              Login
            </NavLink></li>
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
