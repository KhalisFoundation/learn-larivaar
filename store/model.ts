import {action} from 'easy-peasy';
import {StoreInterface} from './interface';

export const storeModel: StoreInterface = {
  fontSize: 18,
  keepScreenAwake: false,
  larivaar: true,
  larivaarAssist: false,
  darkTheme: false,

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
    keepAwake: payload,
  })),
  setDarkTheme: action((state, payload) => ({
    ...state,
    darkTheme: payload,
  }))
}