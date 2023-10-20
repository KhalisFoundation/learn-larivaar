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
    flexGrow: 1,
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
  aboutContainer: {
    margin: 10,
    padding: 10,
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
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
});
