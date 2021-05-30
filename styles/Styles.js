
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    sectionContainer: {
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    menuitem: {
      paddingVertical: 10,
      fontSize: 21,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      
    },
    menuitemtxt: {
      fontSize: 21,
    },
    stext: {
      fontSize: 20,
      textAlign: 'left',
    },
    hdr: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      paddingBottom: 5,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    modalView: {
      marginTop: '50%',
      marginHorizontal: 20,
      backgroundColor: 'white',
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });