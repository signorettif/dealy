import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import {FormControl, InputLabel, Input, InputAdornment, TextField, Button, Grid, Divider} from '@material-ui/core';
import "../styles/insertOffer.scss"

class InsertOffer extends Component {

  state = {
    title: '',
    link:'',
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
      link: this.state.link,
      discountedAmount: this.state.discountedAmount,
      originalAmount: this.state.originalAmount,
      description: this.state.description,
    })

    console.log(this.props)
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
                  startAdornment: <InputAdornment position="end">€</InputAdornment>,
                }}
              />
            <FormControl>
                <InputLabel htmlFor="adornment-amount">Original Price (optional)</InputLabel>
                <Input
                  id="original-amount"
                  value = {this.state.originalAmount}
                  onChange={this.handleChange('originalAmount')}
                  startAdornment={<InputAdornment position="start">€</InputAdornment>}
                  variant="outlined"
                />
              </FormControl>
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
