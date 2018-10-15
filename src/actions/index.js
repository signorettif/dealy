// This is the entry point for the actions module and contains 3 actions
import { authRef, provider, offersRef } from "../config/firebase";
import { FETCH_OFFERS, FETCH_USER, FETCH_OFFER } from "./types";

// Add new offer
export const addOffer = newOffer => async dispatch => {
  offersRef.push().set(newOffer);
};

// Increase Likes on Posts
export const increaseLikes = offerId => async dispatch => {
  //offersRef.push().set(offerId);
};

// Add comment to the offer
export const addComment = addCommentOfferId => async dispatch => {
  offersRef.child(addCommentOfferId).remove();
};

// Add comment to the offer
export const getOfferById = childId => async dispatch => {
  offersRef.child(childId).on("value", snapshot => {
    dispatch({
      type: FETCH_OFFER,
      payload: snapshot.val()
    });
  });
};

// Listen for changes and if there is any, fetch the data
export const fetchOffers = () => async dispatch => {
  offersRef.on("value", snapshot => {
    dispatch({
      type: FETCH_OFFERS,
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
      this.props.history.push("/")
    })
    .catch(error => {
      console.log(error);
    });
};
