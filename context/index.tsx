import {createContext} from 'react';

export const LarivaarContext = createContext({
  larivaarAssist: false,
  saveLarivaarAssist: (_larivaarAssist: boolean) => {},
});
