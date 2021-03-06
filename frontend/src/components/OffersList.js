import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import * as actions from "../actions";
import {PAGINATION_LENGTH} from "../config/globals";

// Components
import OffertaSingola from "./OffertaSingola";
import NuovaOfferta from "./NuovaOfferta";
import LoginAlertDialogue from "./commons/LoginAlertDialogue";
import Sidebar from "./Sidebar";

// Api
import Api from '../Api';
import Store from '../Store';

// Style
import { Button, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import "../styles/offersList.scss"

class OffersList extends Component {
  state = {
    openLoginAlertDialogue: false,
    openNewOffer: false,
    paginatedOffers: [],
    user: Store.getUser()
  };

  // Renders the Offers list
  renderOffers() {
    const Offers = this.state.paginatedOffers
    const user = this.state.user
    const exportOf = Offers.map((value, key) => {
      return(
        <NavLink
          to={{
            pathname: "/offer/"+ value.id,
          }}
        >
          <OffertaSingola offerId={key} offer={value} user={user}/>
        </NavLink>
      )
    });

    return exportOf
  }

  handleOffersUpdate = Offers => {
    this.setState({'paginatedOffers': Offers})
  }

  componentWillMount() {
    const pageNumber = 1;

    Api.getPaginatedOffers(PAGINATION_LENGTH, pageNumber).then(response =>{
      this.handleOffersUpdate(response.data);
    })

    if (this.state.user){
      console.log('User authenticated with username: ' + this.state.user.username)
    }
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
        <main className="impaginatore">
          <Typography variant="h1" className='titolo-data'>
            Offerte
          </Typography>
          <div className="section-heading">
            <Typography variant="h3" className='titolo-data'>
              Oggi
            </Typography>
          </div>

          {this.renderOffers()}
        </main>

        <Button
          onClick={(this.state.user ) ? this.toggleNewOffer : this.toggleLoginAlertDialogue}
          variant="fab"
          color="primary"
          aria-label="Add"
          classes={{root: "aggiungiBottone"}}
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

export default withRouter(OffersList);
