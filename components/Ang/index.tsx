import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {AngProps, AngData} from './interfaces';
import {layoutStyles} from '../../styles/layout';
import {bakePankti} from './utils/bakePankti';
import {LarivaarContext} from '../../context';
import {DoubleTap} from '../common/double-tap';
import {sendRequest} from './utils/sendRequest';
import {useTheme} from '@react-navigation/native';

const Ang = (props: AngProps): JSX.Element => {
  const [currentAngData, setCurrentAngData] = useState({} as AngData);
  const {larivaarAssist, larivaar, fontSize, saveLarivaarAssist} =
    useContext(LarivaarContext);
  const [isLoading, setIsLoading] = useState(true);
  const currentTheme = useTheme().colors;

  useEffect(() => {
    sendRequest(props.page, setCurrentAngData, setIsLoading);
  }, [props.page]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <DoubleTap
      customTap={() => {
        larivaar && saveLarivaarAssist(!larivaarAssist);
      }}>
      <View style={layoutStyles.wordContainer}>
        {currentAngData.page &&
          currentAngData.page.map(page =>
            bakePankti({
              verse: page.verse.unicode,
              larivaar,
              larivaarAssist,
              currentTheme,
              fontSize,
            }),
          )}
      </View>
    </DoubleTap>
  );
};

export default Ang;
