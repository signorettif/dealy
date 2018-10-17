import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import _ from "lodash";
import * as actions from "../actions";

import { CssBaseline, Card, CardContent, CardMedia, CardActions, Typography, Button } from '@material-ui/core';
import "../styles/offerPage.scss"

class OffertaSingola extends Component {

  componentWillMount() {
  }

  increaseCaldo(offer) {

  }

  render() {
    const { offerId, offer } = this.props;

    return(
      <Card className="">
        <CardMedia
          className="card-img"
          image={offer.downloadURL}
        >
          {/*Questo da la dimensione al CardMedia*/}
          <img src={offer.downloadURL} style={{visibility: 'hidden'}} />
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="h2">
            <a href={offer.link} target="_blank">{offer.title}</a>
          </Typography>
          <Typography gutterBottom color="textSecondary">
          {offer.discountedAmount} {offer.originalAmount} {offer.time}
          </Typography>
          <Typography component="p">
            {offer.description}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          DECRESCI
        </Button>
        <Button onClick={this.increaseCaldo(offer)} size="small" color="primary">
          CRESCI
        </Button>
      </CardActions>
    </Card>
    )

  }
}

export default connect(null, actions)(OffertaSingola);
