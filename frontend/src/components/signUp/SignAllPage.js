import React, { Component } from "react";
import _ from "lodash";
import { Typography, Button, InputBase, Tabs, Tab } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import "../../styles/signAllPage.scss"
import Api from "../../Api"
import Store from '../../Store';


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
        if (user.email && user.password){
          Api.userAuthenticate(user).then(response =>{
            response.data ? Store.setUser(response.data) : Store.setUser(null);

            //Maybe redirect here?
          })
        }
        break;
      case 1:
        Api.userRegister(user).then(function(){
          //callback function
        })
        break;

      case 2:

    }
  };

  loginButton(){
    switch (this.state.tab) {
      case 0: return('Login');
      case 1: return('Registrati');
      case 2: return('Inviami una password')
    }
  }

  render() {
    return(
      <div className="impaginatore">
        <Typography variant="h1">
          Benvenuto
        </Typography>

        <Tabs
          value={this.state.tab}
          onChange={this.handleTabs}
          classes={{ root: "tabs-container", indicator: "tabs-indicator", scroller:'scroller' }}
        >
          <Tab label="Accedi" classes={{root: 'tab-login', labelContainer: 'label-container'}} disableRipple/>
          <Tab label="Crea nuovo account" classes={{root: 'tab-login', labelContainer: 'label-container'}} disableRipple/>
          <Tab label="Password dimenticata?" classes={{root: 'tab-login', labelContainer: 'label-container'}} disableRipple/>
        </Tabs>
        {/*<SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >*/}
          <form className="form-login" onSubmit={this.handleFormSubmit}>
            <InputBase
              id="outlined-email-input"
              label="Email"
              classes={{root: 'input-login'}}
              type="email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              autoComplete="email"
            />
            {this.state.tab == 1 && <InputBase
              id="outlined-name"
              label="Username"
              classes={{root: 'input-login'}}
              value={this.state.username}
              onChange={this.handleChange('username')}
            />}
            {this.state.tab != 2 && <InputBase
              id="outlined-password-input"
              label="Password"
              classes={{root: 'input-login'}}
              type="password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              autoComplete="current-password"
            />}
            <Button classes={{root:'login-button'}} type="submit">
              {this.loginButton()}
            </Button>
          </form>
        {/*</SwipeableViews>*/}
      </div>
    )
  }
}
