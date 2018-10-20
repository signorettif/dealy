import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Typography, Button, TextField, Tabs, Tab } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import "../../styles/signAllPage.scss"
import Api from "../../Api"


const steps = ['Crea utente', 'Dati personali', 'Finito!'];

export default class SignAllPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      email: '',
      password: '',
      username: ''
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleTabs = (event, tab) => {
    this.setState({ tab });
  };

  /*handleChangeIndex = index => {
    this.setState({ value: index });
  };*/

  handleFormSubmit = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    }

    switch (this.state.tab) {
      case 0:

      case 1:
        Api.userRegister(user).then(function(){
          //callback function
        })
        break;

      case 2:
      
    }
  };

  render() {
    return(
      <div className="impaginatore">
        <Typography variant="h1">
          Benvenuto
        </Typography>

        <Tabs
            value={this.state.tab}
            onChange={this.handleTabs}
            classes={{ root: "tabs-container", indicator: "tabs-indicator" }}
          >
            <Tab label="Accedi" className={{ root: 'tab-login', selected: 'selected' }} disableRipple/>
            <Tab label="Registrati" className={{ root: 'tab-login', selected: 'selected' }} disableRipple/>
            <Tab label="Password dimenticata?" className={{ root: 'tab-login', selected: 'selected' }} disableRipple/>
          </Tabs>
        {/*<SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >*/}
          <form className="form-login" onSubmit={this.handleFormSubmit}>
            <TextField
              id="outlined-email-input"
              label="Email"
              className="input-login"
              type="email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              autoComplete="email"
              variant="outlined"
            />
            {this.state.tab == 1 && <TextField
              id="outlined-name"
              label="Username"
              className="input-login"
              value={this.state.username}
              onChange={this.handleChange('username')}
              variant="outlined"
            />}
            {this.state.tab != 2 && <TextField
              id="outlined-password-input"
              label="Password"
              className="input-login"
              type="password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              autoComplete="current-password"
              variant="outlined"
            />}
            <Button item variant="outlined" color="primary" type="submit">
              Invia
            </Button>
          </form>
        {/*</SwipeableViews>*/}
      </div>
    )
  }
}
