import React, { Component } from "react";
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Emoji from "./Emoji"
import _ from "lodash";

import "../../styles/footer.scss"

class LoginAlertDialogue extends Component {

  render(){
    return(
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Ooops.. pare che tu non abbia ancora fatto il login <Emoji symbol="🤭"/></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Solo gli utenti registrati possono aggiungere nuove offerte. Iscriviti a Dealy, oppure, se sei gia iscritto, accedi al tuo account."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Annulla
          </Button>
          <Button onClick={this.props.onClose} color="primary" autoFocus>
            <NavLink to="/session/new" style={{ textDecoration: 'none', color: 'unset' }}>
            {"Login/Resigstrati"}
            </NavLink>
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default LoginAlertDialogue;
