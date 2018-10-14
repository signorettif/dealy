import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import OfferItem from "./OfferItem";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class OffersList extends Component {
  state = {

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


  componentWillMount() {
    this.props.fetchOffers();
  }

  render() {
    return (
      <React.Fragment>
        <main>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              {this.renderOffers()}
            </Grid>
            <Grid item xs={12}>
              <Button
                href="./new-offer"
                className="btn-floating btn-large teal darken-4"
              >
                <span>Add new offer</span>
              </Button>
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(OffersList);
