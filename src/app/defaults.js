import lodashSet from 'lodash.set';
import sources from './sources';

const defaults = {
  defaultCurrentAng: {
    ang: 1,
    source: 'G',
  },
  larivaarDefaults: {
    larivaar: true,
    larivaarAssist: false,
  },
};

// Add all sources to the default state
Object.keys(sources).forEach((source) => {
  defaults.defaultCurrentAng[source] = 1;
});

/*
  ### Migration ###
  Migrate from pre-redux preference management
*/
const migration = {
  'defaultCurrentAng.ang': 'ang',
  'larivaarDefaults.larivaar': 'larreevaar',
  'larivaarDefaults.larivaarAssist': 'larreevaar_assistance',
};

// Overwrite defaults with previous preferences
Object.keys(migration).forEach((newKey) => {
  const oldKey = migration[newKey];
  const oldVal = window.localStorage[oldKey];
  if (oldVal !== undefined) {
    lodashSet(defaults, newKey, oldVal);
  }
  // Delete old preferences
  window.localStorage.removeItem(oldKey);
});

export default defaults;
