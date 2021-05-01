import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from "redux";
import {createLogger} from 'redux-logger';
import reducers from "./combineReducers";

const logger = createLogger()
const store = createStore(reducers, applyMiddleware(logger, thunkMiddleware));

export default store;
