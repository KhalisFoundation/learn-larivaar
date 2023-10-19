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

import {TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Launchpad, Settings, About} from '.';
import {useStoreState} from '../store/hooks';

const Drawer = createDrawerNavigator();

const AppWrapper = (): JSX.Element => {
  const getSettings = (props: DrawerContentComponentProps) => {
    return <Settings {...props} />;
  };
  const {darkTheme, leftHandedMode} = useStoreState(state => state);

  const menuIcon = (navigation: any) => (
    <TouchableOpacity
      style={{margin: 16}}
      onPress={() => navigation.toggleDrawer()}>
      <FontAwesome5
        name="bars"
        size={22}
        color={darkTheme ? '#FFFFFF' : '#333333'}
      />
    </TouchableOpacity>
  );

  return (
    <NavigationContainer theme={darkTheme === true ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        screenOptions={({navigation}) => ({
          headerTintColor: darkTheme === true ? '#FFFFFF' : '#333333',
          drawerPosition: leftHandedMode === true ? 'right' : 'left',
          headerLeft: leftHandedMode ? () => null : () => menuIcon(navigation),
          headerRight: leftHandedMode ? () => menuIcon(navigation) : () => null,
        })}
        drawerContent={props => getSettings(props)}>
        <Drawer.Screen name="Learn Larivaar" component={Launchpad} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;
