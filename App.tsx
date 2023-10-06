import React from 'react';
import 'react-native-gesture-handler';
import {StoreProvider} from 'easy-peasy';
import {useColorScheme} from 'react-native';

import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import {store} from './store';
import {Launchpad, Settings, About} from './components';
import AppWrapper from './components/AppWrapper';
const Drawer = createDrawerNavigator();

const App = (): JSX.Element => {
  const getSettings = (props: DrawerContentComponentProps) => {
    return <Settings {...props} />;
  };

  const theme = useColorScheme();

  return (
    <StoreProvider store={store}>
      <AppWrapper />
    </StoreProvider>
  );
};

export default App;
