import React, { Component } from "react";
import { connect } from "react-redux";
import Api from '../Api';
import _ from "lodash";
import * as actions from "../actions";
import {Typography, Paper, InputAdornment, TextField, Button, Grid, Divider, Chip} from '@material-ui/core';
import { authRef, storageRef } from "../config/firebase";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import "../styles/insertOffer.scss"

class InsertOffer extends Component {

  state = {
    title: '',
    link: '',
    originalAmount: '',
    discountedAmount: '',
    description: '',
    voucher:'',
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
    event.preventDefault();

    const offer = {
      title: this.state.title,
      link: this.state.link,
      discountedAmount: this.state.discountedAmount,
      originalAmount: this.state.originalAmount,
      description: this.state.description,
      voucher: this.state.voucher
    }

    Api.postOffer(offer);


  };

  render() {


    return (
      <Paper id="content">
        <Typography component="h1" variant="h5" className="titoloPagina">
          Inserisci una nuova offerta
        </Typography>

        <form onSubmit={this.handleFormSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                required
                id="name"
                label="Titolo offerta"
                onChange={this.handleChange('title')}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="name"
                label="Link"
                onChange={this.handleChange('link')}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="description"
                label="Descrizione"
                multiline
                rowsMax="10"
                value={this.state.description}
                onChange={this.handleChange('description')}
                fullWidth
                variant="outlined"
                xs
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="discounted-amount"
                variant="outlined"
                fullWidth
                label="Prezzo scontato"
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
                fullWidth
                variant="outlined"
                label="Prezzo originale"
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
                label="Codice sconto (opzionale)"
                onChange={this.handleChange('voucher')}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <input
                accept="image/*"
                id="outlined-button-file"
                type="file"
                style={{display: 'none'}}
                onChange={(e)=>this.handleFile(e)}
              />
              <label htmlFor="outlined-button-file">
                <Button
                  disabled={this.state.progress=="100%"}
                  className="progressButton"
                  fullWidth
                  variant="outlined"
                  component="span"
                >
                  <div className="progress-bar"><span style={{width: this.state.progress}}></span></div>
                  <span className="titoloBottoneImmagine">Aggiungi immagine (opzionale)</span>
                  <CheckCircleIcon
                    className="doneIcon"
                    visibility={(this.state.progress=="100%") ? 'visible' : 'hidden'}
                  />
                </Button>
              </label>
            </Grid>

            <Grid item xs={12} className="formButtons">
              <Button item href="./">
                Annulla
              </Button>
              <Button item variant="outlined" color="primary" type="submit">
                Aggiungi
              </Button>
            </Grid>

          </Grid>
        </form>
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
