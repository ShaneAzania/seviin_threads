import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const allMiddlewares = [logger],
	composeEnhancers = compose(applyMiddleware(...allMiddlewares));

export const store = createStore(rootReducer, undefined, composeEnhancers);
