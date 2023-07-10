import React, {useContext} from 'react';
import {View, Text, Switch, Button} from 'react-native';
import {layoutStyles} from '../../styles/layout';
import {LarivaarContext} from '../../context';
import {navigationProps} from './interfaces/props';

const Settings = ({navigation}: navigationProps): JSX.Element => {
  const {larivaarAssist, saveLarivaarAssist, larivaar, saveLarivaar} =
    useContext(LarivaarContext);

  return (
    <>
      <View style={layoutStyles.settingContainer}>
        <View style={{flex: 1}}>
          <View style={layoutStyles.sidebarItem}>
            <Text>Larivaar</Text>
            <Switch value={larivaar} onChange={() => saveLarivaar(!larivaar)} />
          </View>
          <View style={layoutStyles.sidebarItem}>
            <Text>Larivaar Assist</Text>
            <Switch
              value={larivaarAssist}
              onChange={() => saveLarivaarAssist(!larivaarAssist)}
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
