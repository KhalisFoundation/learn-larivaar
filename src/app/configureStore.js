import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash.throttle';

import rootReducer from '../reducers';
import { loadState, saveState } from './localStorage';

const middleware = [
  thunkMiddleware,
];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(
    rootReducer,
    persistedState,
    enhancer,
  );
  /* eslint-enable */

  store.subscribe(throttle(() => {
    const state = store.getState();
    saveState(state);
  }, 1000));

  return store;
};

export default configureStore;
