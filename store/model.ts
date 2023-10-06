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

  setFontSize: action((state, payload) => ({
    ...state,
    fontSize: payload,
  })),
  setLarivaar: action((state, payload) => ({
    ...state,
    larivaar: payload,
  })),
  setLarivaarAssist: action((state, payload) => ({
    ...state,
    larivaarAssist: payload,
  })),
  setKeepScreenAwake: action((state, payload) => ({
    ...state,
    keepScreenAwake: payload,
  })),
  setDarkTheme: action((state, payload) => ({
    ...state,
    darkTheme: payload,
  })),
  setLeftHandedMode: action((state, payload) => ({
    ...state,
    leftHandedMode: payload,
  })),
  setSwipeNavigation: action((state, payload) => ({
    ...state,
    swipeNavigation: payload,
  })),
  setDarkTheme: action((state, payload) => ({
    ...state,
    darkTheme: payload,
  }))
}