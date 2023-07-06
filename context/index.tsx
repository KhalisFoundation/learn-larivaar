import {createContext} from 'react';

export const LarivaarContext = createContext({
  larivaar: true,
  saveLarivaar: (_larivaar: boolean) => {},
  larivaarAssist: false,
  saveLarivaarAssist: (_larivaarAssist: boolean) => {},
});
