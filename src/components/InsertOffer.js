import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import {FormControl, InputLabel, Input, InputAdornment, TextField, Button} from '@material-ui/core';
import "../styles/insertOffer.scss"

class InsertOffer extends Component {

  state = {
    title: '',
    originalAmount: '',
    discountedAmount: '',
    description: ''
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

    const {addOffer} = this.props;
    addOffer({
      title: this.state.title,
      discountedAmount: this.state.discountedAmount,
      originalAmount: this.state.originalAmount,
    })

    console.log(this.props)
  };

  render() {

    
    return (
    <form onSubmit={this.handleFormSubmit}>
      <TextField
          id="name"
          label="Offer Title"
          onChange={this.handleChange('title')}
          margin="normal"
          className="full-width"
        />
        <TextField
          id="description"
          label="Description"
          multiline
          rowsMax="10"
          value={this.state.description}
          onChange={this.handleChange('description')}
          margin="normal"
          className="full-width"
        />
       <FormControl fullWidth>
          <InputLabel htmlFor="adornment-amount">Original Amount</InputLabel>
          <Input
            id="discounted-amount"
            value = {this.state.discountedAmount}
            onChange={this.handleChange('discountedAmount')}
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
          />
        </FormControl>
      <FormControl fullWidth>
          <InputLabel htmlFor="adornment-amount">Original Amount</InputLabel>
          <Input
            id="original-amount"
            value = {this.state.originalAmount}
            onChange={this.handleChange('originalAmount')}
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
        Save
      </Button>
    </form>
    );

  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(InsertOffer);
