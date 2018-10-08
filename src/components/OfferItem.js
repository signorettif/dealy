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

  increaseLike = offerId => {
    //const { increaseLike } = this.props;
    //increaseLike(offerId);

    const { offer } = this.props;
    offersRef.child(offerId).update({ 
      likesCount: (offer.likesCount + 1)
    })
  };

  componentDidMount () {
    console.log(this.props)
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
        <p>{offer.likesCount}</p>
        <Button variant="contained" color="primary" type="submit" onClick={() => this.increaseLike(offerId)}>
          Increase
        </Button>
      </Card>
    );
  }
}

// The connect method takes two arguments: the function which is taking the data from  store and the the object containing actions.
export default connect(null, actions)(ToDoListItem);
