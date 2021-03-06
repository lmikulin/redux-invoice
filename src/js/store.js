import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import reducer from "./reducers/item-reducer";

const middleware = applyMiddleware(logger());

export default createStore(reducer, middleware);
