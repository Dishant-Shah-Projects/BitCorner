import { combineReducers } from "redux";

import AuthReducer from "../containers/Firebase/reducer";

const data = {
  auth: AuthReducer,
};

const reducers = combineReducers(data);

export default reducers;
