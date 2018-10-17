import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { compose } from "redux";
import _ from "lodash";
import * as actions from "../actions";

// Style
import { Typography } from '@material-ui/core';
import "../styles/offertaSingola.scss"

class OffertaSingola extends Component {

  render() {
    const { offerId, offer } = this.props;

    return(
      <NavLink to={"/offer/" + offerId } style={{ textDecoration: 'none', color: 'unset' }}>
        <div className="carta-offerta" fullWidth>
            <Typography variant="h4" className="hot-score">{offer.heatCount}</Typography>
            <Typography variant="body2" className="titolo-offerta">
              {offer.title}
            </Typography>
            <div> </div>

        </div>
      </NavLink>
    )

  }
}

export default connect(null, actions)(OffertaSingola);
