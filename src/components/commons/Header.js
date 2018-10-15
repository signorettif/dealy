import React, { Component } from "react";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons'
import _ from "lodash";
import { signIn } from "../../actions";
import "../../styles/header.scss"

class Header extends Component {

  componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
        this.loginButton = <div>
          <IconButton>
            <AccountCircle />
          </IconButton>
        </div>
      } else {
        this.loginButton = <Button color="primary" variant="outlined" onClick={this.props.signIn}>
          Login
        </Button>
      }
  }

  render() {


    return (
      <AppBar position="relative" color="default" className="top">
        <Toolbar>
          <Typography variant="h6" color="inherit" className="toolbarTitle">
            Dealy
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

export default connect(mapStateToProps, {signIn})(Header);
