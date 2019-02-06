import { combineReducers } from 'redux';

import {
  currentAng,
  angCache,
} from './ang';

export default combineReducers({
  angCache,
  currentAng,
});
