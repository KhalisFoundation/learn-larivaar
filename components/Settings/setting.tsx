import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Switch, Pressable} from 'react-native';

import {layoutStyles} from '../../styles/layout';
import {LarivaarContext} from '../../context';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {elementStyles} from '../../styles';

import {useTheme} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Settings = ({navigation}: DrawerContentComponentProps): JSX.Element => {
  const {
    larivaarAssist,
    saveLarivaarAssist,
    larivaar,
    saveLarivaar,
    keepAwake,
    saveKeepAwake,
    fontSize,
    saveFontSize,
  } = useContext(LarivaarContext);

  const [assistSwitch, setAssistSwitch] = useState(larivaarAssist);
  const [larivaarSwitch, setLarivaarSwitch] = useState(larivaar);
  const [awakeSwitch, setAwakeSwitch] = useState(keepAwake);

  const minFontSize = 14;
  const maxFontSize = 30;

  useEffect(() => {
    setAssistSwitch(larivaarAssist);
    setLarivaarSwitch(larivaar);
  }, [larivaarAssist, larivaar]);

  const currentTheme = useTheme().colors;
  const themeStyles = elementStyles(currentTheme);

  return (
    <>
      <View style={layoutStyles.settingContainer}>
        <View style={layoutStyles.sidebarWrapper}>
          <View style={layoutStyles.sidebarScreens}>
            <Pressable
              style={layoutStyles.sidebarItem}
              onPress={() => navigation.navigate('Learn Larivaar')}>
              <Text style={themeStyles.sidebarItem}>Home</Text>
            </Pressable>
            <Pressable
              style={layoutStyles.sidebarItem}
              onPress={() => navigation.navigate('About')}>
              <Text style={themeStyles.sidebarItem}>About</Text>
            </Pressable>
          </View>

          <View style={layoutStyles.sidebarSettings}>
            <Text style={themeStyles.heading}>Settings</Text>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Font size</Text>
              <View style={layoutStyles.sidebarItem}>
                <FontAwesome5
                  name="plus-circle"
                  style={{paddingLeft: 10, fontSize: 20}}
                  onPress={() => {
                    if (fontSize < maxFontSize) {
                      saveFontSize(fontSize + 2);
                    }
                  }}
                />
                <FontAwesome5
                  name="minus-circle"
                  style={{paddingLeft: 10, fontSize: 20}}
                  onPress={() => {
                    if (fontSize > minFontSize) {
                      saveFontSize(fontSize - 2);
                    }
                  }}
                />
              </View>
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Larivaar</Text>
              <Switch
                value={larivaarSwitch}
                onChange={() => {
                  setLarivaarSwitch(!larivaar);
                  saveLarivaar(!larivaar);
                }}
              />
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Larivaar Assist</Text>
              <Switch
                value={assistSwitch}
                onChange={() => {
                  setAssistSwitch(!larivaarAssist);
                  saveLarivaarAssist(!larivaarAssist);
                }}
              />
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Keep Screen Awake</Text>
              <Switch
                value={awakeSwitch}
                onChange={() => {
                  setAwakeSwitch(!keepAwake);
                  saveKeepAwake(!keepAwake);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Settings;
