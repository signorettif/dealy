//Imports the actions from the actions module
import { FETCH_OFFERS, FETCH_OFFER } from "../actions/types";

// This is a simple function with two arguments: an initial state and an action. All actions triggered from components go through ALL the reducer. Each reducers checks the action type and if it is the trype reducer knows, it updates the data in the store
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_OFFERS:
      return action.payload;
      case FETCH_OFFER:
      return action.payload;
    default:
      return state;
  }
};
