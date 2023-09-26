import {Theme} from '@react-navigation/native';
import {elementStyles} from '../../../styles/elements';

export const getStyle = (
  index: number,
  larivaar: Boolean,
  larivaarAssist: Boolean,
  theme: Theme['colors'],
) => {
  if (larivaar && larivaarAssist) {
    if (index % 2 === 0) {
      return {
        ...elementStyles(theme).gurbani,
      };
    } else {
      return {
        ...elementStyles(theme).gurbani,
        color: 'red',
      };
    }
  } else {
    return elementStyles(theme).gurbani;
  }
};
