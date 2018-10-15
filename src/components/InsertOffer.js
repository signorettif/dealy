import React, { Component } from "react";
import { connect } from "react-redux";
import ReduxThunk from 'redux-thunk';
import _ from "lodash";
import * as actions from "../actions";
import {Typography, Paper, FormControl, InputLabel, Input, InputAdornment, TextField, Button, Grid, Divider, Chip} from '@material-ui/core';
import { authRef, provider, offersRef, storageRef } from "../config/firebase";
import "../styles/insertOffer.scss"

class InsertOffer extends Component {

  state = {
    title: '',
    link: '',
    originalAmount: '',
    discountedAmount: '',
    description: '',
    voucher:'',
    hotCount: 0,
    coldCount: 0,
    downloadURL: '',



    progress:'0%',
  };

  handleFile =(e) => {
    const imageFile = e.target.files[0]

    this.uploadFile(imageFile, result => {

      if (result.progress) {
        // Handle progress
        this.setState({progress: (result.progress+'%')});
        return;
      }

      if (result.downloadURL) {
        this.setState({downloadURL: result.downloadURL});

        return;
      }

      if (result.error) {
        // Handle error
        console.log(result.error);
      }
    });
  };

  uploadFile = (imageFile, callback) => {
    const fileName = imageFile.name
    const uploadTask = storageRef.child('/offer-images/'+ fileName).put(imageFile)

    uploadTask.on('state_changed', snapshot => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      callback({ progress });
    }, error => {
      callback({ error });
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {;
        callback({ downloadURL });
      });
    });
  }

  componentWillMount() {

  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    console.log(this.state)
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
      time: new Date().toUTCString(),
      hotCount: 1,
      coldCount: 0,
      hotList: [authRef.currentUser.uid],
      downloadURL: this.state.downloadURL
      }).then(function(){
      window.location.href = "./";
    })
  };

  render() {


    return (
      <Paper id="content">
        <Typography component="h1" variant="h5">
          Inserisci una nuova offerta
        </Typography>


        <form onSubmit={this.handleFormSubmit}>
          <Grid container  spacing={24}>
            <Grid item xs={12}>
              <TextField
                required
                id="name"
                label="Offer Title"
                onChange={this.handleChange('title')}
                margin="normal"
                className="full-width"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="name"
                label="Offer Link"
                onChange={this.handleChange('link')}
                margin="normal"
                className="full-width"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
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
                xs
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="discounted-amount"
                variant="outlined"
                className="full-width"
                label="Offer Price"
                value={this.state.discountedAmount}
                onChange={this.handleChange('discountedAmount')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="discounted-amount"
                className="full-width"
                variant="outlined"
                label="Original Price"
                value={this.state.originalAmount}
                onChange={this.handleChange('originalAmount')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="voucher"
                label="Voucher code (optional)"
                onChange={this.handleChange('voucher')}
                margin="normal"
                className="full-width"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} className="formButtons">
              <Button item href="./">
                Annulla
              </Button>
              <Button item variant="outlined" color="primary" type="submit">
                Aggiungi
              </Button>
            </Grid>

              <Grid item justify="center"xs={12}>
              <input
                accept="image/*"
                id="outlined-button-file"
                type="file"
                style={{display: 'none'}}
                onChange={(e)=>this.handleFile(e)}
              />
              <label htmlFor="outlined-button-file">
                <Button variant="outlined" component="span">
                  Upload
                </Button>
              </label>
            </Grid>

          </Grid>
        </form>

          <div className="progress-bar"><span style={{width: this.state.progress}}></span></div>

      </Paper>
    );

  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(InsertOffer);
