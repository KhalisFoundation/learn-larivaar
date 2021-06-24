import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { CustomDrawerContent } from '../components/CustomDrawer';
import { CustomNav } from '../components/CustomNav';
import { LeftHeader } from '../components/LeftHeader';
import { RightHeader } from '../components/RightHeader';

import {useApp} from '../contexts/AppContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const dStack = () => {
  const ctx = useApp()

  return (
    <Stack.Navigator
      screenOptions={{
        title: <CustomNav />,
        headerStyle: ctx.nightMode ? { backgroundColor: 'black'} : { backgroundColor: 'white'} 
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({navigation}) => ({
          headerLeft: () => <LeftHeader navigation={navigation} />,
          headerRight: () => <RightHeader navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeScreen" component={dStack} />
    </Drawer.Navigator>
  );
};
