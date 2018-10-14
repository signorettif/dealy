import React, { Component } from "react";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import _ from "lodash";
import * as actions from "../../actions";
import "../../styles/header.scss"

class Header extends Component {

  componentWillMount() {

  }

  render() {


    return (
      <AppBar position="relative" color="default" className="top">
        <Toolbar>
          <Typography variant="h6" color="inherit" className="toolbarTitle">
            Dealy
          </Typography>
          <Button>Più caldi</Button>
          <Button>Nuovi</Button>
          <Button color="primary" variant="outlined">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    );

  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(Header);
