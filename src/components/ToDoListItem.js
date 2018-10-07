// This component renders the actual task. It shows what the actual task is and contains a button. When the button is clickd, the task is completed and removed. This component sues the completeToDo action, which is linked through the connect method

import React, { Component } from "react";
import { connect } from "react-redux";
import { completeToDo } from "../actions";

class ToDoListItem extends Component {
  handleCompleteClick = completeToDoId => {
    const { completeToDo } = this.props;
    completeToDo(completeToDoId);
  };

  render() {
    const { todoId, todo } = this.props;
    return (
      <div key="toDoName" className="col s10 offset-s1 to-do-list-item teal">
        <h4>
          {todo.title}{" "}
          <span
            onClick={() => this.handleCompleteClick(todoId)}
            className="complete-todo-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn"
          >
            <i className="large material-icons">done</i>
          </span>
        </h4>
      </div>
    );
  }
}

// The connect method takes two arguments: the function which is taking the data from  store and the the object containing actions.
export default connect(null, { completeToDo })(ToDoListItem);
