import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import {compose} from 'redux';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons'
import _ from "lodash";
import { signIn, signOut } from "../../actions";

import "../../styles/header.scss"

class Header extends Component {

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

    if (this.props.authenticated) {
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


    return (
      <AppBar position="relative" color="default" className="top">
        <Toolbar>
          <Typography variant="h6" color="inherit" className="toolbarTitle">
            <NavLink to="/" style={{ textDecoration: 'none', color: 'unset' }}>Dealy</NavLink>
          </Typography>
          {/* <Button>Più caldi</Button>
          <Button>Nuovi</Button>*/}
          { this.loginButton }
        </Toolbar>
      </AppBar>
    );

  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth };
}

export default connect(mapStateToProps, {signIn, signOut})(Header);
