import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {DarkTheme, DefaultTheme} from '@react-navigation/native';

import {useStoreState} from '../store/hooks';

import {AngInput} from './Ang/AngInput';
import {elementStyles} from '../styles';

export const Header = ({navigation}: {navigation: any}) => {
  const {darkTheme, leftHandedMode} = useStoreState(state => state);
  const currentTheme = darkTheme === true ? DarkTheme : DefaultTheme;

  const insets = useSafeAreaInsets();

  const menuIcon = (navigation: any) => (
    <TouchableOpacity
      style={{margin: 16}}
      onPress={() => navigation.toggleDrawer()}>
      <FontAwesome5
        name="bars"
        size={22}
        color={darkTheme ? '#FFFFFF' : '#333333'}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        ...elementStyles(currentTheme.colors).navigationHeader,
        paddingTop: insets.top,
      }}>
      {leftHandedMode ? <AngInput /> : menuIcon(navigation)}
      {leftHandedMode ? menuIcon(navigation) : <AngInput />}
    </View>
  );
};
