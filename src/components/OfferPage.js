import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import _ from "lodash";
import * as actions from "../actions";

import withStyles from '@material-ui/core/styles/withStyles';
import { CssBaseline, Paper, Typography, List, ListItemText, ListItem } from '@material-ui/core';
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
      <React.Fragment>
          <CssBaseline />
          <Paper>
            <Typography variant="h4" align="center">
              {data.title}
            </Typography>
            <List disablePadding>
              <ListItem>
                <ListItemText primary={data.description} />
                <ListItemText primary={data.discountedAmount} secondary={data.originalAmount}/>
              </ListItem>
            </List>
        </Paper>
      </React.Fragment>
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
