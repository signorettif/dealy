import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import OfferItem from "./OfferItem";
import Sidebar from "./Sidebar";
import { Button, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import "../styles/offersList.scss"

class OffersList extends Component {
  state = {
    openDialogue: false,
  };

  // Renders the Offers list
  renderOffers() {
    const { data } = this.props;

    const Offers = _.map(data, (value, key) => {
      return <OfferItem key={key} offerId={key} offer={value} />;
    });

    if (!_.isEmpty(Offers)) {
      return Offers;
    }

    return (
      null
    );
  }

  handleOpenDialogue = () => {
    this.setState({ openDialogue: true });
  };

  handleCloseDialogue = () => {
    this.setState({ openDialogue: false });
  };

  componentWillMount() {
    this.props.fetchOffers();
  }

  render() {
    return (
      <React.Fragment>
        <main>
          <Grid container spacing={16}>
            <Grid item xs={8}>
              {this.renderOffers()}
            </Grid>
            <Grid item xs={4}>
              <Sidebar></Sidebar>
            </Grid>
          </Grid>
        </main>

        <Dialog
          open={this.state.openDialogue}
          onClose={this.handleCloseDialogue}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Solo gli utenti registrati possono aggiungere nuove offerte"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Per aggiungere nuovi offerte, devi prima iscriverti a Dealy. Se sei gia iscritto, accedi al tuo accout per aggiungere nuove offerte.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialogue} color="primary">
              Annulla
            </Button>
            <Button onClick={(event) => {this.props.signIn(); this.handleCloseDialogue()}} color="primary" autoFocus>
              {"Login/Sign up"}
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          onClick={(this.props.authenticated) ? (event) => this.props.history.push('/new-offer') : this.handleOpenDialogue}
          variant="fab"
          color="primary"
          aria-label="Add"
          className="aggiungiBottone"
        >
          <AddIcon />
        </Button>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
    authenticated: state.auth
  };
};

export default connect(mapStateToProps, actions)(OffersList);
