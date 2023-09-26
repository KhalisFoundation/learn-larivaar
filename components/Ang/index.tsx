import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {DoubleTap} from '../common';
import {bakePankti} from './utils/bake-pankti';
import {layoutStyles} from '../../styles/layout';
import {sendRequest} from './utils/send-request';
import {AngProps, AngData} from './interfaces/api-response';
import {useStoreActions, useStoreState} from 'easy-peasy';

const Ang = (props: AngProps): JSX.Element => {
  const [currentAngData, setCurrentAngData] = useState({} as AngData);
  const [isLoading, setIsLoading] = useState(true);

  const {larivaar, larivaarAssist, fontSize} = useStoreState(
    (state: any) => state.settings,
  );
  const {setLarivaarAssist} = useStoreActions(
    (actions: any) => actions.settings,
  );

  const currentTheme = useTheme().colors;

  useEffect(() => {
    sendRequest(props.page, setCurrentAngData, setIsLoading);
  }, [props.page]);

  useEffect(() => {
    console.log('larivaar is changed');
  }, [larivaar]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }
  console.log('larivaar in ang', larivaar);
  console.log('font in ang', fontSize);
  return (
    <DoubleTap
      customTap={() => {
        larivaar && setLarivaarAssist(!larivaarAssist);
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
