import sources from './sources';

const defaults = {
  defaultCurrentAng: {
    ang: 1,
    source: 'G',
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
  ang: window.localStorage.ang,
};

// Overwrite defaults with previous preferences
if (migration.ang) {
  defaults.defaultCurrentAng.ang = migration.ang;
  defaults.defaultCurrentAng.G = migration.ang;
}

// Delete old preferences
window.localStorage.removeItem('ang');

export default defaults;
