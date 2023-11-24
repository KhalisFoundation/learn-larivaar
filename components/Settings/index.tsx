import React, {useState} from 'react';
import {useStoreRehydrated} from 'easy-peasy';
import {useTheme} from '@react-navigation/native';

import {View, Text, Switch, Pressable, TouchableOpacity} from 'react-native';

import Collapsible from 'react-native-collapsible';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

import {elementStyles, layoutStyles} from '../../styles';
import {MIN_FONT_SIZE, MAX_FONT_SIZE} from '../constants';
import {useStoreActions, useStoreState} from '../../store/hooks';

import AngModal from './components/AngModal';
import DateModal from './components/DateModal';

const Settings = ({navigation}: DrawerContentComponentProps): JSX.Element => {
  const {
    larivaar,
    larivaarAssist,
    keepScreenAwake,
    fontSize,
    darkTheme,
    leftHandedMode,
    swipeNavigation,
    angsPerDay,
    currentAngForToday,
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

  const currentTheme = useTheme().colors;
  const themeStyles = elementStyles(currentTheme);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [angModal, setAngModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);

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
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Font size</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome5
                  name="minus-circle"
                  style={elementStyles(currentTheme).iconSetting}
                  onPress={() => {
                    if (fontSize > MIN_FONT_SIZE) {
                      setFontSize(fontSize - 2);
                    }
                  }}
                />
                <Text style={themeStyles.sidebarItem}>{fontSize}</Text>
                <FontAwesome5
                  name="plus-circle"
                  style={elementStyles(currentTheme).iconSetting}
                  onPress={() => {
                    if (fontSize < MAX_FONT_SIZE) {
                      setFontSize(fontSize + 2);
                    }
                  }}
                />
              </View>
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Night Mode</Text>
              <Switch
                value={darkTheme}
                onChange={() => {
                  setDarkTheme(!darkTheme);
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
              <Text style={themeStyles.sidebarItem}>Larivaar</Text>
              <Switch
                value={larivaar}
                onChange={() => {
                  setLarivaar(!larivaar);
                }}
              />
            </View>

            {larivaar && (
              <View style={layoutStyles.sidebarItem}>
                <Text style={themeStyles.sidebarItem}>Larivaar Assist</Text>
                <Switch
                  value={larivaarAssist}
                  onChange={() => {
                    setLarivaarAssist(!larivaarAssist);
                  }}
                />
              </View>
            )}

            <View>
              <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
                <View style={layoutStyles.sidebarItem}>
                  <Text style={themeStyles.sidebarItem}>Sehaj Paatth</Text>
                  <Text style={{color: currentTheme.text}}>
                    {currentAngForToday}/{angsPerDay}
                  </Text>
                  {isCollapsed ? (
                    <FontAwesome5
                      name="angle-down"
                      size={24}
                      color={currentTheme.text}
                    />
                  ) : (
                    <FontAwesome5
                      name="angle-up"
                      size={24}
                      color={currentTheme.text}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Collapsible collapsed={isCollapsed}>
                <View>
                  <TouchableOpacity
                    onPress={() => setAngModal(true)}
                    style={layoutStyles.nestedSidebarSettings}>
                    <Text style={themeStyles.sidebarItem}>
                      Set Desired Daily Ang
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setDateModal(true)}
                    style={layoutStyles.nestedSidebarSettings}>
                    <Text style={themeStyles.sidebarItem}>
                      Edit Samaaptee Date
                    </Text>
                  </TouchableOpacity>
                </View>
              </Collapsible>
            </View>
            <AngModal visible={angModal} onClose={() => setAngModal(false)} />
            <DateModal
              visible={dateModal}
              onClose={() => setDateModal(false)}
            />

            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Left-Handed Mode</Text>
              <Switch
                value={leftHandedMode}
                onChange={() => {
                  setLeftHandedMode(!leftHandedMode);
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
