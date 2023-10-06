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

const Drawer = createDrawerNavigator();

const App = (): JSX.Element => {
  const getSettings = (props: DrawerContentComponentProps) => {
    return <Settings {...props} />;
  };

  const theme = useColorScheme();

  return (
    <StoreProvider store={store}>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator
          screenOptions={{
            headerTintColor: theme === 'dark' ? '#FFFFFF' : '#333333',
          }}
          drawerContent={props => getSettings(props)}>
          <Drawer.Screen name="Learn Larivaar" component={Launchpad} />
          <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
