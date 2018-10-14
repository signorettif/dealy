import React, { Component } from "react";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import _ from "lodash";
import * as actions from "../../actions";
import "../../styles/header.scss"

class Header extends Component {

  componentWillMount() {

  }

  render() {


    return (
      <AppBar position="absolute" color="default" className="top">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Dealy
          </Typography>
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
