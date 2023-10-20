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

import {View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Launchpad, Settings, About} from '.';
import {useStoreState} from '../store/hooks';
import {AngInput} from './Ang/AngInput';
import {elementStyles} from '../styles';

const Drawer = createDrawerNavigator();

const AppWrapper = (): JSX.Element => {
  const getSettings = (props: DrawerContentComponentProps) => {
    return <Settings {...props} />;
  };
  const {darkTheme, leftHandedMode} = useStoreState(state => state);
  const currentTheme = darkTheme === true ? DarkTheme : DefaultTheme;

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

  const bakeHeader = (navigation: any) => {
    return (
      <View style={elementStyles(currentTheme.colors).navigationHeader}>
        {leftHandedMode ? <AngInput /> : menuIcon(navigation)}
        {leftHandedMode ? menuIcon(navigation) : <AngInput />}
      </View>
    );
  };

  return (
    <NavigationContainer theme={currentTheme}>
      <Drawer.Navigator drawerContent={props => getSettings(props)}>
        <Drawer.Screen
          name="Learn Larivaar"
          component={Launchpad}
          options={({navigation}) => ({
            drawerPosition: leftHandedMode === true ? 'right' : 'left',
            header: () => bakeHeader(navigation),
          })}
        />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;
