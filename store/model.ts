import {action} from 'easy-peasy';
import {StoreInterface} from './interface';

export const storeModel: StoreInterface = {
  fontSize: 18,
  keepScreenAwake: false,
  larivaar: true,
  larivaarAssist: false,
  darkTheme: false,
  leftHandedMode: false,
  swipeNavigation: false,
  currentAng: 1,
  completionDate: new Date(),
  angsPerDay: 0,
  currentAngForToday: 0,
  databaseDownloaded: false,

  setFontSize: action((state, payload) => {
    try {
      state.fontSize = payload;
    } catch (error) {
      console.error('Error setting fontSize:', error);
    }
  }),
  setLarivaar: action((state, payload) => {
    try {
      state.larivaar = payload;
    } catch (error) {
      console.error('Error setting larivaar:', error);
    }
  }),
  setLarivaarAssist: action((state, payload) => {
    try {
      console.log('this runs', state, payload);
      state.larivaarAssist = payload;
    } catch (error) {
      console.error('Error setting larivaarAssist:', error);
    }
  }),
  setKeepScreenAwake: action((state, payload) => {
    try {
      state.keepScreenAwake = payload;
    } catch (error) {
      console.error('Error setting keepScreenAwake:', error);
    }
  }),
  setDarkTheme: action((state, payload) => {
    try {
      state.darkTheme = payload;
    } catch (error) {
      console.error('Error setting darkTheme:', error);
    }
  }),
  setLeftHandedMode: action((state, payload) => {
    try {
      state.leftHandedMode = payload;
    } catch (error) {
      console.error('Error setting leftHandedMode:', error);
    }
  }),
  setSwipeNavigation: action((state, payload) => {
    try {
      console.log(
        'state navigation',
        'swipeNavigation',
        payload,
        state.leftHandedMode,
      );
      state.swipeNavigation = payload;
    } catch (error) {
      console.error('Error setting swipeNavigation:', error);
    }
  }),
  setCurrentAng: action((state, payload) => {
    try {
      state.currentAng = payload;
    } catch (error) {
      console.error('Error setting currentAng:', error);
    }
  }),
  setCompletitionDate: action((state, payload) => {
    try {
      state.completionDate = payload;
    } catch (error) {
      console.error('Error setting completitionDate:', error);
    }
  }),
  setAngsPerDay: action((state, payload) => {
    try {
      state.angsPerDay = payload;
    } catch (error) {
      console.error('Error setting angsPerDay:', error);
    }
  }),
  setCurrentAngForToday: action((state, payload) => {
    try {
      state.currentAngForToday = payload;
    } catch (error) {
      console.error('Error setting currentAngForToday:', error);
    }
  }),
  setDatabaseDownloaded: action((state, payload) => {
    try {
      state.databaseDownloaded = payload;
    } catch (error) {
      console.error('Error setting databaseDownloaded:', error);
    }
  }),
};
