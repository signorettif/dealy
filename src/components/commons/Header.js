import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../../actions";
import "../../styles/header.scss"

class Header extends Component {

  componentWillMount() {

  }

  render() {


    return (
    <div>
     Header here
    </div>
    );

  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(Header);
