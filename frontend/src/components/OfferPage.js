import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import _ from "lodash";
import * as actions from "../actions";
import Api from '../Api';

import { CssBaseline, Card, CardContent, CardMedia, CardActions, Typography, Button } from '@material-ui/core';
import "../styles/offerPage.scss"

class OfferPage extends Component {
  state = {
    data: []
  };

  handleUpdate(elem, val) {
    var obj  = {}
    obj[elem] = val
    this.setState(obj)
    console.log('grandegianni');
  }

  componentWillMount() {
    const {offerId} = this.props.match.params;
    Api.getOfferById(offerId).then(response => {
      // console.log(response);
      this.handleUpdate('data', response)
    })
  }

  render() {
    var { data } = this.state;
    var imageURL = data.downloadURL ? data.downloadURL : ''

    return(
      <Card className="">
        <CardMedia
          className="card-img"
          image={imageURL}
        >
          {/*Questo da la dimensione al CardMedia*/}
          <img src={imageURL} style={{visibility: 'hidden'}} />
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
