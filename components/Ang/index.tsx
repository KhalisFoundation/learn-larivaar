import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {AngProps, AngData} from './interfaces';
import {textStyles} from '../../styles/text';
import {layoutStyles} from '../../styles/layout';

const Ang = (props: AngProps): JSX.Element => {
  const [currentAngData, setCurrentAngData] = useState({} as AngData);

  useEffect(() => {
    fetch(`https://api.banidb.com/v2/angs/${props.page}`)
      .then(res => res.json())
      .then(data => setCurrentAngData(data));
  }, [props.page]);

  const getStyle = (index: number) => {
    if (props.larivaarAssist) {
      if (index % 2 === 0) {
        return {
          color: 'black',
          ...textStyles.wordStyle,
        };
      } else {
        return {
          color: 'red',
          ...textStyles.wordStyle,
        };
      }
    } else {
      return textStyles.wordStyle;
    }
  };

  const bake = (verse: string) => {
    const words = verse.split(' ');
    return words.map((word, index) => {
      return (
        <View key={index}>
          <Text style={getStyle(index)}>{word}</Text>
        </View>
      );
    });
  };

  return (
    <View style={layoutStyles.wordContainer}>
      {currentAngData.page &&
        currentAngData.page.map(page => bake(page.verse.unicode))}
    </View>
  );
};

export default Ang;
