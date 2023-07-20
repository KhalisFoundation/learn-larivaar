import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';

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

import {Launchpad, Settings, About} from './components';

import {LarivaarContext} from './context';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import KeepAwake from 'react-native-keep-awake';

const Drawer = createDrawerNavigator();

const App = (): JSX.Element => {
  const [larivaarAssist, setLarivaarAssist] = useState(false);
  const [larivaar, setLarivaar] = useState(true);
  const [keepAwake, setKeepAwake] = useState(true);

  const {getItem, setItem} = useAsyncStorage('@larivaar');

  const getSettings = (props: DrawerContentComponentProps) => {
    return <Settings {...props} />;
  };

  const readItemFromStorage = async () => {
    const item = await getItem();
    if (item) {
      const savedSettings = JSON.parse(item);
      setLarivaar(savedSettings.enabled);
      setLarivaarAssist(savedSettings.assist);
      setKeepAwake(savedSettings.keepAwake);
    }
  };

  const saveLarivaarAssist = async (newValue: boolean) => {
    await setItem(
      JSON.stringify({
        enabled: larivaar,
        assist: newValue,
        keepAwake,
      }),
    );
    setLarivaarAssist(newValue);
  };

  const saveLarivaar = async (newValue: boolean) => {
    await setItem(
      JSON.stringify({
        enabled: newValue,
        assist: larivaarAssist,
        keepAwake,
      }),
    );
    setLarivaar(newValue);
  };

  const saveKeepAwake = async (newValue: boolean) => {
    await setItem(
      JSON.stringify({
        enabled: larivaar,
        assist: larivaarAssist,
        keepAwake: newValue,
      }),
    );
    setKeepAwake(newValue);
  };

  const value = {
    larivaarAssist,
    saveLarivaarAssist,
    larivaar,
    saveLarivaar,
    keepAwake,
    saveKeepAwake,
  };

  const theme = useColorScheme();

  useEffect(() => {
    readItemFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LarivaarContext.Provider value={value}>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        {keepAwake && <KeepAwake />}
        <Drawer.Navigator drawerContent={props => getSettings(props)}>
          <Drawer.Screen name="Learn Larivaar" component={Launchpad} />
          <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
      </NavigationContainer>
    </LarivaarContext.Provider>
  );
};

export default App;
