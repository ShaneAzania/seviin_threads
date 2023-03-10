import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// redux-persist config and reducer
const persistConfig = {
		key: 'root',
		storage,
		blacklist: ['categories', 'user'], // list of reducer values from root-reducer that you don't want to persist
	},
	persisted_reducer = persistReducer(persistConfig, rootReducer);

console.log(Boolean);

// dev tools enabler
const allMiddlewares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean),
	composeEnhancer_for_dev_tools =
		(process.env.NODE_ENV !== 'production' &&
			window &&
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
		compose,
	composeEnhancers = composeEnhancer_for_dev_tools(applyMiddleware(...allMiddlewares));

export const store = createStore(persisted_reducer, undefined, composeEnhancers);

export const persistor = persistStore(store);
