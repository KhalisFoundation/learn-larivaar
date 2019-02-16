import {
  ADD_ANG_TO_CACHE,
  UPDATE_CURRENT_ANG,
} from '../actions/ang';
// Config
import sources from '../app/sources';
import defaults from '../app/defaults';

export const currentAng = (state = defaults.defaultCurrentAng, { type, payload }) => {
  switch (type) {
    case UPDATE_CURRENT_ANG:
      return {
        ...state,
        ang: payload.ang,
        source: payload.source,
        [payload.source]: payload.ang,
      };
    default:
      return state;
  }
};

const defaultAngCacheState = {};
Object.keys(sources).forEach((source) => {
  defaultAngCacheState[source] = {};
});
export const angCache = (state = defaultAngCacheState, { type, payload }) => {
  switch (type) {
    case ADD_ANG_TO_CACHE:
      return {
        ...state,
        [payload.source]: {
          ...state[payload.source],
          [payload.ang]: payload.verses,
        },
      };
    default:
      return state;
  }
};
