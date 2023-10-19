import React from 'react';
import {useStoreRehydrated} from 'easy-peasy';
import {useTheme} from '@react-navigation/native';
import {View, Text, Switch, Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {layoutStyles} from '../../styles/layout';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {elementStyles} from '../../styles';

import {useStoreActions, useStoreState} from '../../store/hooks';

const Settings = ({navigation}: DrawerContentComponentProps): JSX.Element => {
  const {
    larivaar,
    larivaarAssist,
    keepScreenAwake,
    fontSize,
    darkTheme,
    leftHandedMode,
    swipeNavigation,
  } = useStoreState(state => state);

  const {
    setLarivaar,
    setLarivaarAssist,
    setKeepScreenAwake,
    setFontSize,
    setDarkTheme,
    setLeftHandedMode,
    setSwipeNavigation,
  } = useStoreActions(actions => actions);

  const isRehydrated = useStoreRehydrated();

  const minFontSize = 14;
  const maxFontSize = 30;

  const currentTheme = useTheme().colors;
  const themeStyles = elementStyles(currentTheme);

  return isRehydrated ? (
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
                      setFontSize(fontSize + 2);
                    }
                  }}
                />
                <FontAwesome5
                  name="minus-circle"
                  style={{paddingLeft: 10, fontSize: 20}}
                  onPress={() => {
                    if (fontSize > minFontSize) {
                      setFontSize(fontSize - 2);
                    }
                  }}
                />
              </View>
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Larivaar</Text>
              <Switch
                value={larivaar}
                onChange={() => {
                  setLarivaar(!larivaar);
                }}
              />
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Larivaar Assist</Text>
              <Switch
                value={larivaarAssist}
                onChange={() => {
                  setLarivaarAssist(!larivaarAssist);
                }}
              />
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Keep Screen Awake</Text>
              <Switch
                value={keepScreenAwake}
                onChange={() => {
                  setKeepScreenAwake(!keepScreenAwake);
                }}
              />
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Dark Theme</Text>
              <Switch
                value={darkTheme}
                onChange={() => {
                  setDarkTheme(!darkTheme);
                }}
              />
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Left-Handed Mode</Text>
              <Switch
                value={leftHandedMode}
                onChange={() => {
                  setLeftHandedMode(!leftHandedMode);
                }}
              />
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Swipe Navigation</Text>
              <Switch
                value={swipeNavigation}
                onChange={() => {
                  setSwipeNavigation(!swipeNavigation);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  ) : (
    <Text>Loading..</Text>
  );
};

export default Settings;
