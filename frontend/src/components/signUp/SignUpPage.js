import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Typography, Paper, Stepper, Step, StepLabel, Button, Grid, TextField } from '@material-ui/core';

import "../../styles/signUpPage.scss"


const steps = ['Crea utente', 'Dati personali', 'Finito!'];

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      name: '',
      surname: '',
      email: '',
      password: ''
    };
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return(
          <React.Fragment>
            <Typography variant="h5">
              Registrati con la tua email
            </Typography>
            <Grid container spacing={24}>
              <Grid item sm={6}>
                <TextField label="Email" value={this.state.email} onChange={this.handleChange('email')} fullWidth/>
              </ Grid>
              <Grid item sm={6}>
                <TextField label="Password" value={this.state.password} onChange={this.handleChange('password')} fullWidth/>
              </ Grid>
            </ Grid>
          </ React.Fragment>
        )
      case 1:
        return(
          <React.Fragment>
            <Typography variant="h5" >
              Registrati con la tua email
            </Typography>
            <Grid container spacing={24}>
              <Grid item sm={6}>
                <TextField label="Name" value={this.state.name} onChange={this.handleChange('name')} fullWidth/>
              </ Grid>
              <Grid item sm={6}>
                <TextField label="Surname" value={this.state.surname} onChange={this.handleChange('surname')} fullWidth/>
              </ Grid>
            </ Grid>
          </ React.Fragment>
        )

      case 2:
        return(
          <React.Fragment>
            <Typography variant="h5">
              Grazie per esserti registrato.
            </Typography>
            <Typography variant="subtitle1">
              Ora che ti sei iscritto a Dealy, hai a disposizione tutte le funzionalità che la nostra piattaofrma offre. Cosa aspetti? Esplora subito le migliori offerte sul nostro sito web.
            </Typography>
          </React.Fragment>
        )

      default:
        throw new Error('Unknown step');
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { activeStep } = this.state;

    return(
      <React.Fragment>
        <Paper className="paper-container">
          <Typography component="h1" variant="h4" align="center">
            Iscriviti ora
          </Typography>

          <Stepper activeStep={activeStep} className="stepper">
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <React.Fragment>
            {this.getStepContent(activeStep)}
            <div className="bottoni">
              {activeStep !== 0 && (
                <Button onClick={this.handleBack} className="bottone">
                  Indietro
                </Button>
              )}
              <Button
                className="bottone"
                variant="outlined"
                color="primary"
                onClick={this.handleNext}
              >
                {activeStep === steps.length - 1 ? 'Vai alla home' : 'Successivo'}
              </Button>
            </div>
          </React.Fragment>
        </Paper>
      </React.Fragment>
    )
  }
}

export default SignUpPage
