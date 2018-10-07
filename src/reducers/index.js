// This is to combine multiple reducers for when the application will grow bigger

import { combineReducers } from "redux";

import data from "./dataReducer";
import auth from "./authReducer";

export default combineReducers({
  data,
  auth
});
