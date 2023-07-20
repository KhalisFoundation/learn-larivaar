import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Switch, Button, Pressable, BackHandler} from 'react-native';
import {layoutStyles} from '../../styles/layout';
import {LarivaarContext} from '../../context';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

const Settings = ({navigation}: DrawerContentComponentProps): JSX.Element => {
  const {
    larivaarAssist,
    saveLarivaarAssist,
    larivaar,
    saveLarivaar,
    keepAwake,
    saveKeepAwake,
  } = useContext(LarivaarContext);

  const [assistSwitch, setAssistSwitch] = useState(larivaarAssist);
  const [larivaarSwitch, setLarivaarSwitch] = useState(larivaar);
  const [awakeSwitch, setAwakeSwitch] = useState(keepAwake);

  useEffect(() => {
    setAssistSwitch(larivaarAssist);
    setLarivaarSwitch(larivaar);
  }, [larivaarAssist, larivaar]);

  return (
    <>
      <View style={layoutStyles.settingContainer}>
        <View style={layoutStyles.sidebarWrapper}>
          <Pressable
            style={layoutStyles.sidebarItem}
            onPress={() => navigation.navigate('Learn Larivaar')}>
            <Text>Home</Text>
          </Pressable>
          <View style={layoutStyles.sidebarItem}>
            <Text>Larivaar</Text>
            <Switch
              value={larivaarSwitch}
              onChange={() => {
                setLarivaarSwitch(!larivaar);
                saveLarivaar(!larivaar);
              }}
            />
          </View>
          <View style={layoutStyles.sidebarItem}>
            <Text>Larivaar Assist</Text>
            <Switch
              value={assistSwitch}
              onChange={() => {
                setAssistSwitch(!larivaarAssist);
                saveLarivaarAssist(!larivaarAssist);
              }}
            />
          </View>
          <View style={layoutStyles.sidebarItem}>
            <Text>Keep Screen Awake</Text>
            <Switch
              value={awakeSwitch}
              onChange={() => {
                setAwakeSwitch(!keepAwake);
                saveKeepAwake(!keepAwake);
              }}
            />
          </View>
          <Pressable
            style={layoutStyles.sidebarItem}
            onPress={() => navigation.navigate('About')}>
            <Text>About</Text>
          </Pressable>
        </View>
        <View>
          <Button title="Exit" onPress={() => BackHandler.exitApp()} />
        </View>
      </View>
    </>
  );
};

export default Settings;
