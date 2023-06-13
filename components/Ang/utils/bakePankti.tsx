import React from 'react';
import {View, Text} from 'react-native';
import {getStyle} from './getStyle';

export const bake = (verse: string, larivaarAssist: Boolean) => {
  const words = verse.split(' ');
  return words.map((word, index) => {
    return (
      <View key={index}>
        <Text style={getStyle(index, larivaarAssist)}>{word}</Text>
      </View>
    );
  });
};
