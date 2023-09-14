import React from 'react';
import {View, Text} from 'react-native';
import {getStyle} from './getStyle';
import {Theme} from '@react-navigation/native';

export const bakePankti = ({
  verse,
  larivaar,
  larivaarAssist,
  currentTheme,
}: {
  verse: string;
  larivaar: Boolean;
  larivaarAssist: Boolean;
  currentTheme: Theme['colors'];
}) => {
  const words = verse.split(' ');
  return words.map((word, index) => {
    return (
      <View key={index}>
        <Text style={getStyle(index, larivaar, larivaarAssist, currentTheme)}>
          {word}
          {!larivaar && ' '}
        </Text>
      </View>
    );
  });
};
