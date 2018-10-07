import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import {Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import "../styles/offers.scss"

class HomePage extends Component {

  componentWillMount() {
    
  }

  render() {

    
    return (
    <div>
      <span>Homepage</span>

      <Card className="offer">
        <div>
          <CardContent>
            <Typography component="h2" variant="headline">
              Live From Space
            </Typography>
            <Typography variant="subheading" color="textSecondary">
              Mac Miller
            </Typography>

            <div>
              <span>Prezzo attuale: 5 euros</span>
              <span>Prezzo iniziale: 10 euros</span>
              <span>Discount: 50%</span>
            </div>
          </CardContent>
          <div>
          </div>
        </div>
        <CardMedia
          image="https://material-ui.com/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
          className = "offerImage"
        />
      </Card>
    </div>
    );

  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(HomePage);
