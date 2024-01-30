import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {useTheme} from '@react-navigation/native';

import {useStoreState, useStoreActions} from '../store/hooks';

import {AngInput} from './Ang/AngInput';
import {elementStyles} from '../styles';

export const Header = ({navigation}: {navigation: any}) => {
  const {leftHandedMode, larivaar, larivaarAssist} = useStoreState(
    state => state,
  );
  const currentTheme = useTheme().colors;
  const {setLarivaarAssist} = useStoreActions(actions => actions);
  const insets = useSafeAreaInsets();
  const screenIndex = navigation.getState().index;

  const menuIcon = (menuNavigation: any) => (
    <TouchableOpacity onPress={() => menuNavigation.toggleDrawer()}>
      <FontAwesome5 name="bars" size={22} color={currentTheme.text} />
    </TouchableOpacity>
  );
  const larivaarAssistIcon = () => (
    <>
      {larivaar && screenIndex === 0 ? (
        <TouchableOpacity
          onPress={() => {
            setLarivaarAssist(!larivaarAssist);
          }}>
          <View style={elementStyles(currentTheme).larivaarAssistInHeader}>
            <>
              <Text style={{color: currentTheme.text}}>ਸੋ</Text>
              <Text
                style={
                  larivaarAssist
                    ? {color: currentTheme.primary}
                    : {color: currentTheme.text}
                }>
                ਦਰੁ
              </Text>
            </>
          </View>
        </TouchableOpacity>
      ) : (
        <Text />
      )}
    </>
  );
  const screenHeader = () => {
    return (
      <View
        style={{
          ...elementStyles(currentTheme).navigationHeader,
          paddingTop: insets.top,
        }}>
        {leftHandedMode ? larivaarAssistIcon() : menuIcon(navigation)}
        {screenIndex === 0 && <AngInput />}
        {leftHandedMode ? menuIcon(navigation) : larivaarAssistIcon()}
      </View>
    );
  };

  return <>{screenHeader()}</>;
};
