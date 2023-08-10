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
    flexDirection: 'row',
    margin: 20,
  },
  wordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  settingContainer: {
    marginTop: 30,
    padding: 16,
    flex: 1,
    alignContent: 'space-between',
  },
  sidebarWrapper: {
    flex: 1,
  },
  sidebarItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
});
