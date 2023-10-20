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
    button: {
      width: 100,
      marginLeft: 10,
      marginTop: 20,
    },
    iconButton: {
      color: theme.text,
      fontSize: 30,
      padding: 10,
    },
    iconSetting: {
      fontSize: 20,
      color: theme.text,
      paddingLeft: 10,
      paddingRight: 10,
    },
    logo: {
      backgroundColor: 'white',
      margin: 10,
    },
    aboutText: {
      color: theme.text,
      margin: 10,
    },
    linkText: {
      color: '#f37b20',
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
    },
    navigationHeader: {
      backgroundColor: theme.card,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignSelf: 'stretch',
      padding: 8,
    },
  });
