import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import { Typography, Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions, Grid, TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "../styles/userProfile.scss"

class UserProfile extends Component {
  state = {
    expanded: null,
    name: 'John',
    surname: 'Doe',
    email: 'john@doe.com'
  };

  handleOpenPanel = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render(){
    return(
      <div className="impaginatore">
        <Typography variant="h1">
          Account
        </Typography>

        <ExpansionPanel expanded={this.state.expanded === 'panel1'} onChange={this.handleOpenPanel('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="heading">Dati personali</Typography>
            <Typography className="secondary-heading">{this.state.name} {this.state.surname}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={24}>
              <Grid item sm={6}>
                <TextField label="Name" value={this.state.name} onChange={this.handleChange('name')} fullWidth/>
              </ Grid>
              <Grid item sm={6}>
                <TextField label="Surname" value={this.state.surname} onChange={this.handleChange('surname')} fullWidth/>
              </ Grid>
            </ Grid>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button size="small">Cancel</Button>
            <Button size="small" color="primary">
              Save
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>

        <ExpansionPanel expanded={this.state.expanded === 'panel2'} onChange={this.handleOpenPanel('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="heading">Email</Typography>
            <Typography className="secondary-heading">
              {"lorenzosigno@gmail.com"}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField label="Email" value={this.state.email} onChange={this.handleChange('email')} fullWidth/>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button size="small">Cancel</Button>
            <Button size="small" color="primary">
              Save
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    )
  }
}

export default UserProfile;
