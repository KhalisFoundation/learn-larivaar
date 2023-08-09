import React from 'react';
import {View, Text} from 'react-native';
import {getStyle} from './getStyle';

export const bakePankti = ({
  verse,
  larivaar,
  larivaarAssist,
}: {
  verse: string;
  larivaar: Boolean;
  larivaarAssist: Boolean;
}) => {
  const words = verse.split(' ');
  return words.map((word, index) => {
    return (
      <View key={index}>
        <Text style={getStyle(index, larivaar, larivaarAssist)}>
          {word}
          {!larivaar && ' '}
        </Text>
      </View>
    );
  });
};
