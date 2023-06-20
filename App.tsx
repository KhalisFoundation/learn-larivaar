import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import {Launchpad, Settings} from './components';
import {LarivaarContext} from './context';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {navigationProps} from './components/Settings/interfaces/props';

const Drawer = createDrawerNavigator();

const App = (): JSX.Element => {
  const [larivaarAssist, setLarivaarAssist] = useState(false);
  const {getItem, setItem} = useAsyncStorage('@larivaarAssist');

  const getSettings = (props: navigationProps) => {
    return <Settings {...props} />;
  };

  const readItemFromStorage = async () => {
    const item = await getItem();
    if (item) {
      setLarivaarAssist(JSON.parse(item));
    }
  };

  const saveLarivaarAssist = async (newValue: boolean) => {
    await setItem(JSON.stringify(newValue));
    setLarivaarAssist(newValue);
  };
  const value = {larivaarAssist, saveLarivaarAssist};

  useEffect(() => {
    readItemFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LarivaarContext.Provider value={value}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => getSettings(props)}>
          <Drawer.Screen name="Learn Larivaar" component={Launchpad} />
        </Drawer.Navigator>
      </NavigationContainer>
    </LarivaarContext.Provider>
  );
};

export default App;
