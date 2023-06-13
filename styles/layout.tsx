import {StyleSheet} from 'react-native';

export const layoutStyles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
  },
  wordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
