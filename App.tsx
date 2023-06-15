import React, {useState} from 'react';
import 'react-native-gesture-handler';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import {Launchpad, Settings} from './components';
import {LarivaarContext} from './context';

const Drawer = createDrawerNavigator();

const App = (): JSX.Element => {
  const [larivaarAssist, setLarivaarAssist] = useState(false);
  const value = {larivaarAssist, setLarivaarAssist};
  return (
    <LarivaarContext.Provider value={value}>
      <NavigationContainer>
        <Drawer.Navigator
          // eslint-disable-next-line react/no-unstable-nested-components
          drawerContent={props => <Settings {...props} />}>
          <Drawer.Screen name="Learn Larivaar" component={Launchpad} />
        </Drawer.Navigator>
      </NavigationContainer>
    </LarivaarContext.Provider>
  );
};

export default App;
