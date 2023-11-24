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
import {Header} from './AppHeader';

const Drawer = createDrawerNavigator();

const AppLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f37b20',
  },
};

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#f37b20',
  },
};
const AppWrapper = (): JSX.Element => {
  const getSettings = (props: DrawerContentComponentProps) => {
    return <Settings {...props} />;
  };
  const getHeader = ({navigation}: any) => {
    return <Header navigation={navigation} />;
  };
  const {darkTheme, leftHandedMode} = useStoreState(state => state);
  const currentTheme = darkTheme === true ? AppDarkTheme : AppLightTheme;

  return (
    <NavigationContainer theme={currentTheme}>
      <Drawer.Navigator drawerContent={props => getSettings(props)}>
        <Drawer.Screen
          name="Learn Larivaar"
          component={Launchpad}
          options={({navigation}) => ({
            drawerPosition: leftHandedMode === true ? 'right' : 'left',
            header: () => getHeader({navigation}),
          })}
        />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;
