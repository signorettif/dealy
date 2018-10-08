import React, { Component } from "react";
import { connect } from "react-redux";
import ReduxThunk from 'redux-thunk';
import _ from "lodash";
import * as actions from "../actions";
import {FormControl, InputLabel, Input, InputAdornment, TextField, Button, Grid, Divider, Chip} from '@material-ui/core';
import "../styles/insertOffer.scss"

class InsertOffer extends Component {

  state = {
    title: '',
    link:'',
    originalAmount: '',
    discountedAmount: '',
    description: '',
    voucher:'',
    hotCount: 0,
    coldCount: 0,
  };

  componentWillMount() {

  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleFormSubmit = event => {
    // const { addFormValue } = this.state;
    // const { addToDo } = this.props;
    event.preventDefault();
    // addToDo({ title: addFormValue });
    // this.setState({ addFormValue: "" });

    // Aggiungere a questa finzione la data di aggiunta
    const {addOffer} = this.props;
      addOffer({
      title: this.state.title,
      link: this.state.link,
      discountedAmount: this.state.discountedAmount,
      originalAmount: this.state.originalAmount,
      description: this.state.description,
      voucher: this.state.voucher,
      hotCount: this.state.hotCount,
      coldCount: this.state.coldCount,
      }).then(function(){
      window.location.href = "./";
    })
  };

  render() {


    return (
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <form onSubmit={this.handleFormSubmit} xs={6}>
            <TextField
              required
                id="name"
                label="Offer Title"
                onChange={this.handleChange('title')}
                margin="normal"
                className="full-width"
                variant="outlined"
              />

              <TextField
                id="name"
                label="Offer Link"
                onChange={this.handleChange('link')}
                margin="normal"
                className="full-width"
                variant="outlined"
              />

              <Divider />


              <TextField
                id="description"
                label="Description"
                multiline
                rowsMax="10"
                value={this.state.description}
                onChange={this.handleChange('description')}
                margin="normal"
                className="full-width"
                variant="outlined"
              />
              <TextField
                id="discounted-amount"
                variant="outlined"
                label="Offer Price"
                value={this.state.discountedAmount}
                onChange={this.handleChange('discountedAmount')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
              />
              <TextField
                id="discounted-amount"
                variant="outlined"
                label="Original Price"
                value={this.state.originalAmount}
                onChange={this.handleChange('originalAmount')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
              />

              <Divider />

              <TextField
                id="voucher"
                label="Voucher code (optional)"
                onChange={this.handleChange('voucher')}
                margin="normal"
                className="full-width"
                variant="outlined"
              />

            <Divider />


            <Button variant="contained" href="./">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </form>
        </Grid>

        <Grid item xs={6}>

        </Grid>

        <Grid item xs={12}>

        </Grid>

      </Grid>
    );

  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(InsertOffer);
