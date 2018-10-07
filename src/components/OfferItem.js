// This component renders the actual task. It shows what the actual task is and contains a button. When the button is clickd, the task is completed and removed. This component sues the completeToDo action, which is linked through the connect method

import React, { Component } from "react";
import { connect } from "react-redux";
import { addComment } from "../actions";
import { CardContent, CardActions, Typography, Button, Card } from "@material-ui/core";

class ToDoListItem extends Component {
  //Currently a placeholder
  handleCommentClick = offerToCommentId => {
    const { addComment } = this.props;
    addComment(offerToCommentId);
  };

  handleViewClick = offerToCommentId => {
    const { addComment } = this.props;
    addComment(offerToCommentId);
  };

  render() {
    const { offerId, offer } = this.props;

    const styles = {
      card: {
        width: 600,
        margin: '10px auto',
      },
      button: {
        margin: 'auto 5px auto auto',
      },
      title: {
        fontSize: 20,
      },
    };


    return (
      <Card  style={styles.card}>
        <CardContent>
          <Typography variant="headline" component="h2" style={styles.title}>{offer.title}{" "}{offer.description}{" "}</Typography>
              <CardActions>
                <Button
                  onClick={() => this.handleCommentClick(offerId)}
                  variant="outlined" color="secondary"
                  style={styles.button}
                >
                  Commenta
                </Button>
                <Button
                  onClick={() => this.handleViewClick(offerId)}
                  variant="outlined" color="primary"
                  style={styles.button}
                >
                  Scopri
                </Button>
              </CardActions>
        </CardContent>
      </Card>
    );
  }
}

// The connect method takes two arguments: the function which is taking the data from  store and the the object containing actions.
export default connect(null, { addComment })(ToDoListItem);
