import {createContext} from 'react';

export const LarivaarContext = createContext({
  larivaar: true,
  saveLarivaar: (_larivaar: boolean) => {},
  larivaarAssist: false,
  saveLarivaarAssist: (_larivaarAssist: boolean) => {},
  keepAwake: true,
  saveKeepAwake: (_keepAwake: boolean) => {},
});
