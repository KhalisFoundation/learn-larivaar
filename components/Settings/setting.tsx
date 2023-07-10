import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Switch, Button} from 'react-native';
import {layoutStyles} from '../../styles/layout';
import {LarivaarContext} from '../../context';
import {navigationProps} from './interfaces/props';

const Settings = ({navigation}: navigationProps): JSX.Element => {
  const {larivaarAssist, saveLarivaarAssist, larivaar, saveLarivaar} =
    useContext(LarivaarContext);

  const [assistSwitch, setAssistSwitch] = useState(larivaarAssist);
  const [larivaarSwitch, setLarivaarSwitch] = useState(larivaar);

  useEffect(() => {
    setAssistSwitch(larivaarAssist);
    setLarivaarSwitch(larivaar);
  }, [larivaarAssist, larivaar]);

  return (
    <>
      <View style={layoutStyles.settingContainer}>
        <View style={{flex: 1}}>
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
        </View>
        <View>
          <Button title="Go Back" onPress={() => navigation.closeDrawer()} />
        </View>
      </View>
    </>
  );
};

export default Settings;
