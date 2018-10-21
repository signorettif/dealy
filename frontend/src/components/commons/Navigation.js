import React, { Component } from "react";
import _ from "lodash";
import Header from './Header';
import NavBar from './NavBar';

export default class Navigation extends Component {

  resize = () => this.forceUpdate()

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  render() {
     let width = window.innerWidth;
     if (width > 1024) {
       return (
         <NavBar />
       );
     } else {
       return (
         <Header />
       );
     }
  }
}
