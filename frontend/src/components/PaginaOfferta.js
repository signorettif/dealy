import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import HeatHandler from './commons/HeatHandler';
import _ from "lodash";
import Api from '../Api';
import Store from '../Store';

// Style
import { Typography, Drawer, Button, CircularProgress } from '@material-ui/core';
import "../styles/paginaOfferta.scss"

export default class PaginaOfferta extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  componentWillMount() {
    this.setState({open: true})

    const {offerId} = this.props.match.params;

    Api.getOfferById(offerId).then(response => {
      // console.log(response);
      this.setState({ data: response })
      console.log(this.state.data)
    })
  }

  toggleDrawer = () => {
    this.setState({open: !this.state.open},
      () =>  {this.props.history.push('/')}
    );
  };

  render() {
    const { data } = this.state;

    return (
      <Drawer anchor="right" open={this.state.open} onClose={() => this.toggleDrawer()} classes={{paper: 'drawer-container'}}>
      { this.state && this.state.data ? (
          <React.Fragment>
        <div className="top-bar">
          <HeatHandler offerId={data.id} userId={this.state.userId} heatCount={data.heatCount}/>
        </div>

        <div className="central-content">
          <div className="top-content">
            {(data.downloadURL) ?
              <div className="immagine-offerta">
                <div style= {{backgroundImage: 'url(' + data.downloadURL + ')'}} className="img-circle" />
              </div>
            : null}

            <Typography variant="h2" component="h2">
              <a href={data.link} target="_blank">{data.title}</a>
            </Typography>
          </div>

          <Typography className="descrizione">
            {data.description}
          </Typography>
        </div>

        <div className="bottom-content">
          <div className="prezzi">
            <p className="scontato">{data.discountedAmount}€</p>
            {(data.originalAmount) ? <p className="originale"> {data.originalAmount}€</p> : null}
          </div>
          <Button classes={{root:'action-button-primary'}} type="submit">
            {"Scopri l'offerta"}
          </Button>
        </div></React.Fragment>)
        :(
          <div className="central-content">
            <CircularProgress color="primary" />
          </div>
        )}
      </Drawer>
    );
  }
}
