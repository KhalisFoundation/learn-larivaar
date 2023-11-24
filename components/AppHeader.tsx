import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {useTheme} from '@react-navigation/native';

import {useStoreState, useStoreActions} from '../store/hooks';

import {AngInput} from './Ang/AngInput';
import {elementStyles} from '../styles';

export const Header = ({navigation}: {navigation: any}) => {
  const {leftHandedMode, larivaarAssist} = useStoreState(state => state);
  const currentTheme = useTheme().colors;
  const {setLarivaarAssist} = useStoreActions(actions => actions);
  const insets = useSafeAreaInsets();

  const menuIcon = (menuNavigation: any) => (
    <TouchableOpacity onPress={() => menuNavigation.toggleDrawer()}>
      <FontAwesome5 name="bars" size={22} color={currentTheme.text} />
    </TouchableOpacity>
  );
  const larivaarAssistIcon = () => (
    <TouchableOpacity
      onPress={() => {
        setLarivaarAssist(!larivaarAssist);
      }}>
      <View style={elementStyles(currentTheme).larivaarAssistInHeader}>
        {larivaarAssist ? (
          <>
            <Text style={{color: currentTheme.text}}>ਸੋ</Text>
            <Text style={{color: currentTheme.primary}}>ਦਰੁ</Text>
          </>
        ) : (
          <>
            <Text style={{color: currentTheme.text}}>ਸੋ</Text>
            <Text style={{color: currentTheme.text}}>ਦਰੁ</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
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
