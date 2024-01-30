import {StyleSheet} from 'react-native';

export const layoutStyles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 24,
  },
  angInputContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    width: 140,
    paddingTop: 16,
    paddingBottom: 16,
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
  sidebarScreens: {
    marginBottom: 10,
  },
  sidebarSettings: {
    marginTop: 10,
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
  nestedSidebarSettings: {
    marginLeft: 16,
    marginTop: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  flexRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
