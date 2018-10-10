import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import _ from "lodash";
import * as actions from "../actions";

import withStyles from '@material-ui/core/styles/withStyles';
import { CssBaseline, Card, CardContent, CardMedia, CardActions, Typography, Button } from '@material-ui/core';
import "../styles/offerPage.scss"

const styles = theme => ({
  paper: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
        padding: theme.spacing.unit * 3,
      },
    }
});

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
        />
        <CardContent>
          <Typography variant="h5" component="h2" href={data.link}>
            {data.title}
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
  withStyles(styles),
  connect(mapStateToProps, actions)
)(OfferPage)
