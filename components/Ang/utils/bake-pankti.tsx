import React from 'react';
import {View, Text} from 'react-native';
import {getStyle} from './get-style';
import {Theme} from '@react-navigation/native';

export const bakePankti = ({
  verse,
  larivaar,
  larivaarAssist,
  currentTheme,
  fontSize,
}: {
  verse: string;
  larivaar: Boolean;
  larivaarAssist: Boolean;
  currentTheme: Theme['colors'];
  fontSize: number;
}) => {
  const words = verse.split(' ');
  return words.map((word, index) => {
    const currentStyle = getStyle(
      index,
      larivaar,
      larivaarAssist,
      currentTheme,
    );
    return (
      <View key={index}>
        <Text style={{fontSize, ...currentStyle}}>
          {word}
          {!larivaar && ' '}
        </Text>
      </View>
    );
  });
};
