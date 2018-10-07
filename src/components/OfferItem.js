// This component renders the actual task. It shows what the actual task is and contains a button. When the button is clickd, the task is completed and removed. This component sues the completeToDo action, which is linked through the connect method

import React, { Component } from "react";
import { connect } from "react-redux";
import { completeToDo } from "../actions";
import { CardContent, CardActions, Typography, Button, Card } from "@material-ui/core";

class ToDoListItem extends Component {
  handleCompleteClick = completeToDoId => {
    const { completeToDo } = this.props;
    completeToDo(completeToDoId);
  };

  render() {
    const { todoId, todo } = this.props;

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
          <Typography variant="headline" component="h2" style={styles.title}>{todo.title}{" "}</Typography>
              <CardActions>
                <Button 
                  onClick={() => this.handleCompleteClick(todoId)}
                  variant="outlined" color="primary"
                  style={styles.button}
                >
                  done
                </Button>
              </CardActions>
        </CardContent>
      </Card>
    );
  }
}

// The connect method takes two arguments: the function which is taking the data from  store and the the object containing actions.
export default connect(null, { completeToDo })(ToDoListItem);
