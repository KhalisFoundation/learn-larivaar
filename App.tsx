import React from 'react';
import 'react-native-gesture-handler';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import {Launchpad, Settings} from './components';

const Drawer = createDrawerNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        // eslint-disable-next-line react/no-unstable-nested-components
        drawerContent={props => <Settings {...props} />}>
        <Drawer.Screen name=" " component={Launchpad} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
