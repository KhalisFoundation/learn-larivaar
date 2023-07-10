import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {AngProps, AngData} from './interfaces';
import {layoutStyles} from '../../styles/layout';
import {bakePankti} from './utils/bakePankti';
import {LarivaarContext} from '../../context';

const Ang = (props: AngProps): JSX.Element => {
  const [currentAngData, setCurrentAngData] = useState({} as AngData);
  const {larivaarAssist, larivaar} = useContext(LarivaarContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.banidb.com/v2/angs/${props.page}`)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setCurrentAngData(data);
      });
  }, [props.page]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <View style={layoutStyles.wordContainer}>
      {currentAngData.page &&
        currentAngData.page.map(page =>
          bakePankti(page.verse.unicode, larivaar, larivaarAssist),
        )}
    </View>
  );
};

export default Ang;
