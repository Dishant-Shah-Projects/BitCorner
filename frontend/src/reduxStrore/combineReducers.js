import { combineReducers } from "redux";

import authReducer from "../containers/Firebase/reducer";
import bankReducer from "../containers/User/reducer";

const data = {
  auth: authReducer,
  bank: bankReducer
};

const reducers = combineReducers(data);

export default reducers;
