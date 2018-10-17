import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import {PAGINATION_LENGTH} from "../config/globals";
import OffertaSingola from "./OffertaSingola";
import Sidebar from "./Sidebar";
import {offersRef} from "../config/firebase";
import { Button, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FirebasePaginator from "firebase-paginator";

import "../styles/offersList.scss"

class OffersList extends Component {
  state = {
    openDialogue: false,
    paginatedOffers: []
  };

  //Gets paginated offers with the help of firebase-paginator
  getPaginatedOffers = (pageIndex) => {
    var options = {
      pageSize: PAGINATION_LENGTH,
      finite: true,
      retainLastPage: false
    };

    var paginator = new FirebasePaginator(offersRef, options);
    var pagesEndList = [];
    const {getPaginatedOffers} = this.props


    var handler = function() {
      pagesEndList = paginator.pages;

      var endKey = pagesEndList[(pageIndex)].endKey;

      getPaginatedOffers(endKey, PAGINATION_LENGTH);

      // this.props.fetchLastOffersFromKey();
    };

    // Promise pattern
    paginator.once('value').then(handler);
  };

  // Renders the Offers list
  renderOffers() {
    const { data } = this.props;

    const Offers = _.map(data, (value, key) => {
      console.log(value)
      return(
        <Grid key={key} item sm={12}>
          <OffertaSingola offerId={key} offer={value} />
        </ Grid>
      )
    });

    if (!_.isEmpty(Offers)) {
      return Offers;
    }

    return null;
  }

  handleOpenDialogue = () => {
    this.setState({ openDialogue: true });
  };

  handleCloseDialogue = () => {
    this.setState({ openDialogue: false });
  };

  componentWillMount() {
    // this.props.fetchOffers();
    const pageNumber = (this.props.match.params.pageNumber ? this.props.match.params.pageNumber : 1);
    console.log(pageNumber)
    this.getPaginatedOffers(pageNumber);
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
