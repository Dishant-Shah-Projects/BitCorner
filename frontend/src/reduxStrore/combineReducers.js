import { combineReducers } from "redux";

import authReducer from "../containers/Firebase/reducer";
import bankReducer from "../containers/User/reducer";
import userInfoReducer from "../containers/User/userInfoReducer";

const data = {
  auth: authReducer,
  bank: bankReducer,
  userInfo: userInfoReducer,
};

const reducers = combineReducers(data);

export default reducers;
