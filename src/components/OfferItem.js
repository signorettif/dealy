// This component renders the actual task. It shows what the actual task is and contains a button. When the button is clickd, the task is completed and removed. This component sues the completeToDo action, which is linked through the connect method

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { CardContent, CardActions, Typography, Button, Card } from "@material-ui/core";
import { authRef, provider, offersRef } from "../config/firebase";

class ToDoListItem extends Component {
  //Currently a placeholder
  handleCommentClick = offerToCommentId => {
    const { addComment } = this.props;
    addComment(offerToCommentId);
  };


  //Likes handling
  handleTemperature = (offerId, direction) => {

    const { offer } = this.props;

    var hotArray = offer.hotList;
    var coldArray = offer.coldList;

    if (!hotArray){
      hotArray =[]
    }

    if (!coldArray){
      coldArray =[]
    }

    switch(direction){
      case 'hot':
        hotArray.push(authRef.currentUser.uid);

        if (this.hasCold()){
          coldArray.splice(coldArray.indexOf(authRef.currentUser.uid), 1)
        }
        break;


      case 'cold':
        coldArray.push(authRef.currentUser.uid);

        if (this.hasHot()){
          hotArray.splice(hotArray.indexOf(authRef.currentUser.uid), 1)
        }

        break;
    };

    offersRef.child(offerId).update({
      heatCount: (hotArray.length - coldArray.length),
      hotList: hotArray,
      coldList: coldArray
    })
  };

  hasHot(){
    const { offer } = this.props;
    if (!offer.hotList){
      offer.hotList = []
    };

    return offer.hotList.includes(authRef.currentUser.uid);
  }

  hasCold(){
    const { offer } = this.props;
    if (!offer.coldList){
      offer.coldList = []
    };

    return offer.coldList.includes(authRef.currentUser.uid);
  }

  componentWillMount () {
    const { offer } = this.props;
  }

  componentDidMount () {

  }

  render() {
    const { offerId, offer } = this.props;


    return (
      <Card>
        <CardContent>
          <Typography variant="headline" component="h2">{offer.title}{" "}{offer.description}{" "}</Typography>
              <CardActions>
                <Button
                  onClick={() => this.handleCommentClick(offerId)}
                  variant="outlined" color="secondary"
                >
                  Commenta
                </Button>
                <Button
                  variant="outlined" color="primary"
                  href={"./offer/" + offerId}
                >
                  Scopri
                </Button>
              </CardActions>
        </CardContent>
        <p>{offer.heatCount}</p>

        <Button variant="contained" /*disabled={this.hasCold()}*/  color="primary" type="submit" onClick={() => this.handleTemperature(offerId, "cold")}>
          Decrease
        </Button>
        <Button variant="contained" /*disabled={this.hasHot()}*/  color="primary" type="submit" onClick={() => this.handleTemperature(offerId, "hot")}>
          Increase
        </Button>
      </Card>
    );
  }
}

// The connect method takes two arguments: the function which is taking the data from  store and the the object containing actions.
export default connect(null, actions)(ToDoListItem);
