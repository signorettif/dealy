import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import {PAGINATION_LENGTH} from "../config/globals";
import OffertaSingola from "./OffertaSingola";
import NuovaOfferta from "./NuovaOfferta";
import LoginAlertDialogue from "./commons/LoginAlertDialogue";
import Sidebar from "./Sidebar";
import { Button, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Api from '../Api';
import Store from '../Store';

import "../styles/offersList.scss"

class OffersList extends Component {
  state = {
    openLoginAlertDialogue: false,
    openNewOffer: false,
    paginatedOffers: []
  };

  // Renders the Offers list
  renderOffers() {
    const Offers = this.state.paginatedOffers
    const exportOf = Offers.map((value, key) => {
      return(
        <Grid key={key} item sm={12}>
          <OffertaSingola offerId={key} offer={value} />
        </ Grid>
      )
    });

    return exportOf
  }

  handleOffersUpdate = Offers => {
    this.setState({'paginatedOffers': Offers})
  }

  componentWillMount() {
    const pageNumber = (this.props.match.params.pageNumber ? this.props.match.params.pageNumber : 1);

    Api.getPaginatedOffers(PAGINATION_LENGTH, pageNumber).then(response =>{
      this.handleOffersUpdate(response.data);
    })

    const user = {
      'email': 'signorettif@gmail.com',
      'password': 'secret'
    }

    Api.userAuthenticate(user).then(response =>{
      response.data ? Store.setUser(response.data) : Store.setUser(null)
    });
  }

  // Gestisci apri e chiudi della finestra del dialogo del login
  toggleLoginAlertDialogue = () => {
    this.setState({
      openLoginAlertDialogue: !this.state.openLoginAlertDialogue
    });
  }

  // Gestisci apri e chiudi delle nuove offerte
  toggleNewOffer = () => {
    this.setState({
      openNewOffer: !this.state.openNewOffer
    });
  }

  render() {
    return (
      <React.Fragment>
        <main>
          <Grid className="container" container spacing={40}>
            <Grid className="left-side" item md={8} sm={12}>
              <Typography variant="h3">
                Offerte recenti
              </Typography>
              <Typography variant="h6">
                17 ottobre
              </Typography>

              <Typography variant="body2" className="data">
                Oggi
              </Typography>
              <Grid container spacing={24}>
                {this.renderOffers()}
              </Grid>
            </Grid>
            <Grid item md={4} sm={12}>
              <Sidebar></Sidebar>
            </Grid>
          </Grid>
        </main>

        <Button
          onClick={(this.props.authenticated) ? this.toggleNewOffer : this.toggleLoginAlertDialogue}
          variant="fab"
          color="primary"
          aria-label="Add"
          className="aggiungiBottone"
        >
          <AddIcon className="icona-aggiungi" />
        </Button>

        <LoginAlertDialogue
          open={this.state.openLoginAlertDialogue}
          onClose={this.toggleLoginAlertDialogue}
        />

        <NuovaOfferta
          open={this.state.openNewOffer}
          onOpen={this.toggleNewOffer}
          onClose={this.toggleNewOffer}
        />
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
