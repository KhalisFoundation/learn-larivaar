import React from 'react';
import 'react-native-gesture-handler';

import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import {Launchpad, Settings, About} from '.';
import {useStoreState} from '../store/hooks';

const Drawer = createDrawerNavigator();

const AppWrapper = (): JSX.Element => {
  const getSettings = (props: DrawerContentComponentProps) => {
    return <Settings {...props} />;
  };
  const {darkTheme} = useStoreState(state => state);


  return (
      <NavigationContainer theme={darkTheme === true ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator
          screenOptions={{
            headerTintColor: darkTheme === true ? '#FFFFFF' : '#333333',
          }}
          drawerContent={props => getSettings(props)}>
          <Drawer.Screen name="Learn Larivaar" component={Launchpad} />
          <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
      </NavigationContainer>
  );
};

export default AppWrapper;
