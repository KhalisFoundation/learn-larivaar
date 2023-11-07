import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {useTheme} from '@react-navigation/native';

import {useStoreState, useStoreActions} from '../store/hooks';

import {AngInput} from './Ang/AngInput';
import {elementStyles, layoutStyles} from '../styles';

export const Header = ({navigation}: {navigation: any}) => {
  const {darkTheme, leftHandedMode, larivaarAssist} = useStoreState(state => state);
  const currentTheme = useTheme().colors;
  const {setLarivaarAssist} = useStoreActions(actions => actions);
  const insets = useSafeAreaInsets();

  const menuAdjustmentStyle = leftHandedMode
    ? {marginTop:16, marginRight: 16}
    : {marginTop: 16, marginLeft: 16};

  const menuIcon = (navigation: any) => (
    <TouchableOpacity
      style={{...menuAdjustmentStyle}}
      onPress={() => navigation.toggleDrawer()}>
      <FontAwesome5
        name="bars"
        size={22}
        color={currentTheme.text}
      />
    </TouchableOpacity>
  );
  const larivaarAssistIcon = () => (
    <TouchableOpacity
      style={leftHandedMode? {marginLeft: 16} : {marginRight: 16}}
      onPress={() => {setLarivaarAssist(!larivaarAssist)}}>
      {larivaarAssist ? 
        <View style={layoutStyles.larivaarAssistInHeader} >
          <Text>ਸੋ</Text><Text style={{color: currentTheme.primary}}>ਦਰੁ</Text>
        </View>
        :
        <View style={layoutStyles.larivaarAssistInHeader} >
          <Text>ਸੋ</Text><Text>ਦਰੁ</Text>
        </View>
      }
    </TouchableOpacity>
  )
  return (
      <View
        style={{
          ...elementStyles(currentTheme).navigationHeader,
          paddingTop: insets.top,
        }}>
        {leftHandedMode ? larivaarAssistIcon() : menuIcon(navigation)}
        <AngInput />
        {leftHandedMode ? menuIcon(navigation) : larivaarAssistIcon()}
      </View>
  );
};
