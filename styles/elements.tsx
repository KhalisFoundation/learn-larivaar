import {Theme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

export const elementStyles = (theme: Theme['colors']) =>
  StyleSheet.create({
    gurbani: {
      color: theme.text,
      lineHeight: 35,
    },
    input: {
      borderColor: theme.text,
      borderStyle: 'solid',
      borderWidth: 1,
      color: theme.text,
      padding: 10,
      width: 70,
      textAlign: 'center',
    },
    iconButton: {
      color: theme.text,
      fontSize: 30,
      verticalAlign: 'middle',
      padding: 10,
    },
    logo: {
      backgroundColor: 'white',
      margin: 10,
    },
    aboutText: {
      color: theme.text,
      margin: 10,
    },
    heading: {
      color: theme.text,
      fontSize: 24,
    },
    sidebarItem: {
      color: theme.text,
      fontSize: 18,
    },
    smallText: {
      fontSize: 12,
    }
  });
