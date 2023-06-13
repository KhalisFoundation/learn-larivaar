import {elementStyles} from '../../../styles/elements';

export const getStyle = (index: number, larivaarAssist: Boolean) => {
  if (larivaarAssist) {
    if (index % 2 === 0) {
      return {
        color: 'black',
        ...elementStyles.gurbani,
      };
    } else {
      return {
        color: 'red',
        ...elementStyles.gurbani,
      };
    }
  } else {
    return elementStyles.gurbani;
  }
};
