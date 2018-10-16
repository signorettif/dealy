import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import _ from "lodash";
import * as actions from "../actions";

import { CssBaseline, Card, CardContent, CardMedia, CardActions, Typography, Button } from '@material-ui/core';
import "../styles/offerPage.scss"

class OfferPage extends Component {

  componentWillMount() {
    const {offerId} = this.props.match.params;
    this.props.getOfferById(offerId)
  }

  render() {
    const { data } = this.props;

    return(
      <Card className="">
        <CardMedia
          className="card-img"
          image={data.downloadURL}
        >
          {/*Questo da la dimensione al CardMedia*/}
          <img src={data.downloadURL} style={{visibility: 'hidden'}} />
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="h2">
            <a href={data.link} target="_blank">{data.title}</a>
          </Typography>
          <Typography gutterBottom color="textSecondary">
          {data.discountedAmount} {data.originalAmount} {data.time}
          </Typography>
          <Typography component="p">
            {data.description}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          DECRESCI
        </Button>
        <Button size="small" color="primary">
          CRESCI
        </Button>
      </CardActions>
    </Card>
    )

  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default compose(
  connect(mapStateToProps, actions)
)(OfferPage)
