import {createContext} from 'react';

export const LarivaarContext = createContext({
  larivaarAssist: false,
  setLarivaarAssist: (_larivaarAssist: boolean) => {},
});
