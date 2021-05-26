import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducers from "./combineReducers";

let middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== "production") {
const logger = createLogger();
middlewares = [...middlewares, logger];
}

const store = createStore(reducers, applyMiddleware(...middlewares));
export default store;
