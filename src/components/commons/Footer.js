import React, { Component } from "react";
import { Typography } from '@material-ui/core';
import Emoji from "./Emoji"
import _ from "lodash";

import "../../styles/footer.scss"

class Footer extends Component {

  render(){
    return(
      <footer>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          {"Realizzato con "}<Emoji symbol="❤️"/>{" dal team di Dealy. Copiright 2018, tutti i diritti riservati."}
        </Typography>
      </footer>
    )
  }
}

export default Footer;
