// This is the entry point for the actions module and contains 3 actions

import { todosRef, authRef, provider } from "../config/firebase";
import { FETCH_TODOS, FETCH_USER } from "./types";

// Add new task to the list of tasks
export const addToDo = newToDo => async dispatch => {
  todosRef.push().set(newToDo);
};

// Remove task
export const completeToDo = completeToDoId => async dispatch => {
  todosRef.child(completeToDoId).remove();
};

// Listen for changes and if there is any, fetch the data
export const fetchToDos = () => async dispatch => {
  todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};


export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

// These finctions (signIn and signOut) just change the state of the user. When the state chages, fetchUser gets notified and updates the redux store

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};
