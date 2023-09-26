import {createStore, action} from 'easy-peasy';

export const store = createStore({
  settings: {
    fontSize: 18,
    keepScreenAwake: false,
    larivaar: true,
    larivaarAssist: false,

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
  },
});
