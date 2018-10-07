// In our case we will store list of tasks in the database. We call them “todos”. We will attach listener on this list of tasks and each time the list changes, our application will know there was a change in the data. It will fetch the new data from Firebase database and then displays it. What this means is that we don’t have to tell our application to fetch data again when we create new task or complete one. Our application will know that.

import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
