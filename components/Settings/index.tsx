import React from 'react';
import {View, Text, Switch, Pressable} from 'react-native';

import {layoutStyles} from '../../styles/layout';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {elementStyles} from '../../styles';

import {useTheme} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useStoreActions, useStoreState} from 'easy-peasy';

const Settings = ({navigation}: DrawerContentComponentProps): JSX.Element => {
  const {larivaar, larivaarAssist, keepAwake, fontSize} = useStoreState(
    (state: any) => state.settings,
  );
  const {setLarivaar, setLarivaarAssist, setKeepScreenAwake, setFontSize} =
    useStoreActions((actions: any) => actions.settings);

  const minFontSize = 14;
  const maxFontSize = 30;

  const currentTheme = useTheme().colors;
  const themeStyles = elementStyles(currentTheme);

  return (
    <>
      {console.log('does this all render again?')}
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
                    console.log('font size is', fontSize);
                    if (fontSize < maxFontSize) {
                      setFontSize(fontSize + 2);
                    }
                  }}
                />
                <FontAwesome5
                  name="minus-circle"
                  style={{paddingLeft: 10, fontSize: 20}}
                  onPress={() => {
                    console.log('font size is', fontSize);
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
                  console.log('larivaar in setting', larivaar);
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
                value={keepAwake}
                onChange={() => {
                  setKeepScreenAwake(!keepAwake);
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
