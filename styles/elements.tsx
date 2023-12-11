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
      fontSize: 20,
      textAlign: 'center',
    },
    leftAlign: {
      textAlign: 'left',
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
      color: theme.primary,
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
      color: theme.text,
    },
    navigationHeader: {
      backgroundColor: theme.card,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      height: 82,
    },
    larivaarAssistInHeader: {
      borderRadius: 6,
      borderColor: theme.text,
      flexDirection: 'row',
      borderWidth: 1,
      padding: 8,
      fontSize: 20,
    },
    popup: {
      backgroundColor: theme.background,
      padding: 10,
      borderRadius: 5,
    },
    modalView: {
      margin: 15,
      backgroundColor: theme.background,
      color: theme.text,
      borderRadius: 2,
      padding: 20,
      shadowColor: theme.background,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    datePickerLabel: {
      color: theme.text,
      marginRight: 10,
    },
  });
