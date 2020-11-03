import { createStore, combineReducers, applyMiddleware } from "redux";

import auth, { setTokenMiddleware } from "./ducks/auth";

const middlewares = [setTokenMiddleware];

const rootReducer = combineReducers({
  auth
});

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export { store };
